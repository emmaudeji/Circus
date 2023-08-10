// pages/api/stopBeingInstructor.js

import { getSession } from 'next-auth/react';
import Course from '@/model/courses';
import dbConnect from '@/lib/dbConnect';
import User from '@/model/user';

export default async function handler(req, res) {
  // Check if the request method is POST
  if (req.method === 'POST') {
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
      const { courseId, userId } = req.body;

      // Find the course in the database
      const course = await Course.findById(courseId);

      const user = await User.findById(userId); // session.user

      // Ensure that the course exists
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      // Check if the user is an instructor for the course
      const isInstructor = course.instructors.includes(session.user._id);

      if (!isInstructor) {
        return res.status(400).json({ error: 'User is not an instructor for the course' });
      }

      // Remove the user's ID from the instructors array of the course
      course.instructors = course.instructors.filter((instructorId) => instructorId !== session.user._id);

      // Save the updated course in the database
      await course.save();

      // Remove the user's ID from the instructors array of the course
      user.tutoringCourses = user.tutoringCourses.filter((id) => id !== courseId);

      // Save the updated course in the database
      await user.save();

      // Return the updated course as the response
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ error: 'Error stopping being an instructor' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
