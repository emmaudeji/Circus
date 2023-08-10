// pages/api/getFavoriteCourses.js

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

      // Fetch the user's course ratings and likes from the database
      const userCoursesData = await Course.find({
        $or: [
          { 'courseReviews.user': userId }, // Courses with user ratings
          { likes: userId }, // Courses with user likes
        ],
      });

      // Calculate scores for each course based on ratings and likes
      const favoriteCourses = userCoursesData.map((course) => {
        let totalRating = 0;
        let totalLikes = 0;

        // Calculate total rating and likes for the course
        course.courseReviews.forEach((review) => {
          if (review.user.toString() === userId.toString()) {
            totalRating += review.rating;
          }
        });

        totalLikes = course.likes.length;

        // Calculate the score for the course (you can adjust the weighting as per your preference)
        const ratingWeight = 0.7;
        const likesWeight = 0.3;
        const score = ratingWeight * totalRating + likesWeight * totalLikes;

        return { course, score };
      });

      // Sort the favorite courses by score in descending order
      favoriteCourses.sort((a, b) => b.score - a.score);

      // Return the favorite courses as the response
      res.status(200).json(favoriteCourses);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching favorite courses' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
