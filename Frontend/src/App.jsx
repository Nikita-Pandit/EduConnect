import React from 'react';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Profile from './Pages/Profile'
import Projects from './Pages/Projects'
import ResearchDoubts from './Pages/ResearchDoubts'
import ViewMoreDetails from './Pages/ViewMoreDetails'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentHeader from './Components/StudentsHeader';
import Footer from './Components/Footer';
import Resetpassword  from './Pages/Resetpassword';   
import TeacherProfile from "./Pages/TeacherProfile";
function App() {
  return (
    <>

    <Router>
    <StudentHeader/>
      <Routes>
        <Route path="/Home" element={ <Home/>} /> 
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Projects" element={<Projects />} />
        <Route path="/ResearchDoubts" element={<ResearchDoubts />} />
        <Route path="/ViewMoreDetails" element={<ViewMoreDetails />} />
        <Route path="/Resetpassword/:token" element={<Resetpassword/>}/>
        <Route path="/TeacherProfile" element={<TeacherProfile/>}/>
      </Routes>
      <Footer/>
    </Router>
    </>
    
  );
}

export default App;
