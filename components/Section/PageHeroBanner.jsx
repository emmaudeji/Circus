import React from 'react';

const PageHeroBanner = () => {
  return (
    <div>
      {/* Hero Banner */}
      <div className="bg-orange-500 text-white py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Explore Our Courses</h1>
          <p className="text-lg mb-8">Discover a world of knowledge and upskilling opportunities.</p>
          {/* Add a captivating image */}
          <img src="/path-to-your-image.jpg" alt="Online Learning" className="w-full rounded-lg shadow-lg" />
        </div>
      </div>
      
      {/* Rest of the page content */}
    </div>
  );
};

export default PageHeroBanner;
