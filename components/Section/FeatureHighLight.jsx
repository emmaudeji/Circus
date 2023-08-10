import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const FeatureHighlight = ({ icon, title, description }) => {
  return (
    <div className="flex items-start mb-6">
      <div className="mr-4">
        <FaCheckCircle className="text-orange-500 text-2xl" />
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-1">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default FeatureHighlight;
