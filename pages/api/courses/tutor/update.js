// pages/api/updateCourse.js

import { getSession } from 'next-auth/react';
import Course from '@/models/course';
import User from '@/models/user'; // Import the User model
import dbConnect from '@/lib/dbConnect';
import { authorize } from '@/lib/authorization'; // Import the authorization middleware

export default async function handler(req, res) {
  // Check if the request method is PUT
  if (req.method === 'PUT') {
    try {
      // Connect to the database
      await dbConnect();

      // Get the user session
      const session = await getSession({ req });
      if (!session || !session.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Apply the authorization middleware to the route
      authorize('write')(req, res, async () => {
        // Extract course data from the request body
        const {
          title,
          description,
          instructorEmails, // Changed to instructorEmails to get tutor emails from req.body
          duration,
          level,
          category,
          price,
          thumbnailUrl,
          videoUrl,
    
        } = req.body;

        // Validate the required fields
        if (!title || !instructorEmails) {
          return res.status(400).json({ error: 'Please provide all required fields' });
        }

        // Find the course to be updated by its ID
        const course = await Course.findById(req.query.courseId);

        // Check if the course exists
        if (!course) {
          return res.status(404).json({ error: 'Course not found' });
        }

        // Check if the user's role is allowed to edit the course
        const isAuthorized = authorizeCourseEdit(session.user, course);
        if (!isAuthorized) {
          return res.status(403).json({ error: 'Unauthorized to edit this course' });
        }

        // Find the user objects for the given instructorEmails (tutor emails)
        const instructors = await User.find({ email: { $in: instructorEmails } });

        // Populate the instructor field with an array containing only the necessary information for each tutor
        const instructorsPopulated = instructors.map((instructor) => ({
          _id: instructor._id,
          email: instructor.email,
          name: instructor.name,
        }));

        // Update the course fields with the new data
        course.title = title;
        course.description = description;
        course.instructors = instructorsPopulated;
        course.duration = duration;
        course.level = level;
        course.category = category;
        course.price = price;
        course.thumbnailUrl = thumbnailUrl;
        course.videoUrl = videoUrl;
        // course.modules = modules;

        // Save the updated course to the database
        const updatedCourse = await course.save();

        // Return the updated course as the response
        res.status(200).json(updatedCourse);
      });
    } catch (error) {
      res.status(500).json({ error: 'Error updating the course' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Custom function to check if the user is authorized to edit the course
export function authorizeCourseEdit(user, course) {
  // Check if the user's role is allowed to edit the course
  const isAuthorized = authorize('write')(user, course);
  
  // Check if the user's id is contained in the array of instructors for the course
  const isInstructor = course.instructors.some((instructor) => instructor._id.toString() === user._id.toString());

  return isAuthorized && isInstructor;
}
