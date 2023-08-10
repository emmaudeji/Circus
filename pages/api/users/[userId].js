// pages/api/users.js

import User from "@/model/user";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const { method, body, query } = req;

  switch (method) {
    
    case 'PUT':
        try {
            // Check for PUT method and authorization for write permission
            if (req.method !== 'PUT') {
              return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
            }
        
            // Check authorization for write permission
            authorize('read')(req, res, async () => {
              const { userId } = req.params;
              const updates = req.body;
        
              const user = await User.findByIdAndUpdate(userId, body, { new: true });
        
              if (!user) {
                return res.status(404).json({ error: 'User not found' });
              }
        
              res.status(200).json(user);
            });
          } catch (error) {
            res.status(500).json({ error: 'Error updating user' });
          }
      break;
    case 'DELETE':
      try {     
        // Check authorization for write permission
        authorize('admin')(req, res, async () => {
          const { userId } = req.params;
          const user = await User.findByIdAndDelete(userId);
    
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
    
          res.status(200).json({ message: 'User deleted successfully' });
        });
      } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
      }
      break;
    default:
      res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
