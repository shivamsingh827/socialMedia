
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const dotenv=require('dotenv');
const { ObjectId } = require('mongodb');

const { GridFSBucket } = require('mongodb');
const { Grid } = require('gridfs-stream');


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


const connection = mongoose.connection;
let gfs;
let gfsFiles;
connection.once('open', async () => {
  console.log('Connected to MongoDB');
  const db = connection.db;
  gfs = new mongoose.mongo.GridFSBucket(db, { bucketName: 'uploads' });

  gfsFiles = new mongoose.mongo.GridFSBucket(db, { bucketName: 'uploads.files' });

  if(gfs.files)console.log("initalised gfs.files");
  // const file = await gfsFiles.findOne({ filename:"1703945588862-dsfaf.jpeg" });
  // console.log(file._id);
 
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

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint to serve images

app.get('/api/image/:id', async (req, res) => {
  try {
      if (!gfs) {
          return res.status(500).json({ error: 'GridFS not initialized properly' });
      }

      const objectId = new ObjectId(req.params.id);
      const file = await gfs.find({ _id: objectId }).toArray();

      if (!file || file.length === 0) {
          return res.status(404).json({ error: 'File not found' });
      }

      const readStream = gfs.openDownloadStream(objectId);
      readStream.pipe(res);
  } catch (error) {
      console.error('Error finding file in GridFS:', error);
      if (error.name === 'CastError') {
          return res.status(400).json({ error: 'Invalid ID format' });
      }
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/api/signup', upload.single('profilePicture'), async (req, res) => {
  try {
    const { name, username, password, age, mobileNumber, profilePicture} = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
      
    }

    // Get the filename (or you can use ObjectId as a unique identifier)
    const filename = Date.now() + '-' + req.file.originalname;

    // Ensure gfs is properly initialized
    if (!gfs) {
      return res.status(500).json({ error: 'GridFS not initialized' });
    }

    // Store the file in GridFS
    const writeStream = gfs.openUploadStream(filename, {
      metadata: { contentType: req.file.mimetype },
    });

    // Pipe the file buffer into the GridFS stream
    writeStream.end(req.file.buffer);

    // Save the user data with the file ID
    const user = new User({
      name,
      username,
      password,
      age,
      mobileNumber,
      profilePicture: writeStream.id, // Use the ID of the GridFS file as a reference
    });

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
      mobileNumber: user.mobileNumber,
      profilePicture: user.profilePicture
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
