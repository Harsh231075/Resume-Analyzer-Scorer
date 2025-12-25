import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, ScanFace, FileSearch, Sparkles, AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';

const Analysis = ({ analysisData, setAnalysisResult }) => {
    const navigate = useNavigate();
    const [status, setStatus] = useState("Initializing AI...");
    const [progress, setProgress] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
    const [error, setError] = useState(null);

    const steps = [
        { id: 1, text: "Reading Document Structure", icon: FileSearch },
        { id: 2, text: "Extracting Professional Skills", icon: ScanFace },
        { id: 3, text: "Calculating Role Fit & ATS Score", icon: Sparkles },
        { id: 4, text: "Generating Improvement Plan", icon: CheckCircle2 },
    ];

    // Helper function to get user-friendly error message
    const getErrorMessage = (error) => {
        const status = error?.response?.status;
        const message = error?.response?.data?.error || error?.message;

        if (status === 403) {
            return {
                title: "API Access Denied",
                message: "The AI service is currently unavailable. This might be due to API quota limits or configuration issues.",
                action: "Please try again later or contact support."
            };
        }
        if (status === 429) {
            return {
                title: "Too Many Requests",
                message: "You've made too many requests. Please wait a moment before trying again.",
                action: "Wait 30 seconds and try again."
            };
        }
        if (status === 500) {
            return {
                title: "Server Error",
                message: "Something went wrong on our end. We're working to fix it.",
                action: "Please try again in a few minutes."
            };
        }
        if (status === 400) {
            return {
                title: "Invalid Request",
                message: message || "The resume file couldn't be processed.",
                action: "Please check your file and try again."
            };
        }
        if (!error?.response) {
            return {
                title: "Connection Failed",
                message: "Could not connect to the analysis server.",
                action: "Please check your internet connection and try again."
            };
        }
        return {
            title: "Analysis Failed",
            message: message || "An unexpected error occurred.",
            action: "Please try again."
        };
    };

    useEffect(() => {
        if (!analysisData?.file) {
            navigate('/upload');
            return;
        }

        const analyze = async () => {
            try {
                const formData = new FormData();
                formData.append('resume', analysisData.file);
                formData.append('jobRole', analysisData.jobRole);
                formData.append('experienceLevel', analysisData.experienceLevel);

                // Simulation of progress
                const interval = setInterval(() => {
                    setProgress(prev => {
                        const next = prev + 1.5;
                        return next > 90 ? 90 : next;
                    });
                }, 100);

                // Dynamic Step Updates
                setTimeout(() => { setActiveStep(1); setStatus("extracting"); }, 2000);
                setTimeout(() => { setActiveStep(2); setStatus("calculating"); }, 4500);
                setTimeout(() => { setActiveStep(3); setStatus("generating"); }, 7000);

                const response = await axios.post('http://localhost:5001/analyze', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    timeout: 60000 // 60 second timeout
                });

                clearInterval(interval);
                setProgress(100);
                setAnalysisResult(response.data);

                setTimeout(() => navigate('/dashboard'), 800);

            } catch (err) {
                console.error("Analysis Failed", err);
                setError(getErrorMessage(err));
            }
        };

        analyze();
    }, [analysisData, navigate, setAnalysisResult]);

    // Error State UI
    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white px-4">
                <div className="w-full max-w-md text-center">
                    <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertTriangle className="w-10 h-10 text-red-400" />
                    </div>

                    <h2 className="text-2xl font-bold mb-3">{error.title}</h2>
                    <p className="text-slate-400 mb-2">{error.message}</p>
                    <p className="text-slate-500 text-sm mb-8">{error.action}</p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                        >
                            <RefreshCw className="w-4 h-4" /> Try Again
                        </button>
                        <Link
                            to="/upload"
                            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back to Upload
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-700"></div>
            </div>

            <div className="w-full max-w-lg z-10 p-8">
                <div className="text-center mb-12">
                    <div className="relative w-24 h-24 mx-auto mb-6">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="48" cy="48" r="45" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-800" />
                            <circle cx="48" cy="48" r="45" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray={283} strokeDashoffset={283 - (283 * progress / 100)} className="text-blue-500 transition-all duration-300" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg font-bold font-mono">{Math.round(progress)}%</span>
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        Analyzing Profile
                    </h2>
                    <p className="text-slate-400">Powered by Gemini 1.5</p>
                </div>

                <div className="space-y-4">
                    {steps.map((step, idx) => {
                        const Icon = step.icon;
                        const isCompleted = idx < activeStep;
                        const isCurrent = idx === activeStep;

                        return (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.2 }}
                                className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-500
                                ${isCurrent ? 'bg-blue-500/10 border-blue-500/50 shadow-lg shadow-blue-500/10' :
                                        isCompleted ? 'bg-slate-800/50 border-slate-700 text-slate-400' : 'bg-transparent border-transparent opacity-50'}
                            `}
                            >
                                <div className={`p-2 rounded-lg ${isCurrent ? 'bg-blue-500 text-white' : isCompleted ? 'bg-green-500/20 text-green-500' : 'bg-slate-800 text-slate-500'}`}>
                                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className={`w-5 h-5 ${isCurrent ? 'animate-pulse' : ''}`} />}
                                </div>
                                <span className={`font-medium ${isCurrent ? 'text-white' : 'text-slate-400'}`}>{step.text}</span>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default Analysis;
