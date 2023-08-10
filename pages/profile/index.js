// /profile.js

import { useSession } from 'next-auth/react';

export default function Profile() {
  const { data: session, status } = useSession();

  // You can access session data to check if the user is authenticated
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (session) {
    // User is authenticated
    console.log('User is logged in:', session);
  } else {
    // User is not authenticated
    console.log('User is not logged in.');
  }

  return (
    <div>
      <h1>Welcome, {session?.user?.firstName}!</h1>
      <p>Email: {session?.email}</p>
      <p>Role: {session?.role}</p>
    </div>
  );
}
