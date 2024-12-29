import React, { useState } from 'react';
import axios from 'axios';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import Navbar from "./Navbar";
import Footer from './Footer';

const Profile = () => {
  const [Profile, setProfile] = useState({
    password: '',
    phoneNumber: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, phoneNumber } = Profile;

    if (!password || !phoneNumber) {
      return handleError('Phone Number and Password are required');
    }

    try {
      const response = await axios.post('https://ap-fitness-club-api1.vercel.app/api/profile', Profile);
      const { message, success } = response.data;

      if (success) {
        setProfile({...Profile,password:"",phoneNumber:""})
        handleSuccess(message);
      }
    } catch (err) {
      console.log(err.message);
      handleError('Password not updated successfully');
    }
  };

  const handleChange = (e) => {
    setProfile({ ...Profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-opacity-80 p-4 md:p-8">
        <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 w-full max-w-md md:max-w-lg">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Update Profile
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-800 text-sm font-semibold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={Profile.password}
                onChange={handleChange}
                className="w-full p-4 border border-orange-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="phoneNumber"
                className="block text-gray-800 text-sm font-semibold mb-2"
              >
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Enter Phone Number"
                value={Profile.phoneNumber}
                onChange={handleChange}
                className="w-full p-4 border border-orange-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
              />
            </div>
            <button
              type="submit"
              className="w-full p-4 bg-orange-500 text-white rounded-md text-lg font-semibold hover:bg-orange-600 transition duration-300"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default Profile;




