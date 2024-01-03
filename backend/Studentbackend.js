const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/Student', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const studentSchema = new mongoose.Schema({
  name: String,
  studentId: String,
  email: String,
  gender: String,
  address: String,
  course: String,
});

const Student = mongoose.model('students', studentSchema);


app.use(cors());
app.use(bodyParser.json());

app.post('/Student-form', async (req, res) => {
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

app.get('/get-students', async (req, res) => {
  try {
    const students = await Student.find();
    console.log('Fetched students:', students);
    res.status(200).json(students);
   
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



app.put('/update-student/:studentId', async (req, res) => {
    const studentId = req.params.studentId;
    const updatedStudentData = req.body;
  
    try {
    
      const updatedStudent = await Student.findOneAndUpdate(
        { studentId: studentId },
        { $set: updatedStudentData },
        { new: true } 
      );
  
      if (updatedStudent) {
        res.status(200).json({ message: 'Studnet updated successfully', updatedStudent });
        
      } else {
        res.status(404).json({ message: 'Student not found' });
      }
    } catch (error) {
      console.error('Error updating student:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.delete('/delete-student/:studentId', async (req, res) => {
    const studentId = req.params.studentId;
  
    try {
     
      const deletedStudent = await Student.findOneAndDelete({ studentId: studentId });
  
      if (deletedStudent) {
        res.status(200).json({ message: 'Student deleted successfully', deletedStudent });
      } else {
        res.status(404).json({ message: 'Student not found' });
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
