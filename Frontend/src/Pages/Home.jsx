// import React from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// // import {signup} from "./SignUp";
// import {
//   Sparkles,
//   MessageSquareText,
//   ShieldCheck,
//   BarChart2,
//   Users,
//   Zap,
// } from "lucide-react";

// const features = [
//   { icon: <ShieldCheck className="w-6 h-6 text-[#9B30FF]" />, text: "Secure Sign Up & Login" },
//   { icon: <MessageSquareText className="w-6 h-6 text-[#9B30FF]" />, text: "AI Chatbot for Queries" },
//   { icon: <Zap className="w-6 h-6 text-[#9B30FF]" />, text: "Teacher Prioritization System" },
//   { icon: <BarChart2 className="w-6 h-6 text-[#9B30FF]" />, text: "Dynamic Ranking Visualization" },
//   { icon: <Users className="w-6 h-6 text-[#9B30FF]" />, text: "Student-Teacher Selection" },
//   { icon: <Sparkles className="w-6 h-6 text-[#9B30FF]" />, text: "Domain & Skill Matching" },
// ];

// const Home = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="bg-[#091024] min-h-screen text-white font-sans scroll-smooth">
      
//       {/* Hero Section */}
//       <section className="text-center py-24 px-6 bg-gradient-to-b from-[#0d1126] via-[#091024] to-[#0d1126]">
//         <motion.h1
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-5xl font-bold text-[#E1C3FF] mb-4 drop-shadow-md"
//         >
//           Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E1C3FF] to-[#9B30FF]">EduConnect</span>
//         </motion.h1>
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//           className="text-lg text-[#9B30FF] max-w-xl mx-auto"
//         >
//           AI-powered collaboration platform connecting students and teachers for project guidance, mentorship, and innovation.
//         </motion.p>
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="mt-10 px-8 py-3 bg-gradient-to-r from-[#6D0BCF] to-[#9B30FF] text-white rounded-full shadow-lg hover:shadow-purple-400 transition duration-300"
//           onClick={() => navigate("/signup")}
//         >
//           Get Started
//         </motion.button>
//       </section>

//       {/* Features Section with Image Left */}
//       <section className="py-20 px-6">
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
//           <motion.img
//             whileHover={{ scale: 1.02 }}
//             src="https://www.gstatic.com/classroom/themes/img_reachout.jpg"
//             alt="Features Illustration"
//             className="w-full md:w-1/2 rounded-2xl shadow-lg"
//           />
//           <div className="grid sm:grid-cols-2 gap-6 w-full md:w-1/2">
//             {features.map((item, index) => (
//               <motion.div
//                 key={index}
//                 whileHover={{ scale: 1.05 }}
//                 className={`p-5 rounded-xl border shadow-md hover:shadow-purple-400 ${
//                   index % 2 === 0 ? "bg-[#0d1126] border-[#E1C3FF]" : "bg-[#091024] border-[#9B30FF]"
//                 }`}
//               >
//                 <div className="flex items-center gap-4">
//                   {item.icon}
//                   <p className="text-[#E1C3FF] text-lg">{item.text}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* About Us Section with Image Right */}
//       <section className="py-20 px-6 bg-[#0d1126]">
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-12">
//           <motion.img
//             whileHover={{ scale: 1.02 }}
//             src="https://www.gstatic.com/classroom/themes/img_code.jpg"
//             alt="About Us"
//             className="w-full md:w-1/2 rounded-2xl shadow-lg"
//           />
//           <motion.div
//             whileHover={{ scale: 1.02 }}
//             className="bg-[#091024] p-8 rounded-2xl border border-[#E1C3FF] w-full md:w-1/2 transition-shadow hover:shadow-purple-500/40"
//           >
//             <h2 className="text-4xl font-semibold text-[#E1C3FF] mb-4">About Us</h2>
//             <p className="text-lg leading-relaxed">
//               EduConnect is a next-gen student-teacher collaboration platform designed to bridge the gap between ambitious students and experienced mentors. With intelligent AI suggestions and skill-based matching, we simplify your journey from project ideation to successful execution.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Contact Us Section with Image Left */}
//       <section className="py-20 px-6 bg-[#0d1126]">
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
//           <motion.img
//             whileHover={{ scale: 1.02 }}
//             src="https://www.gstatic.com/classroom/themes/img_graduation.jpg"
//             alt="Contact Us"
//             className="w-full md:w-1/2 rounded-2xl shadow-lg"
//           />
//           <motion.div
//             whileHover={{ scale: 1.02 }}
//             className="bg-[#091024] p-8 rounded-2xl border border-[#9B30FF] w-full md:w-1/2 text-center shadow-md hover:shadow-purple-400"
//           >
//             <h2 className="text-4xl text-[#E1C3FF] mb-6">Contact Us</h2>
//             <p className="text-white mb-4 text-lg">Have questions or feedback? Reach out to us!</p>
//             <p className="text-[#9B30FF] text-lg font-medium">
//               Email: <a href="mailto:support@educonnect.com">support@educonnect.com</a>
//             </p>
//           </motion.div>
//         </div>
//       </section>

//     </div>
//   );
// };

// export default Home;


import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  MessageSquareText,
  ShieldCheck,
  BarChart2,
  Users,
  Zap,
} from "lucide-react";

