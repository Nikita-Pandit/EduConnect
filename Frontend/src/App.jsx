import React, { useState, useEffect } from "react";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Students from "./Pages/Students";
import Supervisors from "./Pages/Supervisors";
import ViewMoreDetails from "./Pages/ViewMoreDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Headers from "./Components/Headers";
import Footer from "./Components/Footer";
import Resetpassword from "./Pages/Resetpassword";
import TeacherProfile from "./Pages/TeacherProfile";
import ViewTeacherDetails from "./Pages/ViewTeacherDetails";
import TeacherDashboard from "./Pages/TeacherDashboard";
import StudentList from "./Pages/StudentList";
import Chatbot from "./Components/Chatbot";
import StudentDashboard from "./Pages/StudentDashboard";

function App() {
  // State to track login status
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("teacherId") || localStorage.getItem("studentId")
  );

  // Function to update login status
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Function to update logout status
  const handleLogout = () => {
    localStorage.removeItem("teacherId");
    localStorage.removeItem("studentId");
    setIsLoggedIn(false);
  };

  // Effect to update login status when localStorage changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn =
        localStorage.getItem("teacherId") || localStorage.getItem("studentId");
      setIsLoggedIn(loggedIn);
    };

    // Check login status on component mount
    checkLoginStatus();

    // Optional: Listen for changes in localStorage (if needed)
    window.addEventListener("storage", checkLoginStatus);

    // Cleanup event listener
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, [isLoggedIn]);

  return (
    <>
      <Router>
        <Headers onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignUp" element={<SignUp onLogin={handleLogin} />} />
          <Route path="/Login" element={<Login onLogin={handleLogin} />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Students" element={<Students/>} />
          <Route path="/Supervisors" element={<Supervisors/>} />
          <Route path="/ViewMoreDetails" element={<ViewMoreDetails />} />
          <Route path="/Resetpassword/:token" element={<Resetpassword />} />
          <Route path="/TeacherProfile" element={<TeacherProfile />} />
          <Route path="/ViewTeacherDetails" element={<ViewTeacherDetails />} />
          <Route path="/TeacherDashboard" element={<TeacherDashboard />} />
          <Route path="/StudentList" element={<StudentList />} />
          <Route path="/StudentDashboard" element={<StudentDashboard />} />
        </Routes>
        {/* Conditionally render the Chatbot component based on login status */}
        {isLoggedIn && <Chatbot />}
        <Footer />
      </Router>
    </>
  );
}

export default App;
