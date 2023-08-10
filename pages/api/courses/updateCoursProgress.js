// pages/api/updateProgress.js

import dbConnect from '@/utils/mongodb';
import { authorize } from '@/lib/authorization';
import User from '@/models/user';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      await dbConnect();

      // Apply the authorize middleware to check if the user has the 'write' permission
      authorize('write')(req, res, async () => {
        const { userId, courseId, progress } = req.body;

        // Validate the required fields
        if (!userId || !courseId || !progress) {
          return res.status(400).json({ error: 'Please provide user ID, course ID, and progress.' });
        }

        // Update the user's progress in the enrolledCourses array
        const updatedUser = await User.findOneAndUpdate(
          { _id: userId, 'enrolledCourses.course': courseId },
          { $set: { 'enrolledCourses.$.progress': progress } },
          { new: true }
        );

        if (!updatedUser) {
          return res.status(404).json({ error: 'User not found or course not enrolled.' });
        }

        // User's progress in the course has been updated
        res.status(200).json(updatedUser);
      });
    } catch (error) {
      res.status(500).json({ error: 'Error updating user progress.' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
