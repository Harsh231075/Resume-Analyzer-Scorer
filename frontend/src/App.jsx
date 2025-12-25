import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import UploadPage from './pages/Upload';
import Analysis from './pages/Analysis';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';

function Layout({ children, user }) {
  const location = useLocation();
  const isFullScreen = location.pathname === '/analysis';

  return (
    <div className="min-h-screen font-sans bg-slate-50 text-slate-900">
      {!isFullScreen && <Navbar user={user} />}
      <main>{children}</main>
      {!isFullScreen && <Footer />}
    </div>
  );
}

function App() {
  const [analysisData, setAnalysisData] = useState(null);
  const [result, setAnalysisResult] = useState(null);
  const [user, setUser] = useState(null);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <Router>
      <Layout user={user}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadPage setAnalysisData={setAnalysisData} user={user} />} />
          <Route
            path="/analysis"
            element={<Analysis analysisData={analysisData} setAnalysisResult={setAnalysisResult} />}
          />
          <Route path="/dashboard" element={<Dashboard result={result} />} />
          <Route path="/auth" element={
            user ? <Navigate to="/upload" /> : <Auth setUser={setUser} />
          } />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
