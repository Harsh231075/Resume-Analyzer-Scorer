import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, ChevronRight, AlertCircle, CheckCircle2, Brain, TrendingUp, Sparkles, Share2 } from 'lucide-react';

const Dashboard = ({ result }) => {
    const navigate = useNavigate();

    // Handle direct access without data
    if (!result) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">No Analysis Found</h2>
                    <p className="text-slate-500 mb-6">Please upload a resume to generate a report.</p>
                    <button onClick={() => navigate('/upload')} className="px-6 py-3 bg-brand-600 text-white rounded-xl font-medium shadow-lg hover:bg-brand-700 transition-all">
                        Go to Upload
                    </button>
                </div>
            </div>
        );
    }

    const { match_percentage, strong_points = [], missing_skills = [], improvement_suggestions = [] } = result;

    // Mock sub-scores
    const atsScore = Math.min(match_percentage + 12, 98);
    const grammarScore = 92;
    const structureScore = 85;

    return (
        <div className="min-h-screen bg-slate-50 pb-20 font-sans">
            {/* Top Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-40 backdrop-blur-md bg-white/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="bg-brand-100 p-2 rounded-lg"><Sparkles className="w-5 h-5 text-brand-600" /></div>
                        <h1 className="text-lg font-heading font-bold text-slate-900">AI Analysis Report</h1>
                    </div>
                    <div className="flex gap-3">
                        <button className="hidden sm:flex px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg font-medium border border-slate-200 items-center gap-2 transition-colors">
                            <Share2 className="w-4 h-4" /> Share
                        </button>
                        <button className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all shadow-md flex items-center gap-2">
                            <Download className="w-4 h-4" /> Download PDF
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

                {/* 1. Hero Score Section */}
                <div className="grid md:grid-cols-12 gap-8">
                    {/* Main Gauge Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:col-span-4 bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50"></div>

                        <h3 className="text-slate-500 font-medium mb-6 uppercase tracking-wider text-xs">Overall Match Score</h3>

                        <div className="flex flex-col items-center justify-center relative z-10">
                            <div className="relative w-48 h-48 mb-6">
                                {/* Background Circle */}
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="96" cy="96" r="88" stroke="#f1f5f9" strokeWidth="12" fill="transparent" />
                                    <circle
                                        cx="96" cy="96" r="88"
                                        stroke={match_percentage > 70 ? "#10b981" : match_percentage > 50 ? "#f59e0b" : "#ef4444"}
                                        strokeWidth="12"
                                        fill="transparent"
                                        strokeLinecap="round"
                                        strokeDasharray={553}
                                        strokeDashoffset={553 - (553 * match_percentage / 100)}
                                        className="transition-all duration-1000 ease-out"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-6xl font-heading font-extrabold text-slate-900">{match_percentage}</span>
                                    <span className="text-sm font-medium text-slate-400 mt-1">/ 100</span>
                                </div>
                            </div>

                            <div className={`px-4 py-1.5 rounded-full text-sm font-bold border ${match_percentage > 70 ? 'bg-green-50 text-green-700 border-green-100' : 'bg-yellow-50 text-yellow-700 border-yellow-100'}`}>
                                {match_percentage > 70 ? 'Excellent Match' : match_percentage > 50 ? 'Good Potential' : 'Needs Improvement'}
                            </div>
                        </div>
                    </motion.div>

                    {/* Breakdown Stats */}
                    <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <StatCard
                            title="ATS Compatibility"
                            score={atsScore}
                            icon={<CheckCircle2 className="w-6 h-6 text-white" />}
                            color="bg-brand-500"
                            bg="bg-brand-50"
                            desc="Parsable by systems"
                            delay={0.1}
                        />
                        <StatCard
                            title="Grammar & Style"
                            score={grammarScore}
                            icon={<Sparkles className="w-6 h-6 text-white" />}
                            color="bg-accent-purple"
                            bg="bg-purple-50"
                            desc="Tone & correctness"
                            delay={0.2}
                        />
                        <StatCard
                            title="Structure"
                            score={structureScore}
                            icon={<Brain className="w-6 h-6 text-white" />}
                            color="bg-indigo-500"
                            bg="bg-indigo-50"
                            desc="Logic & flow"
                            delay={0.3}
                        />

                        {/* AI Feedback Banner */}
                        <div className="sm:col-span-3 bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                            <div className="relative z-10">
                                <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-yellow-400" /> AI Executive Summary
                                </h4>
                                <p className="text-slate-300 leading-relaxed max-w-2xl">
                                    Your profile is strong on foundational skills but lacks specific keywords related to the target role.
                                    Adding {missing_skills.slice(0, 2).join(" & ")} projects would significantly boost your ranking.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Detailed Breakdown Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Left: Improvement Plan */}
                    <div className="md:col-span-2 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-3xl p-8 shadow-saas border border-slate-100"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-red-500" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">Priority Improvements</h3>
                                    <p className="text-sm text-slate-500">Fix these to boost your score immediately</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {improvement_suggestions.map((suggestion, i) => (
                                    <div key={i} className="group p-5 bg-slate-50 hover:bg-white rounded-2xl border border-slate-100 hover:border-brand-100 hover:shadow-md transition-all">
                                        <div className="flex gap-4">
                                            <span className="flex-shrink-0 w-8 h-8 bg-white border border-slate-200 text-slate-500 rounded-lg flex items-center justify-center text-sm font-bold group-hover:bg-brand-500 group-hover:text-white group-hover:border-brand-500 transition-colors">
                                                {i + 1}
                                            </span>
                                            <p className="text-slate-700 leading-relaxed">{suggestion}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Strengths & Skills */}
                    <div className="space-y-8">
                        {/* Missing Skills */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-3xl p-8 shadow-saas border border-slate-100"
                        >
                            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 text-red-500" /> Missing Keywords
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {missing_skills.map((skill, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm font-semibold">
                                        {skill}
                                    </span>
                                ))}
                                {missing_skills.length === 0 && <span className="text-slate-500 text-sm">No critical gaps found!</span>}
                            </div>
                        </motion.div>

                        {/* Strong Points */}
                        <div className="bg-white rounded-3xl p-8 shadow-saas border border-slate-100">
                            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-green-500" /> Strong Points
                            </h3>
                            <ul className="space-y-4">
                                {strong_points.map((point, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, score, icon, color, bg, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay }}
        className="bg-white p-6 rounded-3xl shadow-saas border border-slate-100 hover:shadow-lg transition-all"
    >
        <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center shadow-lg transform -rotate-3`}>
                {icon}
            </div>
            <span className={`text-xl font-bold ${score > 80 ? 'text-green-600' : 'text-slate-900'}`}>{score}</span>
        </div>
        <h4 className="font-bold text-slate-900 mb-1">{title}</h4>
        <p className="text-xs text-slate-500">{desc}</p>

        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4 overflow-hidden">
            <div className={`h-full ${color.replace('bg-', 'bg-')}`} style={{ width: `${score}%` }}></div>
        </div>
    </motion.div>
);

export default Dashboard;
