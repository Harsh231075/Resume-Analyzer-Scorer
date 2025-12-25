import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertOctagon, Lightbulb, TrendingUp } from 'lucide-react';
import PropTypes from 'prop-types';

const AnalysisResult = ({ result }) => {
    if (!result) return null;

    const {
        match_percentage,
        missing_skills = [],
        improvement_suggestions = [],
        strong_points = [],
        experience_level_context
    } = result;

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-emerald-700';
        if (score >= 50) return 'text-amber-600';
        return 'text-red-700';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl mx-auto space-y-8"
        >
            {/* Score Card */}
            <div className="bg-white rounded-sm shadow-classic p-10 border-t-4 border-primary text-center">
                <h2 className="text-3xl font-serif font-bold text-gray-800 mb-6">Compatibility Score</h2>

                <div className="flex flex-col items-center justify-center mb-6">
                    <div className={`text-8xl font-serif font-bold tracking-tighter ${getScoreColor(match_percentage)}`}>
                        {match_percentage}%
                    </div>
                    <div className="h-1 w-24 bg-gray-200 mt-4 mb-4"></div>
                    <span className="text-gray-500 uppercase tracking-widest text-sm font-medium">Match Probability</span>
                </div>

                <p className="text-lg text-gray-600 italic font-serif leading-relaxed max-w-2xl mx-auto bg-gray-50 p-6 border border-gray-100 rounded-lg">
                    "{experience_level_context}"
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Missing Skills */}
                <div className="bg-white p-8 shadow-classic border-l-4 border-red-400">
                    <div className="flex items-center mb-6 border-b border-gray-100 pb-4">
                        <AlertOctagon className="w-5 h-5 text-red-500 mr-3" />
                        <h3 className="text-xl font-serif font-bold text-gray-800">Gap Analysis</h3>
                    </div>
                    {missing_skills.length > 0 ? (
                        <div className="space-y-3">
                            <p className="text-sm text-gray-500 mb-2">Consider acquiring these skills:</p>
                            <div className="flex flex-wrap gap-2">
                                {missing_skills.map((skill, index) => (
                                    <span key={index} className="px-3 py-1.5 bg-red-50 text-red-700 text-sm font-medium border border-red-100">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500 italic">No significant gaps found.</p>
                    )}
                </div>

                {/* Strong Points */}
                <div className="bg-white p-8 shadow-classic border-l-4 border-emerald-500">
                    <div className="flex items-center mb-6 border-b border-gray-100 pb-4">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 mr-3" />
                        <h3 className="text-xl font-serif font-bold text-gray-800">Key Strengths</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {strong_points.map((point, index) => (
                            <span key={index} className="px-3 py-1.5 bg-emerald-50 text-emerald-800 text-sm font-medium border border-emerald-100">
                                {point}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Improvement Suggestions */}
            <div className="bg-white p-8 shadow-classic border-t-4 border-gold">
                <div className="flex items-center mb-6">
                    <TrendingUp className="w-6 h-6 text-gold mr-3" />
                    <h3 className="text-2xl font-serif font-bold text-gray-800">Strategic Recommendations</h3>
                </div>
                <div className="space-y-4">
                    {improvement_suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-start group">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-xs font-bold mr-4 mt-0.5 group-hover:bg-primary group-hover:text-white transition-colors">
                                {index + 1}
                            </span>
                            <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">{suggestion}</p>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

AnalysisResult.propTypes = {
    result: PropTypes.shape({
        match_percentage: PropTypes.number,
        missing_skills: PropTypes.array,
        improvement_suggestions: PropTypes.array,
        strong_points: PropTypes.array,
        experience_level_context: PropTypes.string
    })
};

export default AnalysisResult;
