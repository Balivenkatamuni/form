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
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.Name}</td>
              <td>{employee.EmployeeId}</td>
              <td>{employee.Email}</td>
              <td>{employee.Gender}</td>
              <td>{employee.Address}</td>
              <td>{employee.Designation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Formdataget;
