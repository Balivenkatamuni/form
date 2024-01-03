import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      if (!loginUsername || !loginPassword) {
        setError('Please provide both username and password.');
        return;
      }

      const response = await axios.post('http://localhost:5000/api/login', {
        username: loginUsername,
        password: loginPassword,
      });

      console.log(response.data.message);

    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data.message : 'Unknown error');
      setError('Invalid username or password.');
    }
  };



  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input type="text" value={loginUsername.username} onChange={(e) => setLoginUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={loginPassword.password} onChange={(e) => setLoginPassword(e.target.value)} />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button className='button1 ' onClick={handleLogin}>Login</button>
     <Link to='Createaccount'> <button className='button2'>Createaccount</button></Link>
    </div>
  );
};

export default Login;
