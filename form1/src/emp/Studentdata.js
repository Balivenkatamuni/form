import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Studentdata.css';


const StudentFormdataget = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editedData, setEditedData] = useState({});

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
    setEditedData({ ...selectedStudent });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/update-student/${selectedStudent.studentId}`, editedData);

      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.studentId === selectedStudent.studentId
            ? { ...student, ...editedData }
            : student
        )
      );

      setSelectedStudent(null);
      setEditedData({});
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  
  const handleDelete = async (studentId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/delete-student/${studentId}`);

      if (response.status === 200) {
        console.log(`Student with ID ${studentId} deleted successfully`);
        setStudents((prevStudents) =>
          prevStudents.filter((student) => student.studentId !== studentId)
        );
      } else {
        console.error(
          `Error deleting student with ID ${studentId}: Unexpected response status ${response.status}`
        );
      }
    } catch (error) {
      console.error(`Error deleting student with ID ${studentId}:`, error);
    }
  };

  const handleInputChange = (field, value) => {
    setEditedData((prevData) => ({ ...prevData, [field]: value }));
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
              <td>
                {selectedStudent && selectedStudent.studentId === student.studentId ? (
                  <input   className='inputtext'
                    value={editedData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                ) : (
                  student.name
                )}
              </td>
              <td>
                {selectedStudent && selectedStudent.studentId === student.studentId ? (
                  <input className='inputtext'
                    value={editedData.studentId}
                    onChange={(e) => handleInputChange('studentId', e.target.value)}
                  />
                ) : (
                  student.studentId
                )}
              </td>
              <td>
                {selectedStudent && selectedStudent.studentId === student.studentId ? (
                  <input className='inputtext'
                    value={editedData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                ) : (
                  student.email
                )}
              </td>
              <td>
                {selectedStudent && selectedStudent.studentId === student.studentId ? (
                  <input  className='inputtext'
                    value={editedData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                  />
                ) : (
                  student.gender
                )}
              </td>
              <td>
                {selectedStudent && selectedStudent.studentId === student.studentId ? (
                  <input className='inputtext'
                    value={editedData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                ) : (
                  student.address
                )}
              </td>
              <td>
                {selectedStudent && selectedStudent.studentId === student.studentId ? (
                  <input   className='inputtext'
                    value={editedData.course}
                    onChange={(e) => handleInputChange('course', e.target.value)}
                  />
                ) : (
                  student.course
                )}
              </td>
              <td>
                {selectedStudent && selectedStudent.studentId === student.studentId ? (
                  <button className='button3' onClick={handleUpdate}>
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
           
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentFormdataget;
