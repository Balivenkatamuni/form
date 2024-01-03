import React, { useState } from 'react';
import axios from 'axios';

function Createaccount() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    username: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3001/Createaccount-form', formData);

      console.log(response.data);

      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        username: '',
        password: ''
      });

      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Registration failed. Please try again.'); // Set an error message
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
      <div>
        <label>Firstname:</label>
        <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} />
      </div>
      <div>
        <label>Lastname:</label>
        <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div>
        <label>Phone:</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
      </div>
      <div>
        <label>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button  >Register</button>
      </form>
    </div>
   
  );
}

export default Createaccount;
