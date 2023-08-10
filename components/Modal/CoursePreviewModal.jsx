import Link from 'next/link';
import React from 'react';


const CoursePreviewModal = ({ isOpen, closeModal, course }) => {
  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  return (
 
      isOpen && <div className=" fixed top-0 left-0 bottom-0 right-0  linear-gradient flex justify-center items-center transition-opacity duration-500  bg-slate-900 bg-opacity-50"
        onClick={closeModal}
      >
          <div className="p-8 h-96 rounded-lg bg-white" onClick={stopPropagation}>
            <h2 className="text-2xl font-semibold mb-2">{course.title}</h2>
            <p className="text-gray-500 mb-4">{course.instructor}</p>
            <p>{course.description}</p>
            <Link href={`/courses/${course.title}`} className="bg-orange-500 text-white rounded-full px-4 py-2 mt-4" onClick={closeModal}>
              Close
            </Link>
        </div>
      </div>

  );
};

export default CoursePreviewModal;
