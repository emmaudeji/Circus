// pages/api/createCourse.js

import { getSession } from 'next-auth/react';
import Course from '@/model/courses';
import User from '@/models/user'; 
import dbConnect from '@/utils/mongodb';
import { authorize } from '@/lib/authorization'; 

export default async function handler(req, res) {
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
        // Extract course data from the request body
        const {
          title,
          description,
          instructorEmails, 
          duration,
          level,
          category,
          price,
          thumbnailUrl,
          videoUrl,
          
        } = req.body;

        // Validate the required fields
        if (!title || !instructorEmails) {
          return res.status(400).json({ error: 'Please provide all required fields. title and tutor email.' });
        }

        // Find the user object for the course creator from the session
        const creator = await User.findById(session.user.id);

        // Find the user objects for the given instructorEmails (tutor emails)
        const instructors = await User.find({ email: { $in: instructorEmails } });

        // Populate the instructor field with an array containing only the necessary information for each tutor
        const instructorsPopulated = instructors.map((instructor) => ({
          _id: instructor._id,
          email: instructor.email,
          name: instructor.name,
        }));

        // Create the course object with creator and instructors populated
        const newCourse = new Course({
          title,
          description,
          creator,
          instructors: instructorsPopulated, 
          duration,
          level,
          category,
          price,
          thumbnailUrl,
          videoUrl,
        });

        // Save the course to the database
        const createdCourse = await newCourse.save();


        // Update the tutoringCourses field of each instructor with the new courseId
        await Promise.all(
          instructors.map(async (instructor) => {
            instructor.tutoringCourses.push(createdCourse._id);
            await instructor.save();
          })
        );

        // Return the newly created course as the response
        res.status(201).json(createdCourse);
      });
    } catch (error) {
      res.status(500).json({ error: 'Error creating the course' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
