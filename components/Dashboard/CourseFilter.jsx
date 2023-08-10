import React from 'react';

const CourseFilters = () => {
  return (
    <div className="flex py-10 items-center justify-between mb-8">
      {/* Filters */}
      <div className="flex space-x-4">
        <button className="px-4 py-2 border rounded-lg">Newest</button>
        <button className="px-4 py-2 border rounded-lg">Popular</button>
        <button className="px-4 py-2 border rounded-lg">Free Courses</button>
        <button className="px-4 py-2 border rounded-lg">Paid Courses</button>
      </div>
      {/* Search Bar */}
      <div className="flex items-center border rounded-lg px-3">
        <input
          type="text"
          placeholder="Search courses..."
          className="border-none w-full py-2 px-3 focus:outline-none"
        />
        <button className="bg-orange-500 text-white rounded-lg px-4 py-2 ml-2">
          Search
        </button>
      </div>
    </div>
  );
};

export default CourseFilters;
