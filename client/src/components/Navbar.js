
import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../Usercontext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logoutUser } = useUser();
  const navigate = useNavigate();
  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    background: '#3498db',
    color: '#fff',
  };

  const logoStyle = {
    textDecoration: 'none',
    color: '#fff',
    fontSize: '24px',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#fff',
    marginLeft: '10px',
    fontSize: '18px',
    padding: '8px 12px',
  };

  const buttonStyle = {
    marginLeft: '10px',
    fontSize: '18px',
    padding: '8px 12px',
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
  };
  
  const logout = async () => {
    logoutUser();
    navigate('/');

  };
  return (
    <nav style={navbarStyle}>
      {/* Website Logo */}
      <Link to="/" style={logoStyle}>
        Social Media
      </Link>

      {/* Navigation Links */}
      <div>
        <Link to="/signup" style={linkStyle}>
          Signup
        </Link>
        <Link to="/login" style={linkStyle}>
          Login
        </Link>
        {user ? (
          <>
            <Link to="/profile" style={linkStyle}>
              Profile
            </Link>
            <button onClick={logout} style={buttonStyle}>
              Logout
            </button>
          </>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
