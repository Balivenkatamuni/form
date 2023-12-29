// Formdataget.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Empformget.css';

const Formdataget = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({
    name: '',
    email: '',
    gender: '',
    address: '',
    designation: '',
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3001/get-employees');
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
      email: selectedEmp.email,
      gender: selectedEmp.gender,
      address: selectedEmp.address,
      designation: selectedEmp.designation,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/update-employee/${selectedEmployee.employeeId}`, updateFormData);
      // Update the local state with the new data
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.employeeId === selectedEmployee.employeeId ? { ...employee, ...updateFormData } : employee
        )
      );
      // Reset the selected employee and form data
      setSelectedEmployee(null);
      setUpdateFormData({
        name: '',
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
        {/* ... (same as your existing code) */}
      </table>

      {/* Modal for Update */}
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
