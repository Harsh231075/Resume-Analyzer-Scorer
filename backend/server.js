const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdf = require('pdf-parse');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

// CORS Configuration - Allow frontend origins
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// ============== FILE PATHS ==============
const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, JSON.stringify({ users: [] }, null, 2));

// ============== HELPER FUNCTIONS ==============
const readUsers = () => {
  const data = fs.readFileSync(USERS_FILE, 'utf-8');
  return JSON.parse(data);
};

const writeUsers = (data) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2));
};

const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

const generateToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// ============== MULTER CONFIG ==============
// For resume analysis (memory storage)
const memoryUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// For file storage (disk storage)
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userDir = path.join(UPLOADS_DIR, req.userId || 'anonymous');
    if (!fs.existsSync(userDir)) fs.mkdirSync(userDir, { recursive: true });
    cb(null, userDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});
const diskUpload = multer({ storage: diskStorage, limits: { fileSize: 10 * 1024 * 1024 } });

// ============== AUTH MIDDLEWARE ==============
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const { users } = readUsers();
  const user = users.find(u => u.token === token);

  if (!user) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  req.userId = user.id;
  req.user = user;
  next();
};

// ============== AUTH ROUTES ==============

// Register
app.post('/api/auth/register', (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const data = readUsers();

    // Check if user exists
    if (data.users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password: hashPassword(password),
      token: generateToken(),
      createdAt: new Date().toISOString(),
      resumes: []
    };

    data.users.push(newUser);
    writeUsers(data);

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
      token: newUser.token
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const data = readUsers();
    const user = data.users.find(u => u.email === email && u.password === hashPassword(password));

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate new token on login
    user.token = generateToken();
    writeUsers(data);

    res.json({
      message: 'Login successful',
      user: { id: user.id, name: user.name, email: user.email },
      token: user.token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get current user
app.get('/api/auth/me', authMiddleware, (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      resumes: req.user.resumes || []
    }
  });
});

// ============== FILE UPLOAD ROUTES ==============

// Upload and save resume (authenticated)
app.post('/api/resumes/upload', authMiddleware, diskUpload.single('resume'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const data = readUsers();
    const userIndex = data.users.findIndex(u => u.id === req.userId);

    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    const resumeRecord = {
      id: crypto.randomUUID(),
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      uploadedAt: new Date().toISOString()
    };

    if (!data.users[userIndex].resumes) {
      data.users[userIndex].resumes = [];
    }
    data.users[userIndex].resumes.push(resumeRecord);
    writeUsers(data);

    res.status(201).json({
      message: 'Resume uploaded successfully',
      resume: resumeRecord
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'File upload failed' });
  }
});

// Get user's resumes
app.get('/api/resumes', authMiddleware, (req, res) => {
  res.json({ resumes: req.user.resumes || [] });
});

// ============== ANALYSIS ROUTE (Original - works without auth) ==============
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "YOUR_API_KEY_HERE");

app.post('/analyze', memoryUpload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No resume file uploaded' });
    }
    const { jobRole, experienceLevel } = req.body;
    if (!jobRole) {
      return res.status(400).json({ error: 'Job role is required' });
    }

    // Extract text from PDF
    let resumeText = "";
    try {
      console.log('📄 Processing file:', req.file.originalname, 'Size:', req.file.size, 'bytes');
      console.log('📄 MIME type:', req.file.mimetype);

      // Check if it's actually a PDF
      if (req.file.mimetype !== 'application/pdf') {
        return res.status(400).json({
          error: 'Invalid file type',
          message: 'Please upload a PDF file. Received: ' + req.file.mimetype
        });
      }

      const pdfData = await pdf(req.file.buffer);
      resumeText = pdfData.text;
      console.log('✅ PDF parsed successfully. Text length:', resumeText.length);

      if (!resumeText || resumeText.trim().length < 50) {
        return res.status(400).json({
          error: 'Empty or unreadable PDF',
          message: 'The PDF appears to be empty or contains only images. Please upload a text-based resume.'
        });
      }
    } catch (e) {
      console.error('❌ PDF Parse Error:', e.message);
      return res.status(400).json({
        error: 'Failed to parse PDF',
        message: 'Could not read the PDF file. Make sure it is not corrupted or password-protected.',
        details: e.message
      });
    }

    // Analyze with Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `
      Act as an expert Technical Recruiter & ATS System. 
      Analyze the following resume text against the job role: "${jobRole}" and Experience Level: "${experienceLevel || 'Not Specified'}".
      
      RESUME TEXT:
      ${resumeText.substring(0, 15000)}
      
      OUTPUT REQUIREMENTS:
      Return a STRICT JSON object (no markdown) with this structure:
      {
        "match_percentage": <number 0-100 (Overall Score)>,
        "ats_compatibility": <number 0-100 (Format & Keyword readability)>,
        "skill_match": <number 0-100 (Technical/Hard skills alignment)>,
        "grammar_score": <number 0-100 (Language quality)>,
        "missing_skills": ["<skill1>", "<skill2>", ...],
        "improvement_suggestions": ["<specific actionable suggestion 1>", "<suggestion 2>", ...],
        "strong_points": ["<point 1>", "<point 2>", ...],
        "experience_level_context": "<String: Assess if the candidate fits the ${experienceLevel} level.>"
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();

    let analysis;
    try {
      analysis = JSON.parse(cleanJson);
    } catch (e) {
      console.error("JSON Parse Error:", text);
      return res.status(500).json({ error: 'Failed to parse AI response', raw: text });
    }

    res.json(analysis);

  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// ============== HEALTH CHECK ==============
app.get('/health', (req, res) => {
  res.json({ status: 'ok', features: ['auth', 'file-upload', 'analysis'] });
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📁 Data stored in: ${DATA_DIR}`);
});
