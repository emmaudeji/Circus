import Course from '@/models/course';
import dbConnect from '@/utils/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const { minPrice, maxPrice } = req.query;

  if (!minPrice || !maxPrice) {
    res.status(400).json({ error: 'Both minPrice and maxPrice parameters are required.' });
    return;
  }

  try {
    await dbConnect();

    const courses = await Course.find({
      price: { $gte: Number(minPrice), $lte: Number(maxPrice) },
    });

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching courses.' });
  }
}
