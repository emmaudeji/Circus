import { authorize } from '../../lib/authorization';
import User from '../../models/user';

const getUserByIdOrEmail = async (req, res) => {
  try {
    // Check for GET method and authorization for read permission
    if (req.method !== 'GET') {
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    // Check authorization for read permission
    authorize('admin')(req, res, async () => {
      const { idOrEmail } = req.params;

      // Check if the provided parameter is a valid MongoDB ObjectId
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(idOrEmail);

      let user;

      if (isObjectId) {
        // If the parameter is a valid ObjectId, search by ID
        user = await User.findById(idOrEmail);
      } else {
        // If the parameter is not a valid ObjectId, search by email
        user = await User.findOne({ email: idOrEmail });
      }

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(user);
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
};

export default getUserByIdOrEmail;
