import { authorize } from '../../lib/authorization';
import User from '../../models/user';

const getAllUsers = async (req, res) => {
  try {
    // Check for GET method and authorization for read permission
    if (req.method !== 'GET') {
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    // Check authorization for read permission
    authorize('write')(req, res, async () => {
      const users = await User.find();
      res.status(200).json(users);
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

export default getAllUsers;
