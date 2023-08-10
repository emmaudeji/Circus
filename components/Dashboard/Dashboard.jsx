import CourseFilters from "./CourseFilter";


const DashboardLayout = ({ categories, children, heading }) => {
  return (
    <div className="max-w-7xl mx-auto ">
        {heading}
        <div className=" flex h-screen border-t">

            {/* Course Categories Section */}
            <div className="w-1/5 pr-8 pt-4 border-r border-gray-300 overflow-y-auto">{categories}</div>
            {/* Course Listings Section */}
            <div className="w-4/5 pl-8 pt-4 overflow-y-auto">{children}</div>
        </div>
      
    </div>
  );
};

export default DashboardLayout;
