
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaLinkedin, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const StudentDashboard = () => {
//   const navigate = useNavigate();
//   const studentId = localStorage.getItem("studentId");
//   const [teacherRanks, setTeacherRanks] = useState([]);
//   const [studentInfo, setStudentInfo] = useState({});
//   const [profileCompletion, setProfileCompletion] = useState(0);
//   const [selectedTeachers, setSelectedTeachers] = useState([]);

//   useEffect(() => {
//     const fetchStudentData = async () => {
//       try {
//         const studentResponse = await axios.get(
//           `http://localhost:3002/api/student/${studentId}`
//         );
//         const moreInfoResponse = await axios.get(
//           `http://localhost:3002/api/Profile/${studentId}`
//         );

//         setStudentInfo({
//           ...studentResponse.data,
//           ...moreInfoResponse.data.moreInfo,
//         });
//         calculateProfileCompletion(moreInfoResponse.data.moreInfo);

//         const ranksResponse = await axios.get(
//           `http://localhost:3002/api/teacherRanks/${studentId}`
//         );
//         setTeacherRanks(ranksResponse.data);

//         const selectedResponse = await axios.get(
//           `http://localhost:3002/api/selectedTeachers/${studentId}`
//         );
//         setSelectedTeachers(selectedResponse.data);
//       } catch (error) {
//         console.error("Error fetching student data:", error);
//       }
//     };

//     fetchStudentData();
//   }, [studentId]);

//   const calculateProfileCompletion = (profile) => {
//     const fields = [
//       "Bio",
//       "github",
//       "linkedin",
//       "projects",
//       "skills",
//       "domain",
//       "location",
//       "branch",
//       "selectYear",
//       "rollNo",
//       "instagram",
//       "twitter",
//       "leetcode"
//     ];

//     const filledFields = fields.filter((field) => {
//       const value = profile[field];
//       return (
//         value !== undefined &&
//         value !== null &&
//         value !== "" &&
//         (!Array.isArray(value) || value.length > 0)
//       );
//     }).length;

//     const percentage = Math.round((filledFields / fields.length) * 100);
//     setProfileCompletion(percentage);
//   };

//   const handleSocialClick = (url) => {
//     if (url) {
//       window.open(url.startsWith("http") ? url : `https://${url}`, "_blank");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#091024] text-white p-6">
//       {/* Header Section */}
//       <div className="flex mt-10 justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-[#E1C3FF] animate-pop-in">Student Dashboard</h1>
//         <button
//           onClick={() => navigate("/profile")}
//           // className="bg-[#6D0BCF] hover:bg-[#46008B] px-6 py-3 rounded-lg transition border border-[#E1C3FF] flex items-center gap-2 shadow-lg hover:shadow-purple-500/20 animate-pop-in"
//           className="bg-gradient-to-r from-[#3D306F] to-[#9B30FF] hover:from-[#9B30FF] hover:to-[#3D306F] px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-[#3D306F] flex items-center gap-2"
//         >
//           <span>My Profile</span>
//           <FaExternalLinkAlt size={14} />
//         </button>
//       </div>

//       {/* Student Info Card */}
//       <div className="bg-[#0d1126] rounded-xl p-6 shadow-2xl mb-8 transform transition-all duration-500 hover:shadow-purple-500/30 animate-fade-in">
//         <div className="flex flex-col md:flex-row items-center gap-8">
//           <div className="relative group">
//             <img
//               src={
//                 studentInfo.image 
//                   ? `http://localhost:3002${studentInfo.image.startsWith('/') ? '' : '/'}${studentInfo.image}`
//                   : "/images/default_image.jpg"
//               }
//               alt="Profile" 
//               className="w-36 h-36 rounded-full object-cover border-4 border-[#9B30FF] group-hover:border-[#E1C3FF] transition-all duration-500 shadow-lg"
//             />
//             <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//               <span className="text-white font-medium">View Profile</span>
//             </div>
//           </div>

//           <div className="flex-1 space-y-2">
//             <h2 className="text-2xl font-bold text-[#E1C3FF] animate-pop-in">{studentInfo.name}</h2>
//             <p className="text-[#9B30FF] animate-fade-in">{studentInfo.rollNo}</p>
//             <p className="text-gray-300 animate-fade-in">{studentInfo.email}</p>
//             <p className="text-gray-300 animate-fade-in">
//               {studentInfo.selectYear} • {studentInfo.branch}
//             </p>

//             <div className="flex gap-4 mt-4">
//               <button
//                 onClick={() => handleSocialClick(studentInfo.linkedin)}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
//                   studentInfo.linkedin
//                     ? "bg-[#6D0BCF] hover:bg-[#46008B] border border-[#E1C3FF] shadow-md hover:shadow-purple-500/20"
//                     : "bg-gray-600 cursor-not-allowed"
//                 } transition-all duration-300 animate-pop-in`}
//                 disabled={!studentInfo.linkedin}
//               >
//                 <FaLinkedin size={18} />
//                 <span>LinkedIn</span>
//               </button>
//               <button
//                 onClick={() => handleSocialClick(studentInfo.github)}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
//                   studentInfo.github
//                     ? "bg-[#6D0BCF] hover:bg-[#46008B] border border-[#E1C3FF] shadow-md hover:shadow-purple-500/20"
//                     : "bg-gray-600 cursor-not-allowed"
//                 } transition-all duration-300 animate-pop-in`}
//                 disabled={!studentInfo.github}
//               >
//                 <FaGithub size={18} />
//                 <span>GitHub</span>
//               </button>
//             </div>
//           </div>

//           {/* Profile Completion */}
//           <div className="bg-[#0d1126] p-6 rounded-xl border border-[#9B30FF] shadow-lg hover:shadow-purple-500/20 transition-shadow duration-300 animate-fade-in">
//             <h3 className="font-semibold mb-4 text-center text-[#E1C3FF]">
//               Profile Completion
//             </h3>
//             <div className="w-32 h-32 relative">
//               <svg className="w-full h-full" viewBox="0 0 36 36">
//                 <path
//                   d="M18 2.0845
//                     a 15.9155 15.9155 0 0 1 0 31.831
//                     a 15.9155 15.9155 0 0 1 0 -31.831"
//                   fill="none"
//                   stroke="#1a1f3d"
//                   strokeWidth="3"
//                 />
//                 <path
//                   d="M18 2.0845
//                     a 15.9155 15.9155 0 0 1 0 31.831
//                     a 15.9155 15.9155 0 0 1 0 -31.831"
//                   fill="none"
//                   stroke="#9B30FF"
//                   strokeWidth="3"
//                   strokeDasharray={`${profileCompletion}, 100`}
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <span className="text-2xl font-bold text-[#9B30FF]">
//                   {profileCompletion}%
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Selection Status */}
//         {/* <div className="mt-8 bg-[#0d1126] p-5 rounded-xl border border-[#9B30FF] shadow-lg hover:shadow-purple-500/20 transition-all duration-300 animate-fade-in"> */}
//         <div className="mt-8 bg-[#0d1126] p-5 rounded-xl shadow-lg hover:shadow-purple-500/20 transition-all duration-300 animate-fade-in">
//           <h3 className="font-semibold text-xl mb-3 text-[#E1C3FF]">Selection Status</h3>
//           {selectedTeachers.length > 0 ? (
//             <div>
//               <p className="text-green-400 mb-3">
//                 You have been selected by {selectedTeachers.length} teacher(s):
//               </p>
//               <ul className="space-y-2">
//                 {selectedTeachers.map((teacher, index) => (
//                   <li 
//                     key={index} 
//                     // className="bg-[#1a1f3d] hover:bg-[#0d1126] p-3 rounded-lg transition-colors duration-300 flex items-center gap-3 border border-[#9B30FF] shadow-md hover:shadow-purple-500/10"
//                     className="bg-[#1a1f3d] hover:bg-[#0d1126] p-3 rounded-lg transition-colors duration-300 flex items-center gap-3  shadow-md hover:shadow-purple-500/10"
//                   >
//                     <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
//                     <span>{teacher.name}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ) : (
//             <div className="flex items-center gap-3">
//               <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse"></div>
//               <p className="text-yellow-400">
//                 You haven't been selected by any teachers yet.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Skills Section */}
//       {/* <div className="bg-[#0d1126] rounded-xl p-6 shadow-2xl border-2 border-[#E1C3FF] mb-8 transform transition-all duration-500 hover:shadow-purple-500/30 animate-fade-in"> */}
//       <div className="bg-[#0d1126] rounded-xl p-6 shadow-2xl mb-8 transform transition-all duration-500 hover:shadow-purple-500/30 animate-fade-in">
//         <h2 className="text-2xl font-bold mb-6 text-[#E1C3FF]">
//           Your Skills
//         </h2>
//         <div className="flex flex-wrap gap-3">
//           {studentInfo.skills?.length > 0 ? (
//             studentInfo.skills.map((skill, index) => (
//               <span
//                 key={index}
//                 className="bg-[#6D0BCF] hover:bg-[#46008B] px-5 py-2 rounded-full text-sm font-medium border border-[#E1C3FF] shadow-md hover:shadow-purple-500/20 transition-all duration-300 animate-pop-in"
//                 style={{ animationDelay: `${index * 0.1}s` }}
//               >
//                 {skill}
//               </span>
//             ))
//           ) : (
//             <div className="w-full py-4 text-center">
//               <p className="text-gray-400">
//                 No skills added yet. Update your profile to add skills.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Teacher Rankings Section */}
//       {/* <div className="bg-[#0d1126] rounded-xl p-6 shadow-2xl border-2 border-[#E1C3FF] transform transition-all duration-500 hover:shadow-purple-500/30 animate-fade-in"> */}
//       <div className="bg-[#0d1126] rounded-xl p-6 shadow-2xl transform transition-all duration-500 hover:shadow-purple-500/30 animate-fade-in">
//         <h2 className="text-2xl font-bold mb-6 text-[#E1C3FF]">
//           Teacher Priority
//         </h2>
//         {teacherRanks.length > 0 ? (
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="border-b-2 border-[#9B30FF]">
//                   <th className="text-left p-4 text-[#E1C3FF]">Teacher Name</th>
//                   <th className="text-left p-4 text-[#E1C3FF]">Priority</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {teacherRanks.map((teacher, index) => (
//                   <tr
//                     key={index}
//                     className="border-b border-[#1a1f3d] hover:bg-[#1a1f3d] transition-colors duration-300"
//                   >
//                     <td className="p-4 hover:text-[#E1C3FF] transition-colors duration-300 animate-fade-in">
//                       {teacher.name}
//                     </td>
//                     <td className="p-4 animate-fade-in">
//                       <span className="bg-[#6D0BCF] px-4 py-1.5 rounded-full text-sm font-medium inline-block min-w-[50px] text-center border border-[#E1C3FF] shadow-md">
//                         {teacher.rank}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <div className="w-full py-8 text-center">
//             <p className="text-gray-400">
//               No teachers have prioritized you yet.
//             </p>
//           </div>
//         )}
//       </div>     
//     </div>
//   );
// };

