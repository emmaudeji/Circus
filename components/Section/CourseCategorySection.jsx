import { courseCategories } from '@/data/courseCategories';
import CourseCategoryCard from '../Cards/CourseCategoryCard';

import Button from '../Button.jsx/Button';
const CourseCategoriesSection = () => {

  return (
    <section className="pt-14 pb-28 ">
      <div className="max-w-7xl mx-auto px-4 grid lg:flex gap-4 lg:gap-16">
        <div className="space-y-8 mb-8">
            <h2 className="text-4xl font-semibold ">        
                <h2>Learn Your Way:</h2>
                    <h2>Uncover Learning Opportunities Across Various Category</h2>
            </h2>

            <div className="flex gap-3">
            
            <Button link={'/signup'} text={'Get Started'}/>

            
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courseCategories.map((category, index) => (
            <CourseCategoryCard
              key={index}
              icon={category.icon}
              title={category.title}
              description={category.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseCategoriesSection;
