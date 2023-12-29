import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';


import StudentForm from './emp/Student';
import StudentFormdataget from './emp/Studentdata';
function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path='/' element={<StudentForm/>}/>
        <Route path='Studentdata' element={<StudentFormdataget/>}/>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
