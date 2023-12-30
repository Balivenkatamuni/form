import React, { useState } from 'react';
import axios from 'axios';
import './Empform.css'
import { Link } from 'react-router-dom';



const Form = () => {
   
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    email: '',
    gender: '',
    address: '',
    designation: ''
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
      // Use axios to make a POST request to the server
      const response = await axios.post('http://localhost:3000/submit-form', formData);

      console.log(response.data);

      // Optionally, you can reset the form after successful submission
      setFormData({
        name: '',
        employeeId: '',
        email: '',
        gender: '',
        address: '',
        designation: ''
      });

    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>EmployeeForm</h1>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Employee ID:</label>
        <input type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} required />
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
        <label>Designation:</label>
        <input type="text" name="designation" value={formData.designation} onChange={handleChange} required/>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
      <div>
       <Link to="./Empformget" className='link'> 
       <button  className='button1' type="submit">Get data</button>
       </Link>
      </div>
    </form>
  );
};

export default Form;
