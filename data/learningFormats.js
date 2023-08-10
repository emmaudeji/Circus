import { FaVideo,FaChalkboardTeacher, FaClipboardCheck, FaEdit } from 'react-icons/fa';


export  const learningFormats = [
    {
      icon: <FaVideo className="text-orange-500 text-5xl" />,
      title: 'Video Lectures',
      description: 'Engage with comprehensive video lessons and real-world demonstrations.',
    },
    {
      icon: <FaClipboardCheck className="text-orange-500 text-5xl" />,
      title: 'Quizzes & Assessments',
      description: 'Test your understanding and track your progress with interactive quizzes.',
    },
    {
      icon: <FaEdit className="text-orange-500 text-5xl" />,
      title: 'Hands-on Assignments',
      description: 'Apply your knowledge through practical assignments and projects.',
    },
    {
      icon: <FaChalkboardTeacher className="text-orange-500 text-5xl" />, // Add the LMS icon
      title: 'Learning Management System (LMS)',
      description: 'Access a comprehensive Learning Management System to organize and manage your learning journey.',
    },
  ];