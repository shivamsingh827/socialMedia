// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import Nav from './components/Navbar';
import { UserProvider } from './Usercontext';
import Home from './components/Home';

const App = () => {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={
            <>
              <Nav />
              <Home />
            </>
          } />
          <Route path="/signup" element={
            <>
              <Nav />
              <SignUp />
            </>
          } />
          <Route path="/login" element={
            <>
              <Nav />
              <Login />
            </>
          } />
          <Route path="/profile" element={
            <>
              <Nav />
              <Profile />
            </>
          } />
        
        </Routes>
      </UserProvider>
    </Router>
  );
};

export default App;
