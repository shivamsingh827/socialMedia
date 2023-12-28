
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [profilePicture, setProfilePicture] = useState(null); // Added state for profile picture
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      // Create a FormData object to handle file uploads
      const formData = new FormData();
      formData.append('name', name);
      formData.append('username', username);
      formData.append('password', password);
      formData.append('age', age);
      formData.append('mobileNumber', mobileNumber);
      formData.append('profilePicture', profilePicture); // Append the profile picture

      const response = await axios.post('http://localhost:5000/api/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type to handle file upload
        },
      });

      // Handle the response (e.g., show a success message, redirect the user)
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error(error);
    }
  };

  const handleProfilePictureChange = (e) => {
    // Update the profile picture state when the file input changes
    setProfilePicture(e.target.files[0]);
  };

  const containerStyle = {
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: '#fff',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ddd',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#3498db',
    color: '#fff',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={inputStyle}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
      />
      <input
        type="text"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        style={inputStyle}
      />
      <input
        type="text"
        placeholder="Mobile Number"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
        style={inputStyle}
      />
      <label>
        Profile Picture:
        <input type="file" onChange={handleProfilePictureChange} style={inputStyle} />
      </label>
      <button onClick={handleSignUp} style={buttonStyle}>
        Sign Up
      </button>
      <p style={{ textAlign: 'center', marginTop: '10px' }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default SignUp;