// export default StudentDashboard;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaLinkedin, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const studentId = localStorage.getItem("studentId");
  const [teacherRanks, setTeacherRanks] = useState([]);
  const [studentInfo, setStudentInfo] = useState({});
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3002';
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const studentResponse = await axios.get(
          `${backendUrl}/api/student/${studentId}`
        );
        const moreInfoResponse = await axios.get(
          `${backendUrl}/api/Profile/${studentId}`
        );

        setStudentInfo({
          ...studentResponse.data,
          ...moreInfoResponse.data.moreInfo,
        });
        calculateProfileCompletion(moreInfoResponse.data.moreInfo);

        const ranksResponse = await axios.get(
          `${backendUrl}/api/teacherRanks/${studentId}`
        );
        // SORT RANKS IN ASCENDING ORDER
        const sortedRanks = ranksResponse.data.sort((a, b) => a.rank - b.rank);
        setTeacherRanks(sortedRanks);

        const selectedResponse = await axios.get(
          `${backendUrl}/api/selectedTeachers/${studentId}`
        );
        setSelectedTeachers(selectedResponse.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, [studentId]);

  const calculateProfileCompletion = (profile) => {
    const fields = [
      "Bio",
      "github",
      "linkedin",
      "projects",
      "skills",
      "domain",
      "location",
      "branch",
      "selectYear",
      "rollNo",
      "instagram",
      "twitter",
      "leetcode"
    ];

    const filledFields = fields.filter((field) => {
      const value = profile[field];
      return (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        (!Array.isArray(value) || value.length > 0)
      );
    }).length;

    const percentage = Math.round((filledFields / fields.length) * 100);
    setProfileCompletion(percentage);
  };

  const handleSocialClick = (url) => {
    if (url) {
      window.open(url.startsWith("http") ? url : `https://${url}`, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-[#091024] text-white p-6">
      {/* Header Section */}
      <div className="flex mt-10 justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#E1C3FF] animate-pop-in">Student Dashboard</h1>
        <button
          onClick={() => navigate("/profile")}
          className="bg-gradient-to-r from-[#3D306F] to-[#9B30FF] hover:from-[#9B30FF] hover:to-[#3D306F] px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-[#3D306F] flex items-center gap-2"
        >
          <span>My Profile</span>
          <FaExternalLinkAlt size={14} />
        </button>
      </div>

      {/* Student Info Card */}
      <div className="bg-[#0d1126] rounded-xl p-6 shadow-2xl mb-8 transform transition-all duration-500 hover:shadow-purple-500/30 animate-fade-in">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative group">
            <img
              src={
                studentInfo.image 
                  ? `${backendUrl}${studentInfo.image.startsWith('/') ? '' : '/'}${studentInfo.image}`
                  : "/images/default_image.jpg"
              }
              alt="Profile" 
              className="w-36 h-36 rounded-full object-cover border-4 border-[#9B30FF] group-hover:border-[#E1C3FF] transition-all duration-500 shadow-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white font-medium">View Profile</span>
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <h2 className="text-2xl font-bold text-[#E1C3FF] animate-pop-in">{studentInfo.name}</h2>
            <p className="text-[#9B30FF] animate-fade-in">{studentInfo.rollNo}</p>
            <p className="text-gray-300 animate-fade-in">{studentInfo.email}</p>
            <p className="text-gray-300 animate-fade-in">
              {studentInfo.selectYear} • {studentInfo.branch}
            </p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => handleSocialClick(studentInfo.linkedin)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  studentInfo.linkedin
                    ? "bg-[#6D0BCF] hover:bg-[#46008B] border border-[#E1C3FF] shadow-md hover:shadow-purple-500/20"
                    : "bg-gray-600 cursor-not-allowed"
                } transition-all duration-300 animate-pop-in`}
                disabled={!studentInfo.linkedin}
              >
                <FaLinkedin size={18} />
                <span>LinkedIn</span>
              </button>
              <button
                onClick={() => handleSocialClick(studentInfo.github)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  studentInfo.github
                    ? "bg-[#6D0BCF] hover:bg-[#46008B] border border-[#E1C3FF] shadow-md hover:shadow-purple-500/20"
                    : "bg-gray-600 cursor-not-allowed"
                } transition-all duration-300 animate-pop-in`}
                disabled={!studentInfo.github}
              >
                <FaGithub size={18} />
                <span>GitHub</span>
              </button>
            </div>
          </div>

          {/* Profile Completion */}
          <div className="bg-[#0d1126] p-6 rounded-xl border border-[#9B30FF] shadow-lg hover:shadow-purple-500/20 transition-shadow duration-300 animate-fade-in">
            <h3 className="font-semibold mb-4 text-center text-[#E1C3FF]">
              Profile Completion
            </h3>
            <div className="w-32 h-32 relative">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#1a1f3d"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#9B30FF"
                  strokeWidth="3"
                  strokeDasharray={`${profileCompletion}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-[#9B30FF]">
                  {profileCompletion}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Selection Status */}
        <div className="mt-8 bg-[#0d1126] p-5 rounded-xl shadow-lg hover:shadow-purple-500/20 transition-all duration-300 animate-fade-in">
          <h3 className="font-semibold text-xl mb-3 text-[#E1C3FF]">Selection Status</h3>
          {selectedTeachers.length > 0 ? (
            <div>
              <p className="text-green-400 mb-3">
                You have been selected by {selectedTeachers.length} teacher(s):
              </p>
              <ul className="space-y-2">
                {selectedTeachers.map((teacher, index) => (
                  <li 
                    key={index} 
                    className="bg-[#1a1f3d] hover:bg-[#0d1126] p-3 rounded-lg transition-colors duration-300 flex items-center gap-3  shadow-md hover:shadow-purple-500/10"
                  >
                    <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                    <span>{teacher.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse"></div>
              <p className="text-yellow-400">
                You haven't been selected by any teachers yet.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-[#0d1126] rounded-xl p-6 shadow-2xl mb-8 transform transition-all duration-500 hover:shadow-purple-500/30 animate-fade-in">
        <h2 className="text-2xl font-bold mb-6 text-[#E1C3FF]">
          Your Skills
        </h2>
        <div className="flex flex-wrap gap-3">
          {studentInfo.skills?.length > 0 ? (
            studentInfo.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-[#6D0BCF] hover:bg-[#46008B] px-5 py-2 rounded-full text-sm font-medium border border-[#E1C3FF] shadow-md hover:shadow-purple-500/20 transition-all duration-300 animate-pop-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {skill}
              </span>
            ))
          ) : (
            <div className="w-full py-4 text-center">
              <p className="text-gray-400">
                No skills added yet. Update your profile to add skills.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Teacher Rankings Section */}
      <div className="bg-[#0d1126] rounded-xl p-6 shadow-2xl transform transition-all duration-500 hover:shadow-purple-500/30 animate-fade-in">
        <h2 className="text-2xl font-bold mb-6 text-[#E1C3FF]">
          Teacher Priority
        </h2>
        {teacherRanks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-[#9B30FF]">
                  <th className="text-left p-4 text-[#E1C3FF]">Teacher Name</th>
                  <th className="text-left p-4 text-[#E1C3FF]">Priority</th>
                </tr>
              </thead>
              <tbody>
                {teacherRanks.map((teacher, index) => (
                  <tr
                    key={index}
                    className="border-b border-[#1a1f3d] hover:bg-[#1a1f3d] transition-colors duration-300"
                  >
                    <td className="p-4 hover:text-[#E1C3FF] transition-colors duration-300 animate-fade-in">
                      {teacher.name}
                    </td>
                    <td className="p-4 animate-fade-in">
                      <span className="bg-[#6D0BCF] px-4 py-1.5 rounded-full text-sm font-medium inline-block min-w-[50px] text-center border border-[#E1C3FF] shadow-md">
                        {teacher.rank}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="w-full py-8 text-center">
            <p className="text-gray-400">
              No teachers have prioritized you yet.
            </p>
          </div>
        )}
      </div>     
    </div>
  );
};

export default StudentDashboard;
