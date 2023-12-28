
import React from 'react';

const Home = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', 
    overflow: 'hidden',
    width: '97%', 
    // margin: '0px 100px', // Remove default margin
    padding: 0, // Remove default padding
    // backgroundPosition: 'center center',
    background: `url('https://www.searchenginejournal.com/wp-content/uploads/2021/09/16-reasons-why-social-media-is-important-to-your-company-616d3200e6dc6-sej.png')`,
    backgroundSize: 'cover',
    color: '#333',
    textAlign: 'center',
    padding: '20px',
  };
  
  
  
  
  

  const introStyle = {
    fontSize: '32px',
    marginBottom: 'auto',
  };

  return (
      <div style={containerStyle}>
        <h1 style={introStyle}>Welcome to Our Social Media Platform</h1>
     
    </div>
  );
};

export default Home;
