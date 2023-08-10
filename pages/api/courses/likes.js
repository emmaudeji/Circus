// pages/api/updateCourseLikes.js

import { getSession } from 'next-auth/react';
import Course from '@/models/course';
import dbConnect from '@/lib/dbConnect';

export default async function handler(req, res) {
  // Check if the request method is PUT
  if (req.method === 'PUT') {
    try {
      // Connect to the database
      await dbConnect();

      // Get the user session
      const session = await getSession({ req });

      // Ensure that the user is logged in
      if (!session || !session.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Get the course ID from the request body
      const { courseId } = req.body;

      // Find the course in the database
      const course = await Course.findById(courseId);

      // Ensure that the course exists
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      // Check if the user has already liked the course
      const userLiked = course.likes.includes(session.user._id);

      // Update the course likes for the user
      if (userLiked) {
        // User has already liked the course, remove the like
        course.likes = course.likes.filter((like) => like.toString() !== session.user._id.toString());
      } else {
        // User has not liked the course, add the like
        course.likes.push(session.user._id);
      }

      // Save the updated course in the database
      await course.save();

      // Return the updated course as the response
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ error: 'Error updating course likes' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
