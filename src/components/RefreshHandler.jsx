import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RefreshHandler = ({ setisAuthenticate }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setisAuthenticate(true);

      // Redirect authenticated users to /mainpage if they are on / or /loginpage
      if (location.pathname === '/' || location.pathname === '/loginpage') {
        navigate('/mainpage', { replace: true });
      }
    } else {
      setisAuthenticate(false);

      // Redirect unauthenticated users to /loginpage if they try to access protected routes
      if (location.pathname !== '/' && location.pathname !== '/loginpage') {
        navigate('/loginpage', { replace: true });
      }
    }
  }, [location, setisAuthenticate, navigate]);

  return null;
};

export default RefreshHandler;
