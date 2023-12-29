

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Empformget.css';

const Formdataget = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({
    name: '',
    employeeId:'',
    email: '',
    gender: '',
    address: '',
    designation: '',
  });
  
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
    const selectedEmp = employees.find((employee) => employee.employeeId === employeeId);
    setSelectedEmployee(selectedEmp);
    setUpdateFormData({
      name: selectedEmp.name,
      employeeId:selectedEmp.employeeId,
      email: selectedEmp.email,
      gender: selectedEmp.gender,
      address: selectedEmp.address,
      designation: selectedEmp.designation,
    }); 
  
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/update-employee/${selectedEmployee.employeeId}`, updateFormData);
    
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.employeeId === selectedEmployee.employeeId ? { ...employee, ...updateFormData } : employee
        )
      );
     
      setSelectedEmployee(null);
      setUpdateFormData({
        name: '',
        employeeId:'',
        email: '',
        gender: '',
        address: '',
        designation: '',
      });
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleDelete = async (employeeId) => {
    try {
      await axios.delete(`http://localhost:3000/delete-employee/${employeeId}`);
      setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.employeeId !== employeeId));
    } catch (error) {
      console.error(`Error deleting employee with ID ${employeeId}:`, error);
    }
  };

  
  const handleInputChange = (e) => {
    setUpdateFormData({
      ...updateFormData,
      [e.target.name]: e.target.value,
    });
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
      {selectedEmployee && (
        <div className='modal'>
          <h2>Edit Employee</h2>
          <form>
            <label>Name:</label>
            <input type='text' name='name' value={updateFormData.name} onChange={handleInputChange} />

            <label>Email:</label>
            <input type='text' name='email' value={updateFormData.email} onChange={handleInputChange} />

            <label>Gender:</label>
            <input type='text' name='gender' value={updateFormData.gender} onChange={handleInputChange} />

            <label>Address:</label>
            <input type='text' name='address' value={updateFormData.address} onChange={handleInputChange} />

            <label>Designation:</label>
            <input type='text' name='designation' value={updateFormData.designation} onChange={handleInputChange} />

            <button type='button' onClick={handleUpdate}>
              Update
            </button>
            <button type='button' onClick={() => setSelectedEmployee(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}

    </div>
  );
};

export default Formdataget;
