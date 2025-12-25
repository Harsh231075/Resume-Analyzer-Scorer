import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, LogOut, User } from 'lucide-react';

const Navbar = ({ user }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    return (
        <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="bg-blue-600 p-2 rounded-lg text-white">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-xl text-gray-900 tracking-tight">
                            Resume<span className="text-blue-600">Scorer</span>
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                            Home
                        </Link>
                        <Link to="/upload" className={`text-sm font-medium transition-colors ${isActive('/upload') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                            Analyze Resume
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        {user ? (
                            <>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full">
                                    <User className="w-4 h-4 text-blue-600" />
                                    <span className="text-sm font-medium text-blue-700">{user.name?.split(' ')[0]}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="text-sm font-medium text-gray-500 hover:text-red-600 flex items-center gap-1 transition-colors"
                                >
                                    <LogOut className="w-4 h-4" /> Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/auth" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                                    Login
                                </Link>
                                <Link to="/upload" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm hover:shadow-md">
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
