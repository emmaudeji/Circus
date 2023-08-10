import { authorize } from '../../lib/authorization';
import User from '../../models/user';

const updateUserRole = async (req, res) => {
  try {
    // Check for PUT method and authorization for write permission
    if (req.method !== 'PUT') {
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    // Check authorization for write permission
    authorize('write')(req, res, async () => {
      const { userId } = req.params;
      const { role } = req.body;

      // Ensure that the role is valid (tutor or admin)
      if (role !== 'tutor' && role !== 'admin') {
        return res.status(400).json({ error: 'Invalid role. Role must be "tutor" or "admin"' });
      }

      // Update the user's role in the database
      const updatedUser = await User.findByIdAndUpdate(userId, { role }, { new: true });

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(updatedUser);
    });
  } catch (error) {
    res.status(500).json({ error: 'Error updating user role' });
  }
};

export default updateUserRole;
