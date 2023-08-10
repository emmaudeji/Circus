import { getSession } from 'next-auth/react';
import Course from '@/model/courses';
import User from '@/models/user';
import dbConnect from '@/utils/mongodb';
import { authorize } from '@/lib/authorization';
import { authorizeCourseEdit } from './update';

export default async function handler(req, res) {
  // Check if the request method is DELETE
  if (req.method === 'DELETE') {
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
        // Extract the course ID from the request query parameters
        const { courseId } = req.query;

        // Check if the user's role is allowed to edit the course
        const isAuthorized = authorizeCourseEdit(session.user, course);
        if (!isAuthorized) {
          return res.status(403).json({ error: 'Unauthorized to edit or delete this course' });
        }

        // Validate the course ID
        if (!courseId) {
          return res.status(400).json({ error: 'Course ID is required.' });
        }

        // Find and delete the course from the database
        const deletedCourse = await Course.findByIdAndDelete(courseId);

        if (!deletedCourse) {
          return res.status(404).json({ error: 'Course not found.' });
        }

        // Remove the courseId from the tutoringCourses field of all instructors associated with the course
        await User.updateMany({ _id: { $in: deletedCourse.instructors } }, { $pull: { tutoringCourses: courseId } });

        // Return a success message as the response
        res.status(200).json({ message: 'Course deleted successfully.' });
      });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting the course.' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
