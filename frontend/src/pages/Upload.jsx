import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, CheckCircle, Briefcase, Award, ArrowRight, Shield } from 'lucide-react';

const UploadPage = ({ setAnalysisData }) => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [jobRole, setJobRole] = useState('');
    const [experienceLevel, setExperienceLevel] = useState('Fresher');
    const [error, setError] = useState('');

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            setFile(acceptedFiles[0]);
            setError('');
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        maxFiles: 1
    });

    const handleStartAnalysis = () => {
        if (!file || !jobRole) {
            setError("Please upload a resume and specify a job role.");
            return;
        }
        setAnalysisData({ file, jobRole, experienceLevel });
        navigate('/analysis');
    };

    return (
        <div className="min-h-[90vh] flex items-center justify-center p-4 bg-slate-50 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent-purple/10 rounded-full blur-3xl" />

            <div className="w-full max-w-4xl grid md:grid-cols-5 bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 z-10">
                {/* Left Side: Context/Steps */}
                <div className="md:col-span-2 bg-slate-900 p-8 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-600/20 to-accent-purple/20 pointer-events-none" />

                    <div>
                        <h2 className="text-2xl font-heading font-bold mb-2">Resume Scan</h2>
                        <p className="text-slate-400 text-sm">Optimize your profile for top-tier opportunities.</p>
                    </div>

                    <div className="space-y-6 my-12">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-brand-500/30">1</div>
                            <div>
                                <p className="font-semibold text-sm">Upload Resume</p>
                                <p className="text-xs text-slate-400">PDF format supported</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 opacity-50">
                            <div className="w-8 h-8 rounded-full bg-slate-700 text-slate-400 flex items-center justify-center font-bold text-sm">2</div>
                            <div>
                                <p className="font-semibold text-sm">AI Analysis</p>
                                <p className="text-xs text-slate-500">Processing skills & gaps</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 opacity-50">
                            <div className="w-8 h-8 rounded-full bg-slate-700 text-slate-400 flex items-center justify-center font-bold text-sm">3</div>
                            <div>
                                <p className="font-semibold text-sm">View Results</p>
                                <p className="text-xs text-slate-500">Get actionable feedback</p>
                            </div>
                        </div>
                    </div>

                    <div className="text-xs text-slate-500 flex items-center gap-2">
                        <Shield className="w-3 h-3" /> Secure 256-bit processing
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="md:col-span-3 p-8 md:p-12 bg-white">
                    <div className="space-y-8">
                        {/* File Upload */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Resume Document</label>
                            {!file ? (
                                <div
                                    {...getRootProps()}
                                    className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300
                                ${isDragActive ? 'border-brand-500 bg-brand-50' : 'border-slate-200 hover:border-brand-300 hover:bg-slate-50'}`}
                                >
                                    <input {...getInputProps()} />
                                    <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                                        <Upload className="w-6 h-6" />
                                    </div>
                                    <p className="text-slate-900 font-medium text-sm">Click to upload or drag PDF</p>
                                    <p className="text-xs text-slate-400 mt-1">Maximum file size 10MB</p>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between p-4 bg-brand-50 border border-brand-100 rounded-2xl group">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-brand-600 shadow-sm shrink-0">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-bold text-slate-900 truncate">{file.name}</p>
                                            <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(0)} KB • Ready for scan</p>
                                        </div>
                                    </div>
                                    <button onClick={(e) => { e.stopPropagation(); setFile(null); }} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Job Role Input */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Target Role</label>
                            <div className="relative">
                                <Briefcase className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                                    placeholder="e.g. Senior Product Designer"
                                    value={jobRole}
                                    onChange={(e) => setJobRole(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Experience Level Selector */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-3">Experience Level</label>
                            <div className="grid grid-cols-3 gap-3">
                                {['Fresher', 'Junior', 'Senior'].map((level) => (
                                    <button
                                        key={level}
                                        onClick={() => setExperienceLevel(level)}
                                        className={`py-3 px-2 rounded-xl text-sm font-medium border transition-all duration-200 flex flex-col items-center justify-center gap-1
                                     ${experienceLevel === level
                                                ? 'bg-brand-600 border-brand-600 text-white shadow-lg shadow-brand-500/20 transform scale-[1.02]'
                                                : 'bg-white border-slate-200 text-slate-600 hover:border-brand-200 hover:bg-slate-50'}`}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer / Error */}
                    <div className="mt-8 pt-6 border-t border-slate-100">
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm flex items-center gap-2">
                                <X className="w-4 h-4" /> {error}
                            </div>
                        )}

                        <button
                            onClick={handleStartAnalysis}
                            className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
                        >
                            Analyze Resume Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadPage;
