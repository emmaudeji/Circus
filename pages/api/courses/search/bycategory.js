import Course from '@/models/course';
import dbConnect from '@/utils/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const { category } = req.query;

  if (!category) {
    res.status(400).json({ error: 'Category parameter is missing.' });
    return;
  }

  try {
    await dbConnect();

    const courses = await Course.find({ category });

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching courses.' });
  }
}
