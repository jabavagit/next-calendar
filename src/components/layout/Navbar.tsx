import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* Menú hamburguesa a la izquierda */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            {/* Puedes añadir más opciones aquí */}
          </ul>
        </div>
        <div className="flex items-center ml-2">
          <span className="text-xl font-bold block">Calendar Dashboard</span>
        </div>
      </div>
      {/* Título centrado */}
      {/* <div className="navbar-center">
        <span className="btn btn-ghost text-xl">Calendar Dashboard</span>
      </div> */}
      {/* Estado de conexión a la derecha */}
      <div className="navbar-end mr-5">
        <div className="flex items-center">
          {isOnline ? (
            <span className="flex items-center text-green-600 font-semibold">
              <svg className="w-4 h-4 mr-1 fill-green-600" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="10" />
              </svg>
              Online
            </span>
          ) : (
            <span className="flex items-center text-red-600 font-semibold">
              <svg className="w-4 h-4 mr-1 fill-red-600" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="10" />
              </svg>
              Offline
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
