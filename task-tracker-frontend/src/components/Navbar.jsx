import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-bold">
            <Link to="/">TaskTracker</Link>
          </div>
          <ul className="flex space-x-6 items-center">
            <li>
              <Link to="/" className="hover:text-gray-200  font-semibold text-xl">Home</Link>
            </li>

            {!token ? (
              <>
                <li>
                  <Link to="/login" className="hover:text-gray-200 font-semibold text-xl">Login</Link>
                </li>
                <li>
                  <Link to="/signup" className="hover:text-gray-200 font-semibold text-xl">Signup</Link>
                </li>
              </>
            ) : (
                <>
              <li>
                <Link to="/projects" className="hover:text-gray-200 font-semibold text-xl">Projects</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="hover:text-gray-200 font-semibold text-xl">Logout</button>
              </li>
                </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
