import React from 'react';

const CourseCategoryCard = ({ icon, title, description }) => {
  return (
    <div className="flex items-center mb-6">
      <div className="bg-orange-500 p-3 rounded-lg mr-4">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default CourseCategoryCard;
