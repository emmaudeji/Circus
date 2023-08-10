// pages/api/getAllModules.js

import Course from '@/models/course';
import dbConnect from '@/lib/dbConnect';

export default async function handler(req, res) {
  // Check if the request method is GET
  if (req.method === 'GET') {
    try {
      // Connect to the database
      await dbConnect();

      // Fetch all modules from the courses collection
      const allModules = await Course.distinct('modules');

      // Return the modules as the response
      res.status(200).json(allModules);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching modules' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
