import { authorize } from '../../lib/authorization';
import User from '../../models/user';
import Course from '../../models/course';

const enrollUserInCourse = async (req, res) => {
  try {
    // Check for POST method and authorization for write permission
    if (req.method !== 'POST') {
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    // Check authorization for read  permission
    authorize('read')(req, res, async () => {
      const { courseId } = req.params;
      const { userId } = req.body;

      // Find the user and course in the database
      const user = await User.findById(userId);
      const course = await Course.findById(courseId);

      if (!user || !course) {
        return res.status(404).json({ error: 'User or Course not found' });
      }

      // Check if the user is already enrolled in the course
      if (course.enrolledLearners.includes(userId)) {
        return res.status(409).json({ error: 'User is already enrolled in the course' });
      }

      // Enroll the user in the course
      course.enrolledLearners.push(userId);
      await course.save();

      user.enrolledCourses.push(courseId);
      await user.save();

      res.status(200).json({ message: 'User enrolled in the course successfully' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error enrolling user in the course' });
  }
};

export default enrollUserInCourse;
