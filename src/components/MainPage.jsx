import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { handleSuccess, handleError } from '../utils.js';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons from react-icons

// Function to format the date to DD-MM-YYYY
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const MainPage = () => {
  const [Info, setInfo] = useState({
    name: '',
    phoneNumber: '',
    startDate: '',
    endDate: '',
    totalPayment: '',
    deposit: '',
  });

  const [MemberInfo, setMemberInfo] = useState([]);
  const [editId, setEditId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/info");
        const { message, success, data } = response.data;

        if (success) {
          setMemberInfo(data);
        }
      } catch (err) {
        handleError("Error occurred in fetching data");
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setInfo({
      ...Info,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!Info.name || !Info.phoneNumber || !Info.startDate || !Info.endDate || !Info.totalPayment || !Info.deposit) {
      handleError('All fields are required.');
      return false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(Info.phoneNumber)) {
      handleError('Please enter a valid 10-digit phone number.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const data = Info;

    try {
      if (editId) {
        const response = await axios.put(`http://localhost:3000/api/updateMember/${editId}`, data);
        const { message, success, updatedMember } = response.data;

        if (success) {
          handleSuccess(message);
          setMemberInfo(MemberInfo.map(item => (item._id === updatedMember._id ? updatedMember : item)));
        }
        setEditId(null); // Reset edit mode
      } else {
        const response = await axios.post('http://localhost:3000/api/memberinfo', data);
        const { message, success, membersinfo } = response.data;

        if (success) {
          handleSuccess(message);
          setMemberInfo(prevSave => [...prevSave, membersinfo]); // Add new member to the list
        }
      }

      setInfo({
        name: '',
        phoneNumber: '',
        startDate: '',
        endDate: '',
        totalPayment: '',
        deposit: '',
      });

    } catch (err) {
      handleError("Error occurred");
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/memberinfo/${id}`);
      const { message, success, data } = response.data;
  
      if (success) {
        handleSuccess(message);
        setMemberInfo(data); // Update the state to reflect the deletion
      }
    } catch (err) {
      handleError('Error deleting member');
    }
  };

  const handleUpdate = (member) => {
    setInfo({
      name: member.name,
      phoneNumber: member.phoneNumber,
      totalPayment: member.totalPayment,
      deposit: member.deposit,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setEditId(member._id);
  };

  const filteredMembers = MemberInfo.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100"> {/* Set a light gray background for the page */}
      <Navbar />

      <div className="flex-grow mt-20 flex flex-col items-center p-4">
        <h1 className="font-bold text-3xl text-center text-blue-600 mb-8">{editId ? 'Update Admission' : 'New Admission'}</h1>

        <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Name</label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              value={Info.name}
              placeholder="Enter the Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700">Phone Number</label>
            <input
              onChange={handleChange}
              type="text"
              name="phoneNumber"
              value={Info.phoneNumber}
              placeholder="Enter the Phone Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="startDate" className="block text-sm font-semibold text-gray-700">Gym Start Date</label>
            <input
              onChange={handleChange}
              type="date"
              name="startDate"
              value={Info.startDate}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="endDate" className="block text-sm font-semibold text-gray-700">Gym End Date</label>
            <input
              onChange={handleChange}
              type="date"
              name="endDate"
              value={Info.endDate}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="totalPayment" className="block text-sm font-semibold text-gray-700">Total Payment</label>
            <input
              onChange={handleChange}
              type="text"
              name="totalPayment"
              value={Info.totalPayment}
              placeholder="Enter the Total Amount"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="deposit" className="block text-sm font-semibold text-gray-700">Deposit</label>
            <input
              onChange={handleChange}
              type="text"
              name="deposit"
              value={Info.deposit}
              placeholder="Enter the Deposit"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-center">
            <button type="submit" className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200">
              {editId ? 'Update' : 'Submit'}
            </button>
          </div>
        </form>

        {/* Search bar */}
        <div className="mt-8 w-full px-4 sm:px-8 lg:px-16 bg-white p-4 rounded-lg shadow-md">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Find the GYM Member"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto mt-6 min-h-96 mb-28 bg-white p-6 rounded-lg shadow-md">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Phone</th>
                <th className="border px-4 py-2">Start Date</th>
                <th className="border px-4 py-2">End Date</th>
                <th className="border px-4 py-2">Total Payment</th>
                <th className="border px-4 py-2">Deposit</th>
                <th className="border px-4 py-2">Remaining Payment</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((item) => (
                <tr key={item._id}>
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">{item.phoneNumber}</td>
                  <td className="border px-4 py-2">{formatDate(item.startDate)}</td>
                  <td className="border px-4 py-2">{formatDate(item.endDate)}</td>
                  <td className="border px-4 py-2">{item.totalPayment}</td>
                  <td className="border px-4 py-2">{item.deposit}</td>
                  <td className="border px-4 py-2">
                    {item.totalPayment - item.deposit}
                  </td>
                  <td className="border px-4 py-2 flex justify-center space-x-4">
                    <button onClick={() => handleUpdate(item)} className="text-blue-600 hover:text-blue-800">
                      <FaEdit size={18} />
                    </button>
                    <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-800">
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ToastContainer />
      </div>

      <Footer />
    </div>
  );
};

export default MainPage;









