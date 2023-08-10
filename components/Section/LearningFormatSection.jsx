import React from 'react';
import LearningFormat from './LearninFormat';
import { learningFormats } from '@/data/learningFormats';



const LearningFormatsSection = () => {


  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">Explore Different Learning Formats</h2>
        <div className="space-y-6">
          {learningFormats.map((format, index) => (
            <LearningFormat
              key={index}
              icon={format.icon}
              title={format.title}
              description={format.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningFormatsSection;
