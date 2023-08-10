import Link from 'next/link';
import React from 'react';

const Button = ({ text, color, link }) => {
  // Determine the background and text color based on the provided color
  const backgroundColor = color ? color : 'bg-orange-500';
  const textColor = color ? 'text-white' : 'text-white';

  return (
    <Link href={link}
      className={`px-4 py-2 rounded-full shadow-md transition duration-300 hover:bg-orange-600 ${backgroundColor} ${textColor}`}
    >
      {text}
    </Link>
  );
};

export default Button;
