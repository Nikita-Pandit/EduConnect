// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { ChevronRight } from "lucide-react";
// import heroImage from "../assets/hero.png";

// const domainOptions = [
//   {
//     value: "Web Development",
//     label: "Web Development",
//     img: "https://img.icons8.com/color/96/web-design.png",
//   },
//   {
//     value: "Data Science",
//     label: "Data Science",
//     img: "https://img.icons8.com/color/96/data-configuration.png",
//   },
//   {
//     value: "Machine Learning",
//     label: "Machine Learning",
//     img: "https://img.icons8.com/color/96/artificial-intelligence.png",
//   },
//   {
//     value: "App Development",
//     label: "App Development",
//     img: "https://img.icons8.com/color/96/android-os.png",
//   },
//   {
//     value: "UI/UX Design",
//     label: "UI/UX Design",
//     img: "https://img.icons8.com/color/96/design.png",
//   },
//   {
//     value: "Cybersecurity",
//     label: "Cybersecurity",
//     img: "https://img.icons8.com/color/96/privacy.png",
//   },
//   {
//     value: "Cloud Computing",
//     label: "Cloud Computing",
//     img: "https://img.icons8.com/color/96/cloud.png",
//   },
//   {
//     value: "Blockchain",
//     label: "Blockchain",
//     img: "https://img.icons8.com/color/96/blockchain-technology.png",
//   },
//   {
//     value: "Game Development",
//     label: "Game Development",
//     img: "https://img.icons8.com/color/96/controller.png",
//   },
//   {
//     value: "DevOps",
//     label: "DevOps",
//     img: "https://img.icons8.com/color/96/devops.png",
//   },
//   {
//     value: "Embedded Systems",
//     label: "Embedded Systems",
//     img: "https://img.icons8.com/color/96/motherboard.png",
//   },
//   {
//     value: "Internet of Things",
//     label: "Internet of Things",
//     img: "https://img.icons8.com/color/96/internet-of-things.png",
//   },
//   {
//     value: "Artificial Intelligence",
//     label: "Artificial Intelligence",
//     img: "https://img.icons8.com/color/96/artificial-intelligence.png",
//   },
//   {
//     value: "Big Data",
//     label: "Big Data",
//     img: "https://img.icons8.com/color/96/big-data.png",
//   },
//   {
//     value: "Quantum Computing",
//     label: "Quantum Computing",
//     img: "https://img.icons8.com/color/96/quantum-computing.png",
//   },
//   {
//     value: "AR/VR",
//     label: "AR/VR",
//     img: "https://img.icons8.com/color/96/augmented-reality.png",
//   },
//   {
//     value: "Bioinformatics",
//     label: "Bioinformatics",
//     img: "https://img.icons8.com/color/96/dna.png",
//   },
//   {
//     value: "Networking",
//     label: "Networking",
//     img: "https://img.icons8.com/color/96/network.png",
//   },
//   {
//     value: "Database Administration",
//     label: "Database Administration",
//     img: "https://img.icons8.com/color/96/database.png",
//   },
//   {
//     value: "Software Testing",
//     label: "Software Testing",
//     img: "https://img.icons8.com/color/96/bug.png",
//   },
//   {
//     value: "Game AI",
//     label: "Game AI",
//     img: "https://img.icons8.com/color/96/robot.png",
//   },
//   {
//     value: "Robotics",
//     label: "Robotics",
//     img: "https://img.icons8.com/color/96/robot-2.png",
//   },
//   {
//     value: "Full Stack Development",
//     label: "Full Stack Development",
//     img: "https://img.icons8.com/color/96/source-code.png",
//   },
//   {
//     value: "Microservices Architecture",
//     label: "Microservices Architecture",
//     img: "https://img.icons8.com/color/96/microservices.png",
//   },
//   {
//     value: "IT Support",
//     label: "IT Support",
//     img: "https://img.icons8.com/color/96/technical-support.png",
//   },
//   {
//     value: "E-commerce Development",
//     label: "E-commerce Development",
//     img: "https://img.icons8.com/color/96/shopping-cart.png",
//   },
//   {
//     value: "Cloud Security",
//     label: "Cloud Security",
//     img: "https://img.icons8.com/color/96/cloud-security.png",
//   },
//   {
//     value: "Penetration Testing",
//     label: "Penetration Testing",
//     img: "https://img.icons8.com/color/96/hacker.png",
//   },
//   {
//     value: "Cryptography",
//     label: "Cryptography",
//     img: "https://img.icons8.com/color/96/lock.png",
//   },
//   {
//     value: "Software Architecture",
//     label: "Software Architecture",
//     img: "https://img.icons8.com/color/96/software-architecture.png",
//   },
// ];

