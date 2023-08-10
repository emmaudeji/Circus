// Define role-based permissions and their corresponding allowed roles
import { getSession } from "next-auth/react";

const permissions = {
    read: ['learner', 'tutor', 'superadmin'],
    write: ['tutor', 'superadmin'],
    admin: ['superadmin'],
  };
  
  // Custom authorization middleware to check user role against required roles for a given permission
  export  function authorize(permission) {
    return async (req, res, next) => {
    
    const session = await getSession({ req });

    if (!session) {
      // User is not authenticated or session has expired
      return res.status(401).json({ error: 'User session is expired; check authorization' });
    }
      const userRole = session?.user?.role || 'learner'; // Default role to 'learner' if not available
      const allowedRoles = permissions[permission] || [];
  
      if (allowedRoles.includes(userRole)) {
        next(); // User is authorized, continue to the next middleware or route handler
      } else {
        res.status(403).json({ error: 'Unauthorized; you do not have permission! Check authorization.' }); // User is not authorized to access this resource
      }
    };
  }
  