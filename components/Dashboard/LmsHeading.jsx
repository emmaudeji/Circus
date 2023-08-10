import React from 'react';

const LmsHeading = ({ course, progress }) => {
  return (
    <div className="bg-orange-500 py-8 text-white">
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
            <div className="mr-4">
              <h1 className="text-3xl font-semibold mb-2">Course: {course.title}</h1>
              <p className="">Description: {course.description}</p>
              <p className="text-sm">Instructor: {course.instructor}</p>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm">Course Progress: {80}%</p>
            </div>
          </div>
          <div className="sm:hidden">
            <p className="text-sm">Course Progress: {90}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LmsHeading;
