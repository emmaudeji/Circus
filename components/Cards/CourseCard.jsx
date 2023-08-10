// src/components/CourseCard.js
import React from 'react';

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-bold mb-2">{course.title}</h2>
      <p className="text-gray-600 mb-4">{course.description}</p>
      {/* Additional course information can be displayed here */}
    </div>
  );
};

export default CourseCard;
