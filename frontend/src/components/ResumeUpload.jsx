import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X } from 'lucide-react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const ResumeUpload = ({ file, setFile }) => {
    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles?.length > 0) {
            setFile(acceptedFiles[0]);
        }
    }, [setFile]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
        },
        maxFiles: 1,
        multiple: false
    });

    const removeFile = (e) => {
        e.stopPropagation();
        setFile(null);
    };

    return (
        <div className="w-full">
            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
                1. Upload Resume
            </label>

            {!file ? (
                <div
                    {...getRootProps()}
                    className={`
            border-2 border-dashed rounded-sm p-10 text-center cursor-pointer transition-all duration-300
            ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-gray-400 bg-gray-50'}
          `}
                >
                    <input {...getInputProps()} />
                    <Upload className={`w-10 h-10 mx-auto mb-4 ${isDragActive ? 'text-primary' : 'text-gray-400'}`} strokeWidth={1.5} />
                    <p className="text-gray-600 font-serif text-lg mb-1">
                        {isDragActive ? "Drop the file here" : "Drag and drop your resume"}
                    </p>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">PDF Format Only</p>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative bg-white p-6 border border-gray-200 shadow-sm flex items-center"
                >
                    <div className="bg-gray-100 p-3 rounded-full mr-4">
                        <FileText className="text-primary w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate font-serif">{file.name}</p>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">{(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                    <button
                        onClick={removeFile}
                        className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </motion.div>
            )}
        </div>
    );
};

ResumeUpload.propTypes = {
    file: PropTypes.object,
    setFile: PropTypes.func.isRequired
};

export default ResumeUpload;
