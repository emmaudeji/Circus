// pages/api/getInstructorCourses.js

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

      // Find all courses where the user's ID is in the instructors array
      const instructorCourses = await Course.find({ instructors: session.user._id });

      // Return the courses where the user is an instructor as the response
      res.status(200).json(instructorCourses);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching instructor courses' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
