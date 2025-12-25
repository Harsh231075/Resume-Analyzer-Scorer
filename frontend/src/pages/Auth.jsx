import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import axios from 'axios';

const Auth = ({ setUser }) => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
            const payload = isLogin
                ? { email: formData.email, password: formData.password }
                : formData;

            const response = await axios.post(`http://localhost:5001${endpoint}`, payload);

            // Store token
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            if (setUser) {
                setUser(response.data.user);
            }

            navigate('/upload');

        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[90vh] flex items-center justify-center bg-slate-50 px-4 relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl" />

            <div className="w-full max-w-md relative z-10">
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                    {/* Header */}
                    <div className="bg-slate-900 p-8 text-center">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-1">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        <p className="text-slate-400 text-sm">
                            {isLogin ? 'Sign in to access your dashboard' : 'Get started with resume analysis'}
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-5">
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                                        placeholder="John Doe"
                                        required={!isLogin}
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    {isLogin ? 'Sign In' : 'Create Account'}
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="px-8 pb-8 text-center">
                        <p className="text-sm text-slate-500">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button
                                onClick={() => { setIsLogin(!isLogin); setError(''); }}
                                className="text-blue-600 font-semibold hover:underline"
                            >
                                {isLogin ? 'Sign Up' : 'Sign In'}
                            </button>
                        </p>

                        <p className="text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
                            <Shield className="w-3 h-3" /> Your data is encrypted and secure
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
