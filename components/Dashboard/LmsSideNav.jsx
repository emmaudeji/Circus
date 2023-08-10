import React from 'react';

const LmsSideNav = ({ course }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium">Course Modules</h2>
     
        {/* {course?.modules?.map((module, index) => (
          <li key={index} className="text-blue-600 hover:underline">
            {module.title}
          </li>
        ))} */}
       { ['Lorem ipsum dolor', 'Lorem ipsum dolor', 'Lorem ipsum dolor','Lorem ipsum dolor','Lorem ipsum dolor','Lorem ipsum dolor','Lorem ipsum dolor','Lorem ipsum dolor', ].map((module, index) => (
          <div key={index} className="w-full hover:underline border-b pb-2 duration-300">
            {module}
          </div> ))
       }
    
    </div>
  );
};

export default LmsSideNav;
