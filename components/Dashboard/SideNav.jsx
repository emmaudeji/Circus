import React from 'react';

const SideNav = ({ categories }) => {
  return (
    <div className="space-y-4">
        <div className="flex items-center">
          
          <span className="font-medium">All Categories</span>
        </div>

      {categories.map((category) => (
        <div key={category.title} className="flex items-center">
          <div className=" text-2xl mr-3">{category.icon}</div>
          <span>{category.title}</span>
        </div>
      ))}
    </div>
  );
};

export default SideNav;
