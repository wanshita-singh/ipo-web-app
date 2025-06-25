import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center mb-4 sticky top-0 z-10">
      <Link to="/" className="text-xl font-bold text-blue-700">
        IPO Web App
      </Link>

      <div className="space-x-4">
        <Link
          to="/"
          className={`font-medium ${
            location.pathname === '/' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          Home
        </Link>

        {/* 🔐 Updated Admin link — goes to /login instead of /admin */}
        <Link
          to="/login"
          className={`font-medium ${
            location.pathname === '/login' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          Admin
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
