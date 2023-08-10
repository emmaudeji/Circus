// pages/api/courses/[courseId]/modules.js

import { getSession } from 'next-auth/react';
import Course from '@/models/course';
import dbConnect from '@/utils/mongodb';
import { authorize } from '@/lib/authorization';

export default async function handler(req, res) {
  const { courseId } = req.query;

  // Check if the request method is POST
  if (req.method === 'POST') {
    try {
      // Connect to the database
      await dbConnect();

      // Get the user session
      const session = await getSession({ req });
      if (!session || !session.user) {
        return res.status(401).json({ error: 'Unauthorized; check the session object.' });
      }

      // Apply the authorization middleware to the route
      authorize('write')(req, res, async () => {
        // Extract module data from the request body
        const { header, objectives, image, video, content } = req.body;

        // Find the course by courseId
        const course = await Course.findById(courseId);

        // Check if the course exists
        if (!course) {
          return res.status(404).json({ error: 'Course not found' });
        }

        // Create a new module
        const newModule = {
          header,
          objectives,
          image,
          video,
          content,
        };

        // Add the new module to the modules array
        course.modules.push(newModule);

        // Save the updated course with the new module to the database
        const updatedCourse = await course.save();

        // Return the updated course as the response
        res.status(200).json(updatedCourse);
      });
    } catch (error) {
      res.status(500).json({ error: 'Error creating/updating the module' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
