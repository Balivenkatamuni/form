const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

mongoose.connect('mongodb://localhost:27017/Createaccount-form', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const studentSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    username: String,
    password: String,
});

const Student = mongoose.model('user', studentSchema);


app.use(cors());
app.use(bodyParser.json());

app.post('/Createaccount-form', async (req, res) => {
  try {
    console.log('Received form data:', req.body);

    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

