// import { authorize } from '@/lib/authorization';
import User from '@/model/user';

const createUser = async (req, res) => {
  try {
    // Check for POST method and authorization for write permission
    if (req.method !== 'POST') {
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
      const { firstName, lastName, email, password, profileImg, role } = req.body;
      
      // Create a new user object
      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        profileImg,
        role,
      });

      // Save the new user to the database
      const savedUser = await newUser.save();

      res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

export default createUser;
