

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Studentdata.css';

const StudentFormdataget = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({
    name: '',
    studentId:'',
    email: '',
    gender: '',
    address: '',
    course: '',
  });
  
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/get-students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);

      }
    };

    fetchStudents();
  }, []);

  const handleEdit = (studentId) => {
    const selectedStudent = students.find((student) => student.studentId === studentId);
    setSelectedStudent(selectedStudent);
    setUpdateFormData({
      name: selectedStudent.name,
      studentId:selectedStudent.studentId,
      email: selectedStudent.email,
      gender: selectedStudent.gender,
      address: selectedStudent.address,
      course:selectedStudent.course,
    }); 
  
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/update-student/${selectedStudent.studentId}`, updateFormData);
     
       setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.studentId === selectedStudent.studentId ? { ...student, ...updateFormData } : student
      )
    );
    
     
      setSelectedStudent(null);
      setUpdateFormData({
        name: '',
       studentId:'',
        email: '',
        gender: '',
        address: '',
        course: '',
      });
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleDelete = async (studentId) => {
    try {
      await axios.delete(`http://localhost:3000/delete-student/${studentId}`);
      setStudents((prevStudents) => prevStudents.filter((student) => student.studentId !== studentId));
    } catch (error) {
      console.error(`Error deleting student with ID ${studentId}:`, error);
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
      <h2>Student List</h2>
      <table className='employee-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Course</th>
            <th>Modification</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.studentId}</td>
              <td>{student.email}</td>
              <td>{student.gender}</td>
              <td>{student.address}</td>
              <td>{student.course}</td>
              <td><button onClick={() => handleEdit(student.studentId)}>Edit</button></td>
              <td><button onClick={() => handleDelete(student.studentId)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedStudent && (
        <div className='modal'>
          <h2>Edit Students</h2>
          <form >
            <label>Name:</label>
            <input type='text' name='name' value={updateFormData.name} onChange={handleInputChange} />
            <label>StudentId:</label>
            <input type='text' name='studentId' value={updateFormData.studentId} onChange={handleInputChange} />

            <label>Email:</label>
            <input type='text' name='email' value={updateFormData.email} onChange={handleInputChange} />

            <label>Gender:</label>
            <input type='text' name='gender' value={updateFormData.gender} onChange={handleInputChange} />

            <label>Address:</label>
            <input type='text' name='address' value={updateFormData.address} onChange={handleInputChange} />

            <label>Course:</label>
            <input type='text' name='course' value={updateFormData.course} onChange={handleInputChange} />

            <button type='button' onClick={handleUpdate}>
              Update
            </button>
            <button type='button' onClick={() => setSelectedStudent(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}

    </div>
  );
};

export default StudentFormdataget;
