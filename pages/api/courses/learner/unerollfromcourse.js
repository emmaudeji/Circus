import { authorize } from '../../lib/authorization';
import User from '../../models/user';
import Course from '../../models/course';

const unenrollUserFromCourse = async (req, res) => {
  try {
    // Check for POST method and authorization for write permission
    if (req.method !== 'POST') {
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    // Check authorization for write permission
    authorize('write')(req, res, async () => {
      const { courseId } = req.params;
      const { userId } = req.body;

      // Find the user and course in the database
      const user = await User.findById(userId);
      const course = await Course.findById(courseId);

      if (!user || !course) {
        return res.status(404).json({ error: 'User or Course not found' });
      }

      // Check if the user is enrolled in the course
      if (!user.enrolledCourses.includes(courseId)) {
        return res.status(409).json({ error: 'User is not enrolled in the course' });
      }

      // Unenroll the user from the course
      user.enrolledCourses = user.enrolledCourses.filter((course) => course.toString() !== courseId);
      await user.save();

      course.enrolledLearners = course.enrolledLearners.filter((course) => course.toString() !== userId);
      await course.save();

      res.status(200).json({ message: 'User unenrolled from the course successfully' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error unenrolling user from the course' });
  }
};

export default unenrollUserFromCourse;
