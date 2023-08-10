import React from 'react';
import { FaLongArrowAltRight, FaUserPlus, FaBook, FaChalkboardTeacher, FaPlayCircle } from 'react-icons/fa';

const GettingStartedSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="md:flex md:space-x-8 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-semibold mb-6">Get Started on Your Learning Journey</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-orange-500 rounded-full p-2">
                  <FaUserPlus className="text-white text-lg" />
                </div>
                <div className="ml-4">
                  <p className="text-lg font-semibold">Sign Up</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-orange-500 rounded-full p-2">
                  <FaBook className="text-white text-lg" />
                </div>
                <div className="ml-4">
                  <p className="text-lg font-semibold">Browse Course Categories</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-orange-500 rounded-full p-2">
                  <FaChalkboardTeacher className="text-white text-lg" />
                </div>
                <div className="ml-4">
                  <p className="text-lg font-semibold">Enroll in Your Desired Course</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-orange-500 rounded-full p-2">
                  <FaPlayCircle className="text-white text-lg" />
                </div>
                <div className="ml-4">
                  <p className="text-lg font-semibold">Start Learning and Upskilling</p>
                </div>
              </div>
            </div>
            <button
              className="mt-6 bg-orange-500 text-white py-3 px-6 rounded-full shadow-lg font-semibold transition duration-300 hover:bg-orange-600"
              onClick={() => {
                // Handle sign-up logic
              }}
            >
              Sign Up Now
            </button>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            {/* Visual flowchart using arrows */}
            <div className="text-4xl">
              <div className="flex items-center space-x-4">
                <FaUserPlus className="text-orange-500" />
                <FaLongArrowAltRight className="text-gray-600" />
                <FaBook className="text-orange-500" />
              </div>
              <div className="flex items-center space-x-4">
                <FaBook className="text-orange-500" />
                <FaLongArrowAltRight className="text-gray-600" />
                <FaChalkboardTeacher className="text-orange-500" />
              </div>
              <div className="flex items-center space-x-4">
                <FaChalkboardTeacher className="text-orange-500" />
                <FaLongArrowAltRight className="text-gray-600" />
                <FaPlayCircle className="text-orange-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GettingStartedSection;
