import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';  // Importing the trash icon from react-icons
import Navbar from './Navbar';
import Footer from './Footer';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}-${month}-${year} ${hours}:${minutes}`;
};

const Notifications = () => {
  const [NotificationInfo, setNotificationInfo] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/notifications');
        const { message, success, notifications } = response.data;

        if (success) {
          handleSuccess(message);
          setNotificationInfo(notifications);
        }

      } catch (err) {
        handleError("Today don't have any notification");
      }
    };

    fetchdata();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/deletenotification/${id}`);
      const { message, success, notifications } = response.data;

      if (success) {
        handleSuccess(message);
        // After successful deletion, update the state by filtering out the deleted notification
        setNotificationInfo((prevNotifications) => prevNotifications.filter(notification => notification._id !== id));
      }

    } catch (err) {
      handleError("Error occured during deleting notification");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-5 mt-20 mb-40">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Notifications</h1>
        <div className="space-y-4">
          {NotificationInfo.map((item, index) => {
            return (
              <div key={index} className="bg-white shadow-lg rounded-lg p-6 max-w-full mx-auto relative">
                {/* Delete Button */}
                <button
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(item._id)}  
                >
                  <FaTrash size={20} />
                </button>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-4">
                  <p className="text-gray-600 text-sm sm:text-base">{formatDate(item.createdAt)}</p>
                </div>
                <div className="mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                </div>
                <div className="text-gray-600 text-base">
                  <p>{item.message}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Notifications;

