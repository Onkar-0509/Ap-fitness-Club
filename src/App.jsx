import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import Login from './components/LoginPage';
import Profile from './components/Profile';
import FrontPage from './components/FrontPage';
import Notifications from './components/Notifications';
import RefreshHandler from './components/RefreshHandler';

const App = () => {
  const [isAuthenticate, setisAuthenticate] = useState(false);

  // PrivateRoute component for protected routes
  const PrivateRoute = ({ element }) => {
    return isAuthenticate ? element : <Navigate to="/loginpage" replace />;
  };

  return (
    <div>
      {/* RefreshHandler checks and sets authentication state */}
      <RefreshHandler setisAuthenticate={setisAuthenticate} />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<FrontPage />} />
        <Route path="/loginpage" element={<Login />} />

        {/* Protected routes */}
        <Route path="/mainpage" element={<PrivateRoute element={<MainPage />} />} />
        <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
        <Route path="/notifications" element={<PrivateRoute element={<Notifications />} />} />
      </Routes>
    </div>
  );
};

export default App;


