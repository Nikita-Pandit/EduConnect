
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const StudentHeader = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const navigate = useNavigate();
//   const userId =
//     localStorage.getItem("studentId") || localStorage.getItem("teacherId");
//   const [image, setImage] = useState("/images/default_image.jpg");
//   const [flag, setFlag] = useState(false);

//   const handleLogout = async (e) => {
//     e.preventDefault();
//     try {
//       if (localStorage.getItem("studentId")) {
//         localStorage.removeItem("studentId");
//       } else {
//         localStorage.removeItem("teacherId");
//       }
//       localStorage.removeItem("token");
//       navigate("/LogIn");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         let response;
//         if (localStorage.getItem("teacherId")) {
//           response = await axios.get(
//             `http://localhost:3002/api/teacherProfile/${userId}`
//           );
//         } else {
//           response = await axios.get(
//             `http://localhost:3002/api/Profile/${userId}`
//           );
//         }
//         if (response.data.moreInfo.image) {
//           setImage(`http://localhost:3002${response.data.moreInfo.image}`);
//           setFlag(true);
//         }
//       } catch (error) {
//         console.error("Failed to fetch profile:", error);
//       }
//     };

//     if (userId) {
//       fetchProfile();
//     }

//     const handleProfileUpdate = () => {
//       fetchProfile();
//     };

//     window.addEventListener("profileUpdated", handleProfileUpdate);

//     return () => {
//       window.removeEventListener("profileUpdated", handleProfileUpdate);
//     };
//   }, [userId]);

