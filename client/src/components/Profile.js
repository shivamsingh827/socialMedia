import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import axios from 'axios';
import { useUser } from '../Usercontext';
import SharePopUp from './Sharepopup';
import '../App.css';

const Profile = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/profile/${user.username}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error.response.data.error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleShareClick = () => {
    setShowPopUp(true);
  };

  const handleClosePopUp = () => {
    setShowPopUp(false);
  };

  return (
    <div className="profile-container">
      {userData && (
        <>
          <div className="profile-image-container">
            {userData.profilePicture && (
              <img
                className="profile-image"
                src={`http://localhost:5000/api/image/${userData.profilePicture}`}
                alt="Profile"
              />
            )}
          </div>
          <h2>Profile</h2>
          <p>Name: {userData.name}</p>
          <p>Username: {userData.username}</p>
          <p>Age: {userData.age}</p>
          <p>Mobile Number: {userData.mobileNumber}</p>
          <button id="btn" onClick={handleShareClick}>Share Profile</button>
        </>
      )}
      {showPopUp && <SharePopUp userData={userData} onClose={handleClosePopUp} />}
    </div>
  );
};

export default Profile;
