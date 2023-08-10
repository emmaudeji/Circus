import Course from '@/models/course';

export default async function handler(req, res) {
  const { q, page = 1, limit = 10 } = req.query; // 'q' is the search query

  try {
    // Perform the text search query
    const courses = await Course.find(
      { $text: { $search: q } },
      { score: { $meta: 'textScore' } } // Include search score for sorting
    )
      .sort({ score: { $meta: 'textScore' } }) // Sort by relevance
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Error searching for courses' });
  }
}