//   return (
//     <div className="mb-3">
//       <div className="nav">
//         <div>ABC</div>
//         <div>
//           <ul className="flex gap-4 items-end">
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             {userId ? (
//               <>
//                 {localStorage.getItem("studentId") ? (
//                   <>
//                     <li>
//                       <Link to="/Profile">Profile</Link>
//                     </li>
//                     <li>
//                       <Link to="/StudentDashboard">Dashboard</Link>
//                     </li>
//                     <li>
//                       <Link to="/Students">Students</Link>
//                     </li>
//                     <li>
//                       <Link to="/Supervisors">Supervisors</Link>
//                     </li>
//                   </>
//                 ) : (
//                   <>
//                     <li>
//                       <Link to="/TeacherProfile">Profile</Link>
//                     </li>
//                     <li>
//                       <Link to="/TeacherDashboard">Dashboard</Link>
//                     </li>
//                   </>
//                 )}
//               </>
//             ) : (
//               <>
//                 <li
//                   className="text-gray-500 cursor-not-allowed"
//                   title="Login required"
//                 >
//                   Profile
//                 </li>
//                 <li
//                   className="text-gray-500 cursor-not-allowed"
//                   title="Login required"
//                 >
//                   Dashboard
//                 </li>
//                 <li
//                   className="text-gray-500 cursor-not-allowed"
//                   title="Login required"
//                 >
//                   Students
//                 </li>
//                 <li
//                   className="text-gray-500 cursor-not-allowed"
//                   title="Login required"
//                 >
//                   Supervisors
//                 </li>
//               </>
//             )}
//             {userId ? (
//               <div className="relative">
//                 <img
//                   className="w-10 h-10 rounded-full object-contain"
//                   src={image}
//                   onClick={() => setIsDropdownOpen((prev) => !prev)}
//                   alt="Profile"
//                 />
//                 {isDropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg">
//                     <ul>
//                       <li
//                         className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-red-500"
//                         onClick={handleLogout}
//                       >
//                         Log out
//                       </li>
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <li>
//                 <Link to="/LogIn">LogIn</Link>
//               </li>
//             )}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentHeader;




import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AcademicCapIcon } from "@heroicons/react/24/solid"; // Import the education icon


const StudentHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const userId =
    localStorage.getItem("studentId") || localStorage.getItem("teacherId");
  const [image, setImage] = useState("/images/default_image.jpg");
  const [flag, setFlag] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      if (localStorage.getItem("studentId")) {
        localStorage.removeItem("studentId");
      } else {
        localStorage.removeItem("teacherId");
      }
      localStorage.removeItem("token");
      navigate("/LogIn");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let response;
        if (localStorage.getItem("teacherId")) {
          response = await axios.get(
            `http://localhost:3002/api/teacherProfile/${userId}`
          );
        } else {
          response = await axios.get(
            `http://localhost:3002/api/Profile/${userId}`
          );
        }
        if (response.data.moreInfo.image) {
          setImage(`http://localhost:3002${response.data.moreInfo.image}`);
          setFlag(true);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    if (userId) {
      fetchProfile();
    }

    const handleProfileUpdate = () => {
      fetchProfile();
    };

    window.addEventListener("profileUpdated", handleProfileUpdate);

    return () => {
      window.removeEventListener("profileUpdated", handleProfileUpdate);
    };
  }, [userId]);

  return (
    // <header className="fixed w-full top-0 left-0 bg-[#0d1126] shadow-md border-b border-[#9B30FF] z-50">
    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //     <div className="flex justify-between items-center h-16">
    //       {/* Logo */}
    //       <div className="flex-shrink-0 flex items-center">
    //         <Link to="/" className="text-2xl font-bold text-[#E1C3FF] hover:text-[#9B30FF] transition-colors">
    //           ABC Portal
    //         </Link>
    //       </div>
    <header className="fixed w-full top-0 left-0 bg-[#0d1126] shadow-md border-b border-[#9B30FF] z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        {/* Updated Logo with Education Icon */}
        <div className="flex-shrink-0 flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <AcademicCapIcon className="h-8 w-8 text-[#9B30FF]" />
            <span className="text-2xl font-bold text-[#E1C3FF] hover:text-[#9B30FF] transition-colors">
              EduConnect
            </span>
          </Link>
        </div>
          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className="text-[#E1C3FF] hover:text-[#9B30FF] px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </Link>

            {userId ? (
              <>
                {localStorage.getItem("studentId") ? (
                  <>
                    <Link 
                      to="/Profile" 
                      className="text-[#E1C3FF] hover:text-[#9B30FF] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Profile
                    </Link>
                    <Link 
                      to="/StudentDashboard" 
                      className="text-[#E1C3FF] hover:text-[#9B30FF] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/Students" 
                      className="text-[#E1C3FF] hover:text-[#9B30FF] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Students
                    </Link>
                    <Link 
                      to="/Supervisors" 
                      className="text-[#E1C3FF] hover:text-[#9B30FF] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Supervisors
                    </Link>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/TeacherProfile" 
                      className="text-[#E1C3FF] hover:text-[#9B30FF] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Profile
                    </Link>
                    <Link 
                      to="/TeacherDashboard" 
                      className="text-[#E1C3FF] hover:text-[#9B30FF] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Dashboard
                    </Link>
                  </>
                )}
              </>
            ) : (
              <>
                <span 
                  className="text-gray-500 px-3 py-2 rounded-md text-sm font-medium cursor-not-allowed"
                  title="Login required"
                >
                  Profile
                </span>
                <span 
                  className="text-gray-500 px-3 py-2 rounded-md text-sm font-medium cursor-not-allowed"
                  title="Login required"
                >
                  Dashboard
                </span>
                <span 
                  className="text-gray-500 px-3 py-2 rounded-md text-sm font-medium cursor-not-allowed"
                  title="Login required"
                >
                  Students
                </span>
                <span 
                  className="text-gray-500 px-3 py-2 rounded-md text-sm font-medium cursor-not-allowed"
                  title="Login required"
                >
                  Supervisors
                </span>
              </>
            )}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center">
            {userId ? (
              <div className="ml-4 relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#9B30FF] hover:border-[#E1C3FF] transition-colors"
                    src={image}
                    alt="Profile"
                  />
                  <svg
                    className={`w-4 h-4 text-[#E1C3FF] transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#0d1126] ring-1 ring-[#9B30FF] focus:outline-none z-50">
                    <div className="py-1">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#9B30FF]/20 hover:text-red-300 transition-colors"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/LogIn"
                className="ml-4 px-4 py-2 bg-[#6D0BCF] hover:bg-[#46008B] text-white rounded-md text-sm font-medium shadow-lg hover:shadow-[#9B30FF]/30 transition-all duration-300"
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default StudentHeader;