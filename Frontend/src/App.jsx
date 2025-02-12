// // export default App;
// import React from "react";
// import SignUp from "./Pages/SignUp";
// import Login from "./Pages/Login";
// import Home from "./Pages/Home";
// import Profile from "./Pages/Profile";
// import Projects from "./Pages/Projects";
// import ResearchDoubts from "./Pages/ResearchDoubts";
// import ViewMoreDetails from "./Pages/ViewMoreDetails";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import StudentHeader from "./Components/StudentsHeader";
// import Footer from "./Components/Footer";
// import Resetpassword from "./Pages/Resetpassword";
// import TeacherProfile from "./Pages/TeacherProfile";
// import ViewTeacherDetails from "./Pages/ViewTeacherDetails";
// import TeacherDashboard from "./Pages/TeacherDashboard";
// import Chatbot from "./Components/Chatbot";

// function App() {
//   // Check if the user is logged in by checking localStorage for teacherId or studentId
//   const isLoggedIn =
//     localStorage.getItem("teacherId") || localStorage.getItem("studentId");
//   console.log("isloogedin", isLoggedIn);
//   return (
//     <>
//       <Router>
//         <StudentHeader />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/SignUp" element={<SignUp />} />
//           <Route path="/Login" element={<Login />} />
//           <Route path="/Profile" element={<Profile />} />
//           <Route path="/Projects" element={<Projects />} />
//           <Route path="/ResearchDoubts" element={<ResearchDoubts />} />
//           <Route path="/ViewMoreDetails" element={<ViewMoreDetails />} />
//           <Route path="/Resetpassword/:token" element={<Resetpassword />} />
//           <Route path="/TeacherProfile" element={<TeacherProfile />} />
//           <Route path="/ViewTeacherDetails" element={<ViewTeacherDetails />} />
//           <Route path="/TeacherDashboard" element={<TeacherDashboard />} />
//         </Routes>
//         {/* <div className="min-h-screen bg-gray-900 text-white"> */}
//         {/* <h1 className="text-center text-4xl font-bold p-10">
//             Welcome to Teacher Finder
//           </h1> */}
//         {/* Conditionally render the Chatbot component based on login status */}
//         {isLoggedIn && <Chatbot />}
//         {/* </div> */}
//         <Footer />
//       </Router>
//     </>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Projects from "./Pages/Projects";
import ResearchDoubts from "./Pages/ResearchDoubts";
import ViewMoreDetails from "./Pages/ViewMoreDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentHeader from "./Components/StudentsHeader";
import Footer from "./Components/Footer";
import Resetpassword from "./Pages/Resetpassword";
import TeacherProfile from "./Pages/TeacherProfile";
import ViewTeacherDetails from "./Pages/ViewTeacherDetails";
import TeacherDashboard from "./Pages/TeacherDashboard";
import Chatbot from "./Components/Chatbot";


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
        <StudentHeader onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignUp" element={<SignUp onLogin={handleLogin} />} />
          <Route path="/Login" element={<Login onLogin={handleLogin} />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Projects" element={<Projects />} />
          <Route path="/ResearchDoubts" element={<ResearchDoubts />} />
          <Route path="/ViewMoreDetails" element={<ViewMoreDetails />} />
          <Route path="/Resetpassword/:token" element={<Resetpassword />} />
          <Route path="/TeacherProfile" element={<TeacherProfile />} />
          <Route path="/ViewTeacherDetails" element={<ViewTeacherDetails />} />
          <Route path="/TeacherDashboard" element={<TeacherDashboard />} />

        </Routes>
        {/* Conditionally render the Chatbot component based on login status */}
        {isLoggedIn && <Chatbot />}
        <Footer />
      </Router>
    </>
  );
}

export default App;
