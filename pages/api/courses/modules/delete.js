// pages/api/deleteModule.js

import { getSession } from 'next-auth/react';
import Course from '@/models/course';
import dbConnect from '@/lib/dbConnect';

export default async function handler(req, res) {
  // Check if the request method is DELETE
  if (req.method === 'DELETE') {
    try {
      // Connect to the database
      await dbConnect();

      // Get the user session
      const session = await getSession({ req });

      // Ensure that the user is logged in
      if (!session || !session.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Get the course ID and module ID from the request query
      const { courseId, moduleId } = req.query;

      // Find the course in the database
      const course = await Course.findById(courseId);

      // Ensure that the course exists
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      // Check if the user is an authorized instructor for the course
      const isAuthorized = course.instructors.includes(session.user._id);

      if (!isAuthorized) {
        return res.status(403).json({ error: 'Unauthorized to delete course modules' });
      }

      // Find the module in the course's modules array
      const moduleIndex = course.modules.findIndex((module) => module._id.toString() === moduleId);

      // Ensure that the module exists in the course
      if (moduleIndex === -1) {
        return res.status(404).json({ error: 'Module not found in the course' });
      }

      // Remove the module from the course's modules array
      course.modules.splice(moduleIndex, 1);

      // Save the updated course in the database
      await course.save();

      // Return the updated course as the response
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ error: 'Error deleting module' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
