import React from 'react';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Profile from './Pages/Profile'
import Projects from './Pages/Projects'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentHeader from './Components/StudentsHeader';
import Footer from './Components/Footer';

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
      </Routes>
      <Footer/>
    </Router>
    </>
    
  );
}

export default App;