// const Home = () => {
//   const navigate = useNavigate();
//   const scrollRef = React.useRef(null);
 
//   // Check authentication status from localStorage (aligned with your login system)
//   const isLoggedIn = localStorage.getItem("studentId") || localStorage.getItem("teacherId");
//   const userRole = localStorage.getItem("studentId") ? "student" : "teacher";

//   const handleButtonClick = () => {
//     if (isLoggedIn) {
//       // User is logged in - navigate to appropriate dashboard
//       // This matches your login component's navigation logic
//       if (userRole === "student") {
//         navigate("/StudentDashboard", { 
//           state: { id: localStorage.getItem("studentId") } 
//         });
//       } else {
//         navigate("/TeacherDashboard", { 
//           state: { id: localStorage.getItem("teacherId") } 
//         });
//       }
//     } else {
//       // User is not logged in - go to signup
//       navigate("/SignUp");
//     }
//   };

//   const scrollLeft = () =>
//     scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
//   const scrollRight = () =>
//     scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });

//   return (
//     <div className="bg-[#0B0F2C] text-white min-h-screen overflow-x-hidden">
//       {/* EDUCONNECT SECTION */}
//       <div className="relative w-full h-[80vh] flex items-center justify-center px-6 py-10 overflow-hidden">
//         <svg
//           className="absolute top-0 left-0 h-full w-[50vw] z-0 opacity-30"
//           viewBox="0 0 500 1000"
//           preserveAspectRatio="none"
//         >
//           <path
//             d="M 0 0 A 500 500 0 0 1 0 1000"
//             fill="none"
//             stroke="#A855F7"
//             strokeWidth="2"
//             strokeDasharray="12, 14"
//           />
//           <path
//             d="M 40 0 A 460 460 0 0 1 40 1000"
//             fill="none"
//             stroke="#A855F7"
//             strokeWidth="2"
//             strokeDasharray="12, 14"
//           />
//           <path
//             d="M 80 0 A 420 420 0 0 1 80 1000"
//             fill="none"
//             stroke="#A855F7"
//             strokeWidth="2"
//             strokeDasharray="12, 14"
//           />
//         </svg>

//         <div className="relative z-10 w-full max-w-4xl text-center">
//           <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6 drop-shadow-md">
//             EDUCONNECT —{" "}
//             <span className="bg-gradient-to-r from-purple-500 to-indigo-400 bg-clip-text text-transparent">
//               CONNECTING MINDS, SHAPING FUTURES!
//             </span>
//           </h1>
//           <p className="text-gray-300 text-lg sm:text-xl mb-10">
//           AI-Powered Student-Teacher Collaboration Platform 
//           </p>

//            <div className="flex justify-center">
//             <button
//               onClick={handleButtonClick}
//               className="px-10 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition duration-300 text-lg"
//             >
//               {isLoggedIn ? "Go to Dashboard" : "Get Started"}
//             </button>
//           </div>
//         </div>
//         {/* <div className="hidden lg:flex items-center justify-center flex-1 z-10">
//           <div className="relative w-full h-full max-w-[503px] max-h-[698px]">
//             <img 
//               src={heroImage} // Replace with your actual image path
//               alt="Rate your Experience"
//               className="w-full h-full object-contain"
//             />
//             <div className="absolute inset-0 bg-gradient-to-l from-[#0B0F2C] to-transparent w-1/3"></div>
//           </div>
//         </div> */}
//         <div className="hidden lg:flex items-center justify-center flex-1 z-10">
//   <div className="relative w-[260px] h-[360px] flex items-center justify-center">

//     {/* Oval border only */}
//     <div className="absolute inset-0 rounded-[45%/40%] border-2 border-[#A855F7] z-10" />

//     {/* Inner purple glow behind the image */}
//     <div className="absolute w-[200px] h-[300px] bg-[#A855F7] opacity-20 blur-2xl rounded-[45%/40%] z-0" />

//     {/* Top floating circle */}
//     <div className="absolute top-6 right-6 w-6 h-6 bg-[#A855F7] opacity-40 rounded-full z-20" />

//     {/* Profile image */}
//     <img
//       src={heroImage}
//       alt="Student"
//       className="relative w-[200px] h-[300px] object-cover z-30"
//       style={{ borderRadius: '45% / 40%' }}
//     />

