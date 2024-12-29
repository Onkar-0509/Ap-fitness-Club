import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/loginpage');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-slate-900 text-white px-6 py-4 z-50 flex justify-between items-center">
      {/* Logo Section */}
      <div className="logo flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/mainpage')}>
        <div className="bg-red-600 text-white font-bold text-lg sm:text-xl p-2 rounded-full">AP</div>
        <span className="font-bold text-lg sm:text-xl">Fitness Club</span>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center space-x-4 sm:space-x-6 text-sm sm:text-base">
        <li className="hover:text-red-500 cursor-pointer">
          <Link to="/mainpage">Home</Link>
        </li>
        <li className="hover:text-red-500 cursor-pointer">
          <Link to="/profile">Profile</Link>
        </li>
        <li className="hover:text-red-500 cursor-pointer">
           <Link to="/notifications">Notifications</Link>
        </li>
        <button
          onClick={handleLogout}
          className="bg-red-700 px-3 py-1 rounded-lg text-sm sm:text-base font-medium hover:bg-red-800 transition"
        >
          Logout
        </button>
      </ul>

      {/* Mobile Menu Button */}
      <div className="md:hidden" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? (
          <FaTimes className="text-2xl cursor-pointer" />
        ) : (
          <FaBars className="text-2xl cursor-pointer" />
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <ul className="absolute top-16 left-0 w-full bg-slate-900 text-white flex flex-col items-center space-y-4 py-4 z-40">
          <li className="hover:text-red-500 cursor-pointer">
            <Link to="/mainpage" onClick={toggleMobileMenu}>Home</Link>
          </li>
          <li className="hover:text-red-500 cursor-pointer">
            <Link to="/profile" onClick={toggleMobileMenu}>Profile</Link>
          </li>
          <li className="hover:text-red-500 cursor-pointer" onClick={toggleMobileMenu}>
            <Link to="/notifications" onClick={toggleMobileMenu}>Notifications</Link>
          </li>
          <button
            onClick={() => {
              handleLogout();
              toggleMobileMenu();
            }}
            className="bg-red-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-red-800 transition"
          >
            Logout
          </button>
        </ul>
      )}
    </div>
  );
};

export default Navbar;

