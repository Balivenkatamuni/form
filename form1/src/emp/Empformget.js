// Formdataget.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Empformget.css';

const Formdataget = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3000/get-employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleEdit = (employeeId) => {
    console.log(`Edit employee with ID: ${employeeId}`);
  };

  const handleDelete = async (employeeId) => {
    try {
    
      await axios.delete(`http://localhost:3000/delete-employee/${employeeId}`);
      setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.employeeId !== employeeId));
    } catch (error) {
      console.error(`Error deleting employee with ID ${employeeId}:`, error);
    }
  };

  return (
    <div className='main'>
      <h2>Employee List</h2>
      <table className='employee-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Designation</th>
            <th>Modification</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.employeeId}</td>
              <td>{employee.email}</td>
              <td>{employee.gender}</td>
              <td>{employee.address}</td>
              <td>{employee.designation}</td>
              <td><button onClick={() => handleEdit(employee.employeeId)}>Edit</button></td>
              <td><button onClick={() => handleDelete(employee.employeeId)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Formdataget;
