import React from 'react';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="">
      <div className="max-w-7xl mx-auto py-16 px-4 md:h-[80vh] md:grid flex flex-col h-full md:grid-cols-2 gap-14 md:gap-8 md:items-center   text-white md:text-black">
        <div>
          <div className="text-5xl sm:text-6xl font-semibold mb-4 space-y-3">
            <h1>Explore the World of</h1> 
            <h1 className='md:text-orange-600'>Free Web Courses</h1>
          </div>
          <p className="text-xl mb-8">
          Elevate your skills from anywhere, anytime with our curated collection of free web courses.
          </p>
          <div className="flex space-x-4">
            <Link href="/signup" className="md:bg-orange-500 md:text-white px-6 py-3 rounded-full shadow-md font-semibold transition duration-300 hover:scale-105 bg-white text-black
            ">
              Get Started
            </Link>
            <Link href="/courses" className="border md:border-orange-500 md:text-orange-500 px-6 py-3 rounded-full shadow-md font-semibold transition duration-300 
            border-white text-white hover:scale-105
            ">
              Explore Courses
            </Link>
          </div>
        </div>

        
        <div className="px-2 h-96 w-full overflow-hidden lg:pl-10">
           
          <img src="/fake1.jpg" alt="Learning" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
