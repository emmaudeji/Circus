import React from 'react';
import { FaVideo, FaClipboardCheck, FaEdit } from 'react-icons/fa';

const LearningFormat = ({ icon, title, description }) => {
  return (
    <div className="flex items-start mb-6">
      <div className="mr-4">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-1">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default LearningFormat;
