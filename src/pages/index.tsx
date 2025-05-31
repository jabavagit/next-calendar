import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Calendar Dashboard</h1>
      <p className="text-lg mb-8">Manage your monthly calendars and events efficiently.</p>
      
      <Link href="/dashboard" className="px-4 py-2 bg-primary text-primary-content rounded hover:bg-primary-focus">
        Go to Dashboard
      </Link>
    </div>
  );
};

export default Home;