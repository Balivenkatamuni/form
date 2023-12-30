import React, { useState } from 'react';
import axios from 'axios';
import './Student.css'
import { Link } from 'react-router-dom';



const StudentForm = () => {
   
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    email: '',
    gender: '',
    address: '',
    course: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
   
      const response = await axios.post('http://localhost:3000/student-form', formData);

      console.log(response.data);

     
      setFormData({
        name: '',
        studentId: '',
        email: '',
        gender: '',
        address: '',
        course: ''
      });

    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>StudentForm</h1>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Student ID:</label>
        <input type="text" name="studentId" value={formData.studentId} onChange={handleChange} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
      <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
     </div>
      <div>
        <label>Address:</label>
        <textarea name="address" value={formData.address} onChange={handleChange} required/>
      </div>
      <div>
        <label>Course:</label>
        <input type="text" name="course" value={formData.course} onChange={handleChange} required/>
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </div>
      <div>
       <Link to="./Studentdata" className='link'> 
       <button  className='button1' type="submit">Get data</button>
       </Link>
      </div>
    </form>
  );
};

export default StudentForm;