const features = [
  { icon: <ShieldCheck className="w-6 h-6 text-[#9B30FF]" />, text: "Secure Sign Up & Login" },
  { icon: <MessageSquareText className="w-6 h-6 text-[#9B30FF]" />, text: "AI Chatbot for Queries" },
  { icon: <Zap className="w-6 h-6 text-[#9B30FF]" />, text: "Teacher Prioritization System" },
  { icon: <BarChart2 className="w-6 h-6 text-[#9B30FF]" />, text: "Dynamic Ranking Visualization" },
  { icon: <Users className="w-6 h-6 text-[#9B30FF]" />, text: "Student-Teacher Selection" },
  { icon: <Sparkles className="w-6 h-6 text-[#9B30FF]" />, text: "Domain & Skill Matching" },
];

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    // Check if user is logged in by looking for tokens in localStorage
    const checkAuthStatus = () => {
      const teacherId = localStorage.getItem("teacherId");
      const studentId = localStorage.getItem("studentId");
      
      if (teacherId) {
        setIsLoggedIn(true);
        setUserType("teacher");
      } else if (studentId) {
        setIsLoggedIn(true);
        setUserType("student");
      } else {
        setIsLoggedIn(false);
        setUserType(null);
      }
    };

    checkAuthStatus();

    // Optional: Listen for storage changes if needed
    const handleStorageChange = () => checkAuthStatus();
    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleDashboardNavigation = () => {
    if (userType === "teacher") {
      navigate("/TeacherDashboard");
    } else if (userType === "student") {
      navigate("/StudentDashboard");
    }
  };

  return (
    <div className="bg-[#091024] min-h-screen text-white font-sans scroll-smooth">
      {/* Hero Section */}
      <section className="text-center py-24 px-6 bg-gradient-to-b from-[#0d1126] via-[#091024] to-[#0d1126]">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-[#E1C3FF] mb-4 drop-shadow-md"
        >
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E1C3FF] to-[#9B30FF]">EduConnect</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-[#9B30FF] max-w-xl mx-auto"
        >
          AI-powered collaboration platform connecting students and teachers for project guidance, mentorship, and innovation.
        </motion.p>
        
        <div className="mt-10">
          {!isLoggedIn ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-[#6D0BCF] to-[#9B30FF] text-white rounded-full shadow-lg hover:shadow-purple-400 transition duration-300"
              onClick={() => navigate("/signup")}
            >
              Get Started
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-[#3D306F] to-[#9B30FF] text-white rounded-full shadow-lg hover:shadow-purple-400 transition duration-300"
              onClick={handleDashboardNavigation}
            >
              Go to {userType === "teacher" ? "Teacher" : "Student"} Dashboard
            </motion.button>
          )}
        </div>
      </section>

      {/* Features Section with Image Left */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <motion.img
            whileHover={{ scale: 1.02 }}
            src="https://www.gstatic.com/classroom/themes/img_reachout.jpg"
            alt="Features Illustration"
            className="w-full md:w-1/2 rounded-2xl shadow-lg"
          />
          <div className="grid sm:grid-cols-2 gap-6 w-full md:w-1/2">
            {features.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className={`p-5 rounded-xl border shadow-md hover:shadow-purple-400 ${
                  index % 2 === 0 ? "bg-[#0d1126] border-[#E1C3FF]" : "bg-[#091024] border-[#9B30FF]"
                }`}
              >
                <div className="flex items-center gap-4">
                  {item.icon}
                  <p className="text-[#E1C3FF] text-lg">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section with Image Right */}
      <section className="py-20 px-6 bg-[#0d1126]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-12">
          <motion.img
            whileHover={{ scale: 1.02 }}
            src="https://www.gstatic.com/classroom/themes/img_code.jpg"
            alt="About Us"
            className="w-full md:w-1/2 rounded-2xl shadow-lg"
          />
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#091024] p-8 rounded-2xl border border-[#E1C3FF] w-full md:w-1/2 transition-shadow hover:shadow-purple-500/40"
          >
            <h2 className="text-4xl font-semibold text-[#E1C3FF] mb-4">About Us</h2>
            <p className="text-lg leading-relaxed">
              EduConnect is a next-gen student-teacher collaboration platform designed to bridge the gap between ambitious students and experienced mentors. With intelligent AI suggestions and skill-based matching, we simplify your journey from project ideation to successful execution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Us Section with Image Left */}
      <section className="py-20 px-6 bg-[#0d1126]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <motion.img
            whileHover={{ scale: 1.02 }}
            src="https://www.gstatic.com/classroom/themes/img_graduation.jpg"
            alt="Contact Us"
            className="w-full md:w-1/2 rounded-2xl shadow-lg"
          />
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#091024] p-8 rounded-2xl border border-[#9B30FF] w-full md:w-1/2 text-center shadow-md hover:shadow-purple-400"
          >
            <h2 className="text-4xl text-[#E1C3FF] mb-6">Contact Us</h2>
            <p className="text-white mb-4 text-lg">Have questions or feedback? Reach out to us!</p>
            <p className="text-[#9B30FF] text-lg font-medium">
              Email: <a href="mailto:support@educonnect.com" className="hover:underline">support@educonnect.com</a>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;