import React from 'react';
import gym from '../assets/gymfronted.png';
import Navbar2 from '../components/Navbar2';
import Footer2 from '../components/Footer2';

const FrontPage = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar2 />

      {/* Hero Section */}
      <div
        className="h-screen w-full flex flex-col items-center justify-center bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${gym})` }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-center px-4 sm:px-6 md:px-8">
          Your Journey to Success Begins Here
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-8 leading-relaxed text-center px-6 sm:px-8 md:px-10">
          Unlock your potential and achieve greatness. Start now!
        </p>
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 sm:py-3 sm:px-8 md:py-4 md:px-10 rounded-lg text-base sm:text-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => window.location.href = '/loginpage'}
        >
          Login
        </button>
      </div>

      {/* Footer */}
      <Footer2 />
    </div>
  );
};

export default FrontPage;




