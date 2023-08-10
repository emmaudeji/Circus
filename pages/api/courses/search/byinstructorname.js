import Course from '@/models/course';
import dbConnect from '@/utils/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const { instructorName } = req.query;

  if (!instructorName) {
    res.status(400).json({ error: 'instructorName parameter is required.' });
    return;
  }

  try {
    await dbConnect();

    const courses = await Course.find({
      'instructors.name': { $regex: new RegExp(instructorName, 'i') },
    });

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching courses.' });
  }
}
