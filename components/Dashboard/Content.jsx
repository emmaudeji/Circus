import { useState, useEffect } from "react";

import CoursePreviewModal from "../Modal/CoursePreviewModal";
import Link from "next/link";
import { FaStar } from 'react-icons/fa';



const Content = ({ courses }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Open modal
  const openModal = (course) => {
    setSelectedCourse(course);
    setModalIsOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setSelectedCourse(null);
    setModalIsOpen(false);
  };


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

      {/* ... Display course cards ... */}
      {courses.map((course) => (
        <div key={course.title} className="border rounded-lg shadow-md  ">
          
          <div className="h-40 overflow-hidden w-full">
              <img src={course.image} alt={course.title} className="w-full object-cover" />
          </div>

          <div className="flex h-52 flex-col justify-between p-4">
          <div className="">
              <h3 className="text-lg font-semibold ">{course.title}</h3>
              <p className="text-gray-600 mb-2">{course.description}</p>
              <div className="flex justify-between">
                  <p className="text-gray-500 mb-2">{course.instructor}</p>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-500 mr-1" />
                    <p className="text-gray-500">{course.rating}</p>
                  </div>
              </div>
          </div>

            <div className="">
                <button className=" text-orange-500 hover:text-orange-700 duration-300  text-center rounded-full mt-2 " onClick={() => openModal(course)}>View Details</button>
            </div>
          </div>

         
        </div>
      ))}


       {/* Course Preview Modal */}
       {selectedCourse && (
        <CoursePreviewModal
          isOpen={modalIsOpen}
          closeModal={closeModal}
          course={selectedCourse}
        />
      )}
    </div>
  );
};

export default Content;
