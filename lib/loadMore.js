import React, { useState, useEffect } from 'react';

const CourseListings = ({ initialCourses }) => {
  const [courses, setCourses] = useState(initialCourses);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Load more courses function
  const loadMoreCourses = () => {
    setLoading(true);

    // Simulate fetching more data, replace with actual data fetching logic
    setTimeout(() => {
      const moreCourses = [...]; // Load more courses
      setCourses(prevCourses => [...prevCourses, ...moreCourses]);
      setLoading(false);
    }, 1000);
  };

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (!loading && hasMore) {
        if (
          window.innerHeight + window.scrollY >=
          document.body.scrollHeight - 100
        ) {
          loadMoreCourses();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  return (
    <div>
      {/* ... Display current courses ... */}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default CourseListings;
