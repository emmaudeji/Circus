import React from 'react';

const UserTestimonial = ({ imageSrc, name, testimonial }) => {
  return (
    <div className="h-80  mb-8">
      <div className="bg-white h-full rounded-lg p-14 shadow-md">
      <div className="flex items-center mb-4">
        <img src={imageSrc} alt={name} className="w-12 h-12 rounded-full mr-4" />
        <div>
          <h4 className="text-lg font-semibold">{name}</h4>
        </div>
      </div>
      <p className="text-gray-600">{testimonial}</p>
      </div>
    </div>
  );
};

export default UserTestimonial;
