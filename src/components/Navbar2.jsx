import React from 'react';

const Navbar2 = () => {
  return (
    <div className="fixed top-0 left-0 w-full flex flex-wrap items-center justify-between bg-black p-4 sm:p-6 z-50 text-white">
      <div className="logo flex items-center space-x-2">
        <div className="bg-red-600 text-white font-bold text-lg sm:text-xl p-2 rounded-full">AP</div>
        <span className="font-bold text-lg sm:text-xl">Fitness Club</span>
      </div>
      <ul className="flex flex-wrap space-x-4 sm:space-x-6 text-sm sm:text-base">
        <li className="hover:text-red-500 cursor-pointer">About</li>
        <li className="hover:text-red-500 cursor-pointer">Blog</li>
        <li className="hover:text-red-500 cursor-pointer">Contact Us</li>
      </ul>
    </div>
  );
};

export default Navbar2;