//     {/* Smaller Rating badge */}
//     <div className="absolute bottom-4 right-[-30px] flex items-center bg-[#A855F7] bg-opacity-60 text-white text-[10px] px-2 py-[2px] rounded-full shadow-md z-40">
//       <span className="mr-1 whitespace-nowrap">⭐ Rate your Experience</span>
//       <input
//         type="range"
//         min="1"
//         max="5"
//         defaultValue="3"
//         className="accent-pink-300 w-12 h-[3px] mx-1"
//       />
//       <span className="text-base">😊</span>
//     </div>
//   </div>
// </div>

//       {/* </div> */}
//       </div>

//       {/* DOMAIN SECTION */}
//       <div className="relative w-full px-6 py-16 bg-[#10142F] border-t border-purple-600">
//         <h2 className="text-center text-3xl font-bold mb-10">
//           <span className="bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
//             OUR DOMAINS
//           </span>
//         </h2>

//         <div className="relative">
//           <button
//             onClick={scrollLeft}
//             className="absolute top-1/2 left-0 z-20 transform -translate-y-1/2 bg-purple-600 text-white rounded-full p-2 hover:bg-purple-700 shadow-lg"
//           >
//             <ChevronRight className="rotate-180" size={24} />
//           </button>

//           <div
//             ref={scrollRef}
//             className="overflow-x-auto no-scrollbar px-6"
//             style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//           >
//             <div className="grid grid-flow-col grid-rows-2 auto-cols-max gap-6 w-max min-h-[320px] pb-2">
//               {domainOptions.map((domain, index) => (
//                 <div
//                   key={index}
//                   className="w-[270px] h-[140px] rounded-xl border border-purple-500 bg-[#0F1331] px-6 py-4 flex flex-col justify-between shadow-md hover:shadow-purple-500 hover:scale-105 transition duration-300"
//                 >
//                   <div className="text-white font-bold text-lg mb-2">
//                     {domain.label}
//                   </div>
//                   <img
//                     src={domain.img}
//                     alt={domain.label}
//                     className="w-16 h-16 object-contain self-end"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           <button
//             onClick={scrollRight}
//             className="absolute top-1/2 right-0 z-20 transform -translate-y-1/2 bg-purple-600 text-white rounded-full p-2 hover:bg-purple-700 shadow-lg"
//           >
//             <ChevronRight size={24} />
//           </button>
//         </div>
//       </div>

//       {/* FEATURE SECTION */}
//       <div className="w-full px-6 py-16 bg-[#0B0F2C] border-t border-purple-600">
//         <h2 className="text-center text-3xl font-bold mb-10">
//           <span className="bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
//             EDUCONNECT FEATURES
//           </span>
//         </h2>

//         <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 max-w-6xl mx-auto">
//           {/* Feature 1 */}
//           <div className="rounded-xl border border-purple-500 bg-[#0F1331] px-6 py-6 shadow-md hover:shadow-purple-500 transform transition duration-300 hover:scale-105">
//             <div className="text-xl font-bold text-white mb-2">
//               🤖 AI Chatbot
//             </div>
//             <p className="text-gray-300">
//               Smart chatbot answers queries about students, teachers, and
//               general information.
//             </p>
//           </div>

//           {/* Feature 2 */}
//           <div className="rounded-xl border border-purple-500 bg-[#0F1331] px-6 py-6 shadow-md hover:shadow-purple-500 transform transition duration-300 hover:scale-105">
//             <div className="text-xl font-bold text-white mb-2">
//               🎯 Prioritization
//             </div>
//             <p className="text-gray-300">
//               4th-year students can prioritize teachers for project mentorship
//               (1st, 2nd, 3rd).
//             </p>
//           </div>

//           {/* Feature 3 */}
//           <div className="rounded-xl border border-purple-500 bg-[#0F1331] px-6 py-6 shadow-md hover:shadow-purple-500 transform transition duration-300 hover:scale-105">
//             <div className="text-xl font-bold text-white mb-2">
//               🧑‍🏫 Teacher Selection
//             </div>
//             <p className="text-gray-300">
//               Teachers can view student profiles and select students based on
//               their skills and CGPA.
//             </p>
//           </div>

//           {/* Feature 4 */}
//           <div className="rounded-xl border border-purple-500 bg-[#0F1331] px-6 py-6 shadow-md hover:shadow-purple-500 transform transition duration-300 hover:scale-105">
//             <div className="text-xl font-bold text-white mb-2">
//               👥 Student Collaboration
//             </div>
//             <p className="text-gray-300">
//               Students can view each other's profiles and collaborate for group
//               projects via shared domains or skills.
//             </p>
//           </div>

