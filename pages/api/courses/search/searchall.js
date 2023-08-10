// pages/api/search.js
import Course from '@/models/course';
import dbConnect from '@/utils/mongodb';

export default async function handler(req, res) {
  // ... (Same code as before)

  const { page = 1, limit = 8, title, description, category, price, instructorName } = req.query;

  try {
    await dbConnect();

    const searchQuery = {};

    if (title) {
      searchQuery.title = { $regex: new RegExp(title, 'i') };
    }

    if (description) {
      searchQuery.description = { $regex: new RegExp(description, 'i') };
    }

    if (category) {
      searchQuery.category = { $regex: new RegExp(category, 'i') };
    }

    if (price) {
      searchQuery.price = parseInt(price);
    }

    if (instructorName) {
      searchQuery['instructors.name'] = { $regex: new RegExp(instructorName, 'i') };
    }

    // Fetch courses that match the search criteria with pagination
    const courses = await Course.find(searchQuery)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching courses.' });
  }
}
