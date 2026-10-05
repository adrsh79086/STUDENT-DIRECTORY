import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getProfile } from '../services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setName(data.user.name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  return (
  <nav className="navbar">
    <h2>Smart Tracker</h2>

    <div className="navbar-right">
      <span>Welcome, {name}</span>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  </nav>
);
};

export default Navbar;