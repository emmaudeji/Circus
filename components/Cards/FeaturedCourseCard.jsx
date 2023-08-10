import Link from 'next/link';
import React from 'react';
import { AiTwotoneFileImage } from 'react-icons/ai';
import { FaStar } from 'react-icons/fa';

const FeaturedCourseCard = ({slug,  imageSrc, title, description, instructor, rating }) => {
  return (
    <div className=" w-64 bordr flex flex-col h-full rounded  shaow-md">
        <div className='h-40 bg-white '>
            <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
        </div>
     <div className="flex flex-col h-52 justify-between p-3">
          <div className="">
              <h3 className="text- font-medium ">{title}</h3>
              <p className="text-gray-600 mb-2 text-sm">{description}</p>
              <div className="flex justify-between">
                  <p className="text-gray-500 text-sm">{instructor}</p>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-500 mr-1" />
                    <p className="text-gray-600">{rating}</p>
                  </div>
              </div>
          </div>

         <div>
            <Link href={`courses/${title}`} className="mt-4 bg-orange-500 text-white px-4 py-1 text-sm rounded-full shadow-md hover:bg-orange-600 transition duration-300">
                Enroll
              </Link>
         </div>
     </div>
    </div>
  );
};

export default FeaturedCourseCard;