//           {/* Feature 5 */}
//           <div className="rounded-xl border border-purple-500 bg-[#0F1331] px-6 py-6 shadow-md hover:shadow-purple-500 transform transition duration-300 hover:scale-105">
//             <div className="text-xl font-bold text-white mb-2">
//               📊 Student Dashboard
//             </div>
//             <p className="text-gray-300">
//               Students can view the teachers they’ve prioritized and which
//               teacher has selected them.
//             </p>
//           </div>

//           {/* Feature 6 */}
//           <div className="rounded-xl border border-purple-500 bg-[#0F1331] px-6 py-6 shadow-md hover:shadow-purple-500 transform transition duration-300 hover:scale-105">
//             <div className="text-xl font-bold text-white mb-2">
//               📋 Teacher Dashboard
//             </div>
//             <p className="text-gray-300">
//               Teachers can view priority stats, selected students, and manage
//               their mentorships.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Hide Scrollbar Style */}
//       <style>{`
//         .no-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//         .no-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Home;















import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const domainOptions = [
  {
    value: "Web Development",
    label: "Web Development",
    img: "https://img.icons8.com/color/96/web-design.png",
  },
  {
    value: "Data Science",
    label: "Data Science",
    img: "https://img.icons8.com/color/96/data-configuration.png",
  },
  {
    value: "Machine Learning",
    label: "Machine Learning",
    img: "https://img.icons8.com/color/96/artificial-intelligence.png",
  },
  {
    value: "App Development",
    label: "App Development",
    img: "https://img.icons8.com/color/96/android-os.png",
  },
  {
    value: "UI/UX Design",
    label: "UI/UX Design",
    img: "https://img.icons8.com/color/96/design.png",
  },
  {
    value: "Cybersecurity",
    label: "Cybersecurity",
    img: "https://img.icons8.com/color/96/privacy.png",
  },
  {
    value: "Cloud Computing",
    label: "Cloud Computing",
    img: "https://img.icons8.com/color/96/cloud.png",
  },
  {
    value: "Blockchain",
    label: "Blockchain",
    img: "https://img.icons8.com/color/96/blockchain-technology.png",
  },
  {
    value: "Game Development",
    label: "Game Development",
    img: "https://img.icons8.com/color/96/controller.png",
  },
  {
    value: "DevOps",
    label: "DevOps",
    img: "https://img.icons8.com/color/96/devops.png",
  },
  // ... (rest of the domain options remain the same)
];

