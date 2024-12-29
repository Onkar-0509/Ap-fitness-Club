import React, { useState } from 'react';
import { handleError, handleSuccess } from "../utils.js";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { FaDumbbell } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import gymlogin from '../assets/gymlogin.png';

const LoginPage = () => {
  const [LoginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginInfo({ ...LoginInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = LoginInfo;

    if (!username || !password) {
      return handleError("Username and password are required");
    }

    try {
      const response = await axios.post('https://ap-fitness-club-api1.vercel.app/api/login', LoginInfo);
      const { message, success, token } = response.data;

      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', token);

        setTimeout(() => {
          navigate('/mainpage');
        }, 1000);
      }
    } catch (err) {
      console.log(err.message);
      handleError("Error occurred during login");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      {/* Left Section (Gym Background Image) */}
      <div className="hidden md:block w-full md:w-2/3 relative">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${gymlogin})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold text-center px-6 sm:px-12">
              "No Pain, No Gain"<br />
              Push Beyond Limits, Every Day!
            </h1>
          </div>
        </div>
      </div>

      {/* Right Section (Login Form) */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/3 p-8 bg-white bg-opacity-80">
        <div className="bg-white p-8 md:p-12 rounded-lg shadow-2xl w-full max-w-md">
          <div className="text-center mb-6">
            <FaDumbbell className="text-4xl sm:text-5xl md:text-6xl text-orange-500 mb-4 mx-auto" />
            <h2 className="text-gray-800 text-3xl sm:text-4xl md:text-5xl font-semibold">Welcome Back!</h2>
            <h3 className="pt-3 text-base sm:text-lg text-slate-600">Please enter your details</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="username" className="block text-gray-800 text-sm sm:text-base font-semibold mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter Username"
                value={LoginInfo.username}
                onChange={handleChange}
                className="w-full p-4 border border-orange-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-800 text-sm sm:text-base font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={LoginInfo.password}
                onChange={handleChange}
                className="w-full p-4 border border-orange-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
              />
            </div>

            <button
              type="submit"
              className="w-full p-4 bg-orange-500 text-white rounded-md text-lg font-semibold hover:bg-orange-600 transition duration-300 transform hover:scale-105"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default LoginPage;







