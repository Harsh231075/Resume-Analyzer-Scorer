# Resume Analyzer & Scorer SaaS 🚀

A modern, AI-powered Resume Analyzer SaaS application that helps users optimize their resumes for Applicant Tracking Systems (ATS) and specific job roles. Built with the MERN stack (conceptually) and Google Gemini AI.

![Landing Page]()

## ✨ Features

-   **Resume Parsing**: Extract text from PDF resumes automatically.
-   **AI Analysis**: Detailed scoring using Google Gemini 1.5.
    -   **ATS Compatibility Score**: How well machine-readable your resume is.
    -   **Skill Match**: Comparison against target job roles.
    -   **Grammar & Readability**: Professional tone check.
-   **Multi-Page SaaS UI**:
    -   **Home**: Modern landing page with gradients and glassmorphism.
    -   **Upload**: Drag-and-drop interface with Experience Level context.
    -   **Dashboard**: Comprehensive results with score gauges and improvement suggestions.
-   **Authentication**: User registration and login.
-   **History**: Save and view past resume analyses.

## 🛠️ Tech Stack

-   **Frontend**: React (Vite), Tailwind CSS v3, Framer Motion, React Router v6.
-   **Backend**: Node.js, Express.js, Multer, PDF-Parse.
-   **AI Engine**: Google Gemini (gemini-flash-latest).
-   **Storage**: Local JSON-based storage (for simplicity).

## 🚀 Getting Started

### Prerequisites

-   Node.js installed (v16+).
-   Google Gemini API Key (Get it from [Google AI Studio](https://aistudio.google.com/)).

### 1. Backend Setup

The backend runs on port **5001**.

```bash
cd resume-scorer/backend

# Install dependencies
npm install

# Create .env file
echo "GEMINI_API_KEY=your_api_key_here" > .env
echo "PORT=5001" >> .env

# Start Server
node server.js
```

### 2. Frontend Setup

The frontend runs on port **5174** (or 5173).

```bash
cd resume-scorer/frontend

# Install dependencies
npm install

# Start Development Server
npm run dev
```

## 📱 Usage

1.  Open **http://localhost:5174** in your browser.
2.  Click **"Get Started"** or **"Analyze Resume Free"**.
3.  **Register/Login** to save your reports.
4.  **Upload** your Resume (PDF only).
5.  Enter the **Target Job Role** (e.g., "Frontend Developer").
6.  Select your **Experience Level**.
7.  Click **Analyze** and wait for the AI magic! ✨

## 📂 Project Structure

```
resume-scorer/
├── backend/            # Express Server
│   ├── data/           # Stored users and uploads
│   ├── server.js       # Main entry point
│   └── package.json
└── frontend/           # React Client
    ├── src/
    │   ├── components/ # Reusable UI components
    │   ├── pages/      # Route pages (Home, Upload, Dashboard)
    │   └── App.jsx     # Main Layout & Routing
    ├── tailwind.config.js
    └── package.json
```

## 🐛 Troubleshooting

-   **PDF Parse Error**: Ensure you are using `pdf-parse` v1.1.1 (already fixed in package.json).
-   **403/429 API Error**: Check your Gemini API Quota. We use `gemini-flash-latest` which is free-tier friendly.
-   **CORS Error**: Backend allows localhost:5173 and localhost:5174 by default.

---
*Built with ❤️ by Harsh singh baghel*
