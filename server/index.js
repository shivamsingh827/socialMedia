
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const dotenv=require('dotenv');

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();


app.use(cors());
app.use(bodyParser.json());

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

// MongoDB connection
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.3aewvpq.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true ,useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});




// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true },
  password: String,
  age: String,
  mobileNumber: String,
  profilePicture: String,
});

const User = mongoose.model('User', userSchema);

// Signup endpoint
// server.js
// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + '-' + file.originalname;
    console.log('Generated file name:', fileName);
    cb(null, fileName);
  },
});


const upload = multer({ storage: storage });

// Signup endpoint with file upload
app.post('/api/signup', upload.single('profilePicture'), async (req, res) => {
  try {
    const { name, username, password, age, mobileNumber } = req.body;

    // Check if a file is uploaded
    const profilePicture = req.file ? req.file.path : '';

    const user = new User({ name, username, password, age, mobileNumber, profilePicture });

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(200).json({ message: 'Username is already registered' });
    }

    await user.save();

    res.status(200).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//after scanning qr
app.get('/profile/:username', async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      name: user.name,
      username: user.username,
      age: user.age,
      mobileNumber: user.mobileNumber
      // profilePicture: user.profilePicture,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// GET user profile
app.get('/api/user/profile/:username', async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      name: user.name,
      username: user.username,
      age: user.age,
      mobileNumber: user.mobileNumber,
      profilePicture: user.profilePicture, // Add the profile picture path
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      res.json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
