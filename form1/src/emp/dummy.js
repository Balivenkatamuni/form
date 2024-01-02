import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Studentdata.css';
import { Link } from 'react-router-dom';

const StudentFormdataget = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

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
  };

  const handleUpdate = async (field, value) => {
    try {
      await axios.put(`http://localhost:3000/update-student/${selectedStudent.studentId}`, {
        [field]: value,
      });

      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.studentId === selectedStudent.studentId
            ? { ...student, [field]: value }
            : student
        )
      );

      setSelectedStudent(null);
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };
  const handleDelete = async (studentId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/delete-student/${studentId}`);
  
      if (response.status === 200) {
        console.log(`Student with ID ${studentId} deleted successfully`);
        setStudents((prevStudents) => prevStudents.filter((student) => student.studentId !== studentId));
      } else {
        console.error(`Error deleting student with ID ${studentId}: Unexpected response status ${response.status}`);
      }
    } catch (error) {
      console.error(`Error deleting student with ID ${studentId}:`, error);
    }
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
            <th>Back to Form</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td
                contentEditable={selectedStudent && selectedStudent.studentId === student.studentId}
                onBlur={(e) => handleUpdate('name', e.target.innerText)}
              >
                {student.name}
              </td>
              <td>{student.studentId}</td>
              <td
                contentEditable={selectedStudent && selectedStudent.studentId === student.studentId}
                onBlur={(e) => handleUpdate('email', e.target.innerText)}
              >
                {student.email}
              </td>
              <td
                contentEditable={selectedStudent && selectedStudent.studentId === student.studentId}
                onBlur={(e) => handleUpdate('gender', e.target.innerText)}
              >
                {student.gender}
              </td>
              <td
                contentEditable={selectedStudent && selectedStudent.studentId === student.studentId}
                onBlur={(e) => handleUpdate('address', e.target.innerText)}
              >
                {student.address}
              </td>
              <td
                contentEditable={selectedStudent && selectedStudent.studentId === student.studentId}
                onBlur={(e) => handleUpdate('course', e.target.innerText)}
              >
                {student.course}
              </td>
              <td>
                {selectedStudent && selectedStudent.studentId === student.studentId ? (
                  <button className='button3' onClick={() => setSelectedStudent(null)}>
                    Done
                  </button>
                ) : (
                  <button className='button2' onClick={() => handleEdit(student.studentId)}>
                    Edit
                  </button>
                )}
              </td>
              <td>
                <button className='button2' onClick={() => handleDelete(student.studentId)}>
                  Delete
                </button>
              </td>
              <Link className='linkclass' to="/">
                {' '}
                <td>
                  {' '}
                  <button className='button6'>Form</button>
                </td>{' '}
              </Link>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentFormdataget;
