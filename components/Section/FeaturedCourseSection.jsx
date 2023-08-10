import React from 'react';
import { FaStar } from 'react-icons/fa';
import FeaturedCourseCard from '../Cards/FeaturedCourseCard';
import { featuredCoursesData } from '@/data/featuredCoursesData';

const FeaturedCoursesSection = () => {

  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">Featured Courses</h2>
        <div className="flex overflow-x-auto space-x-4 scrollbars-hidden ">
          {featuredCoursesData.map((course, index) => (
            <div><FeaturedCourseCard
            key={index}
            imageSrc={course.imageSrc}
            title={course.title}
            description={course.description}
            instructor={course.instructor}
            rating={course.rating}
            slug={course.slug}
          /></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCoursesSection;
