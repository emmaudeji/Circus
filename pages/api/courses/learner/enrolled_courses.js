// pages/api/getEnrolledCourses.js



import { getSession } from 'next-auth/react';
import Learner from '@/models/learner';
import dbConnect from '@/lib/dbConnect';

export default async function handler(req, res) {
  // Check if the request method is GET
  if (req.method === 'GET') {
    try {
      // Connect to the database
      await dbConnect();

      // Get the user session
      const session = await getSession({ req });

      // Ensure that the user is logged in as a learner
      if (!session || !session.user || session.user.role !== 'learner') {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Fetch the enrolled courses for the learner from the database
      const learner = await Learner.findOne({ user: session.user._id }).populate('enrolledCourses');

      // Return the list of enrolled courses as the response
      res.status(200).json(learner.enrolledCourses);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching enrolled courses' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
