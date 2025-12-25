import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center bg-transparent">
                <div className="mb-4 md:mb-0">
                    <span className="font-heading font-bold text-lg text-gray-900">
                        Resume<span className="text-brand-600">Scorer</span>
                    </span>
                    <p className="text-sm text-gray-500 mt-1">
                        AI-powered career optimization for professionals.
                    </p>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-500">
                    <a href="#" className="hover:text-gray-900">Privacy</a>
                    <a href="#" className="hover:text-gray-900">Terms</a>
                    <a href="#" className="hover:text-gray-900">Support</a>
                </div>

                <div className="mt-4 md:mt-0 text-sm text-gray-400 flex items-center">
                    Made with <Heart className="w-4 h-4 text-red-400 mx-1 fill-current" /> by AI
                </div>
            </div>
        </footer>
    );
};

export default Footer;
