// pages/api/getRecommendedCourses.js

import { getSession } from 'next-auth/react';
import Course from '@/models/course';
import dbConnect from '@/lib/dbConnect';

export default async function handler(req, res) {
  // Check if the request method is GET
  if (req.method === 'GET') {
    try {
      // Connect to the database
      await dbConnect();

      // Get the user session
      const session = await getSession({ req });

      // Ensure that the user is logged in
      if (!session || !session.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Get the user's ID
      const userId = session.user._id;

      // Fetch the user's enrolled courses from the database
      const userEnrolledCourses = await Course.find({ enrolledLearners: userId });

      // Extract the categories and ratings of the user's enrolled courses
      const userCategories = userEnrolledCourses.map((course) => course.category);
      const userRatings = userEnrolledCourses.reduce(
        (ratings, course) => ({ ...ratings, [course._id]: course.averageRating }),
        {}
      );

      // Find similar courses based on categories and ratings
      const recommendedCourses = await Course.find({
        $or: [
          { category: { $in: userCategories } }, // Courses with shared categories
          { _id: { $in: Object.keys(userRatings) }, rating: { $gte: 4 } }, // Highly rated courses
        ],
        _id: { $nin: userEnrolledCourses.map((course) => course._id) }, // Exclude already enrolled courses
      }).sort({ rating: -1 }); // Sort by rating in descending order

      // Return the recommended courses as the response
      res.status(200).json(recommendedCourses);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching recommended courses' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
