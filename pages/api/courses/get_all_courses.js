import Course from '@/models/course';

export default async function handler(req, res) {
  const { page = 1, limit = 10 } = req.query;

  try {
    const courses = await Course.find()
      .select('title description thumbnail instructors price')
      .populate({
        path: 'instructors',
        select: 'name thumbnail',
      })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching courses' });
  }
}


// Pagination: Implement pagination in the API to fetch courses in smaller chunks. Instead of returning all courses at once, limit the number of courses returned per page. This allows you to load courses in batches, which is more efficient.

// Selective Field Projection: In the API, use Mongoose's select method to specify the fields that you want to return in the response. Only select the fields that are necessary for the course overview, such as title, description, thumbnail, instructor's name, instructor's thumbnail, id, price, etc. This way, you can reduce the amount of data transferred between the server and the client.

// Populate Instructors: If you want to display instructor information along with the course, use Mongoose's populate method to populate the instructors field with the necessary details (e.g., name and thumbnail) instead of returning the full instructor object.

// Use Offset-Based Pagination: For example, you can use query parameters like page and limit to specify the page number and the number of courses per page. The server can then skip the appropriate number of documents and return only the desired number of courses for that page.