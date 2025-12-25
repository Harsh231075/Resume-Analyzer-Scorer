import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, FileText, CheckCircle, ArrowRight, Zap, Target, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    const features = [
        {
            icon: <Zap className="w-6 h-6 text-yellow-500" />,
            title: "Instant AI Analysis",
            desc: "Get a comprehensive compatibility score in seconds using advanced LLMs."
        },
        {
            icon: <Target className="w-6 h-6 text-brand-600" />,
            title: "ATS Optimization",
            desc: "Identify missing keywords and format issues that block your resume."
        },
        {
            icon: <FileText className="w-6 h-6 text-accent-purple" />,
            title: "Skill Gap Analysis",
            desc: "Compare your profile against the precise job role you are targeting."
        }
    ];

    return (
        <div className="bg-slate-50">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-20 lg:pt-32 lg:pb-28">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-brand-500/10 rounded-[100%] blur-3xl -z-10"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-sm font-medium mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                            </span>
                            New: AI Rewrite Engine 2.0
                        </div>
                        <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-slate-900 tracking-tight mb-6">
                            Check your Resume Score <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                in Seconds
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Powered by Google Gemini 1.5. Analyze your resume against any job description
                            to improve accuracy, ATS score, and interview chances.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/upload" className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-brand-500/25 transition-all flex items-center justify-center gap-2">
                                <Upload className="w-5 h-5" />
                                Analyze Resume Free
                            </Link>
                            <Link to="/" className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-slate-700 border border-gray-200 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                                View Sample Report
                            </Link>
                        </div>

                        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-500">
                            <div className="flex items-center gap-1">
                                <CheckCircle className="w-4 h-4 text-green-500" /> No signup required
                            </div>
                            <div className="flex items-center gap-1">
                                <Shield className="w-4 h-4 text-slate-400" /> Secure & Private
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-white border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((f, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-saas-hover transition-all"
                            >
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-6">
                                    {f.icon}
                                </div>
                                <h3 className="text-xl font-heading font-bold text-slate-900 mb-3">{f.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
