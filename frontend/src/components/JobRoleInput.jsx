import React from 'react';
import PropTypes from 'prop-types';

const JobRoleInput = ({ jobRole, setJobRole }) => {
    return (
        <div className="w-full">
            <label htmlFor="jobRole" className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
                2. Target Job Role
            </label>
            <div className="relative">
                <input
                    type="text"
                    id="jobRole"
                    className="
            block w-full px-5 py-4
            bg-white border border-gray-300
            text-gray-900 placeholder-gray-400
            focus:ring-2 focus:ring-primary/20 focus:border-primary
            transition-all duration-300
            font-serif text-lg
          "
                    placeholder="e.g. Senior Product Manager"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                />
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gray-200">
                    <div className="h-full bg-primary transition-all duration-300" style={{ width: jobRole ? '100%' : '0%' }}></div>
                </div>
            </div>
            <p className="text-xs text-gray-500 mt-2 italic">
                Enter the precise job title you are applying for.
            </p>
        </div>
    );
};

JobRoleInput.propTypes = {
    jobRole: PropTypes.string.isRequired,
    setJobRole: PropTypes.func.isRequired
};

export default JobRoleInput;
