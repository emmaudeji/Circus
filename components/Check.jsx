// components/FeatureComponent.js

import React from 'react';
import { useSession } from 'next-auth/react';

const FeatureComponent = () => {
  const { data: session } = useSession();
  const userRole = session?.user?.role || 'learner'; // Default role to 'learner' if not available

  return (
    <div>
      {userRole === 'tutor' && <div>Render tutor-specific content here</div>}
      {userRole === 'superadmin' && <div>Render superadmin-specific content here</div>}
      {/* Other content */}
    </div>
  );
};

export default FeatureComponent;