const Home = () => {
  const navigate = useNavigate();
  const scrollRef = React.useRef(null);
 
  const isLoggedIn = localStorage.getItem("studentId") || localStorage.getItem("teacherId");
  const userRole = localStorage.getItem("studentId") ? "student" : "teacher";

  const handleButtonClick = () => {
    if (isLoggedIn) {
      if (userRole === "student") {
        navigate("/StudentDashboard", { 
          state: { id: localStorage.getItem("studentId") } 
        });
      } else {
        navigate("/TeacherDashboard", { 
          state: { id: localStorage.getItem("teacherId") } 
        });
      }
    } else {
      navigate("/SignUp");
    }
  };

  const scrollLeft = () =>
    scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
  const scrollRight = () =>
    scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });

  return (
    <div className="bg-[#0B0F2C] text-white min-h-screen overflow-x-hidden">
      {/* EDUCONNECT SECTION */}
      <div className="relative w-full h-[80vh] flex items-center justify-center px-6 py-10 overflow-hidden">
        <svg
          className="absolute top-0 left-0 h-full w-[50vw] z-0 opacity-30"
          viewBox="0 0 500 1000"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 0 A 500 500 0 0 1 0 1000"
            fill="none"
            stroke="#A855F7"
            strokeWidth="2"
            strokeDasharray="12, 14"
          />
          <path
            d="M 40 0 A 460 460 0 0 1 40 1000"
            fill="none"
            stroke="#A855F7"
            strokeWidth="2"
            strokeDasharray="12, 14"
          />
          <path
            d="M 80 0 A 420 420 0 0 1 80 1000"
            fill="none"
            stroke="#A855F7"
            strokeWidth="2"
            strokeDasharray="12, 14"
          />
        </svg>

        <div className="relative z-10 w-full max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6 drop-shadow-md">
            EDUCONNECT —{" "}
            <span className="bg-gradient-to-r from-purple-500 to-indigo-400 bg-clip-text text-transparent">
              CONNECTING MINDS, SHAPING FUTURES!
            </span>
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl mb-10">
            AI-Powered Student-Teacher Collaboration Platform 
          </p>

          <div className="flex justify-center">
            <button
              onClick={handleButtonClick}
              className="px-10 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition duration-300 text-lg"
            >
              {isLoggedIn ? "Go to Dashboard" : "Get Started"}
            </button>
          </div>
        </div>
      </div>

      {/* DOMAIN SECTION */}
      <div className="relative w-full px-6 py-16 bg-[#10142F] border-t border-purple-600">
        <h2 className="text-center text-3xl font-bold mb-10">
          <span className="bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
            OUR DOMAINS
          </span>
        </h2>

        <div className="relative">
          <button
            onClick={scrollLeft}
            className="absolute top-1/2 left-0 z-20 transform -translate-y-1/2 bg-purple-600 text-white rounded-full p-2 hover:bg-purple-700 shadow-lg"
          >
            <ChevronRight className="rotate-180" size={24} />
          </button>

          <div
            ref={scrollRef}
            className="overflow-x-auto no-scrollbar px-6"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="grid grid-flow-col grid-rows-2 auto-cols-max gap-6 w-max min-h-[320px] pb-2">
              {domainOptions.map((domain, index) => (
                <div
                  key={index}
                  className="w-[270px] h-[140px] rounded-xl border border-purple-500 bg-[#0F1331] px-6 py-4 flex flex-col justify-between shadow-md hover:shadow-purple-500 hover:scale-105 transition duration-300"
                >
                  <div className="text-white font-bold text-lg mb-2">
                    {domain.label}
                  </div>
                  <img
                    src={domain.img}
                    alt={domain.label}
                    className="w-16 h-16 object-contain self-end"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollRight}
            className="absolute top-1/2 right-0 z-20 transform -translate-y-1/2 bg-purple-600 text-white rounded-full p-2 hover:bg-purple-700 shadow-lg"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* FEATURE SECTION */}
      <div className="w-full px-6 py-16 bg-[#0B0F2C] border-t border-purple-600">
        <h2 className="text-center text-3xl font-bold mb-10">
          <span className="bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
            EDUCONNECT FEATURES
          </span>
        </h2>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="rounded-xl border border-purple-500 bg-[#0F1331] px-6 py-6 shadow-md hover:shadow-purple-500 transform transition duration-300 hover:scale-105">
            <div className="text-xl font-bold text-white mb-2">
              🤖 AI Chatbot
            </div>
            <p className="text-gray-300">
              Smart chatbot answers queries about students, teachers, and
              general information.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="rounded-xl border border-purple-500 bg-[#0F1331] px-6 py-6 shadow-md hover:shadow-purple-500 transform transition duration-300 hover:scale-105">
            <div className="text-xl font-bold text-white mb-2">
              🎯 Prioritization
            </div>
            <p className="text-gray-300">
              4th-year students can prioritize teachers for project mentorship
              (1st, 2nd, 3rd).
            </p>
          </div>

          {/* Feature 3 */}
          <div className="rounded-xl border border-purple-500 bg-[#0F1331] px-6 py-6 shadow-md hover:shadow-purple-500 transform transition duration-300 hover:scale-105">
            <div className="text-xl font-bold text-white mb-2">
              🧑‍🏫 Teacher Selection
            </div>
            <p className="text-gray-300">
              Teachers can view student profiles and select students based on
              their skills and CGPA.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="rounded-xl border border-purple-500 bg-[#0F1331] px-6 py-6 shadow-md hover:shadow-purple-500 transform transition duration-300 hover:scale-105">
            <div className="text-xl font-bold text-white mb-2">
              👥 Student Collaboration
            </div>
            <p className="text-gray-300">
              Students can view each other's profiles and collaborate for group
              projects via shared domains or skills.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="rounded-xl border border-purple-500 bg-[#0F1331] px-6 py-6 shadow-md hover:shadow-purple-500 transform transition duration-300 hover:scale-105">
            <div className="text-xl font-bold text-white mb-2">
              📊 Student Dashboard
            </div>
            <p className="text-gray-300">
              Students can view the teachers they've prioritized and which
              teacher has selected them.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="rounded-xl border border-purple-500 bg-[#0F1331] px-6 py-6 shadow-md hover:shadow-purple-500 transform transition duration-300 hover:scale-105">
            <div className="text-xl font-bold text-white mb-2">
              📋 Teacher Dashboard
            </div>
            <p className="text-gray-300">
              Teachers can view priority stats, selected students, and manage
              their mentorships.
            </p>
          </div>
        </div>
      </div>

      {/* Hide Scrollbar Style */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Home;