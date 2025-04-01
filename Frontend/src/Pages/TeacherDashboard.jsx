

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
// } from "recharts";
// import { useNavigate } from "react-router-dom";
// import { FaLinkedin, FaGithub } from "react-icons/fa";

// const TeacherDashboard = () => {
//   const navigate = useNavigate();
//   const teacherId = localStorage.getItem("teacherId");
//   const [rankData, setRankData] = useState([]);
//   const [supervisedStudents, setSupervisedStudents] = useState([]);
//   const [teacherInfo, setTeacherInfo] = useState({});

//   useEffect(() => {
//     const fetchTeacherData = async () => {
//       try {
//         // Fetch basic student info
//         const teacherResponse = await axios.get(
//           `http://localhost:3002/api/teacher/${teacherId}`
//         );

//         // Fetch additional student info
//         const moreInfoResponse = await axios.get(
//           `http://localhost:3002/api/teacherProfile/${teacherId}`
//         );

//         setTeacherInfo({
//           ...teacherResponse.data,
//           ...moreInfoResponse.data.moreInfo,
//         });
//       } catch (error) {
//         console.error("Error fetching student data:", error);
//       }
//     };

//     const fetchRankData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3002/api/teacher/rankStatistics/${teacherId}`
//         );
//         const { rankPercentages } = response.data;

//         const formattedData = rankPercentages.map((percentage, index) => ({
//           name: `Rank ${index + 1}`,
//           value: percentage,
//         }));

//         setRankData(formattedData);
//       } catch (error) {
//         console.error("Error fetching rank statistics:", error);
//       }
//     };

//     const fetchSupervisedStudents = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3002/api/supervisedstudents/${teacherId}`
//         );
//         const students = response.data.students || [];
//         setSupervisedStudents(students);
//       } catch (error) {
//         console.error("Error fetching supervised students:", error);
//       }
//     };

//     fetchTeacherData();
//     fetchRankData();
//     fetchSupervisedStudents();
//   }, [teacherId]);

//   const handleSocialClick = (url) => {
//     if (url) {
//       window.open(url.startsWith("http") ? url : `https://${url}`, "_blank");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-zinc-900 text-white p-6">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-blue-400">Teacher Dashboard</h1>
//         <div className="flex gap-4">
//           <button
//             onClick={() => navigate("/StudentList")}
//             className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
//           >
//             View Students
//           </button>
//           <button
//             onClick={() => navigate("/TeacherProfile")}
//             className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
//           >
//             my Profile
//           </button>
//         </div>
//       </div>

//       {/* Teacher Info Card */}
//       <div className="bg-zinc-800 rounded-xl p-6 shadow-lg border-2 border-blue-500 mb-8">
//         <div className="flex flex-col md:flex-row items-center gap-6">
        
//           <img
//             src={
//               teacherInfo.image
//                 ? `http://localhost:3002${
//                     teacherInfo.image.startsWith("/") ? "" : "/"
//                   }${teacherInfo.image}`
//                 : "/images/default_image.jpg"
//             }
//             alt="Profile"
//             className="w-32 h-32 rounded-full object-cover border-4 border-blue-400"
//           />

//           <div className="flex-1">
//             <h2 className="text-2xl font-bold">{teacherInfo.name}</h2>
//             <p className="text-blue-300">{teacherInfo.designation}</p>
//             <p className="text-gray-300">{teacherInfo.email}</p>
//             <p className="text-gray-300">{teacherInfo.department}</p>

//             <div className="flex gap-4 mt-3">
//               <button
//                 onClick={() => handleSocialClick(teacherInfo.linkedin)}
//                 className={`flex items-center gap-2 px-3 py-1 rounded ${
//                   teacherInfo.linkedin
//                     ? "bg-blue-600 hover:bg-blue-700"
//                     : "bg-gray-600 cursor-not-allowed"
//                 }`}
//                 disabled={!teacherInfo.linkedin}
//               >
//                 <FaLinkedin size={20} />
//                 LinkedIn
//               </button>
//               <button
//                 onClick={() => handleSocialClick(teacherInfo.github)}
//                 className={`flex items-center gap-2 px-3 py-1 rounded ${
//                   teacherInfo.github
//                     ? "bg-gray-700 hover:bg-gray-600"
//                     : "bg-gray-600 cursor-not-allowed"
//                 }`}
//                 disabled={!teacherInfo.github}
//               >
//                 <FaGithub size={20} />
//                 GitHub
//               </button>
//             </div>
//           </div>

//           {/* Stats Card */}
//           <div className="bg-zinc-700 p-4 rounded-lg border border-blue-400">
//             <h3 className="font-semibold mb-2">Supervised Students</h3>
//             <div className="flex flex-col items-center justify-center">
//               <span className="text-4xl font-bold text-blue-400">
//                 {supervisedStudents.length}
//               </span>
//               <span className="text-sm text-gray-300">Total Students</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col md:flex-row gap-6">
//         {/* Left Side: Students Table */}
//         <div className="md:w-1/2 bg-zinc-800 p-6 shadow-lg rounded-lg border-2 border-blue-500">
//           <h2 className="text-2xl font-bold mb-4 text-blue-400">
//             Students Under Your Supervision
//           </h2>

//           <table className="w-full border-collapse">  
//             <thead>
//               <tr className="border-b-2 border-blue-500">
//                 <th className="p-4 text-left font-semibold text-blue-300">
//                   Name
//                 </th>
//                 <th className="p-4 text-left font-semibold text-blue-300">
//                   Roll Number
//                 </th>
//                 <th className="p-4 text-left font-semibold text-blue-300">
//                   Domain
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-zinc-600">
//               {supervisedStudents.length > 0 ? (
//                 supervisedStudents.map((student, index) => (
//                   <tr
//                     key={index}
//                     className="transition-colors hover:bg-zinc-700/50"
//                   >
//                     <td className="p-4">
//                       <div className="flex items-center gap-3">
//                         <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-blue-400">
//                           <img
//                             src={
//                               student.image
//                                 ? `http://localhost:3002${
//                                     student.image.startsWith("/") ? "" : "/"
//                                   }${student.image}`
//                                 : "/images/default_profile.jpg"
//                             }
//                             alt={student.name}
//                             className="w-full h-full object-cover"
//                             onError={(e) => {
//                               e.target.src = "/images/default_profile.jpg";
//                               e.target.onerror = null;
//                             }}
//                           />
//                         </div>
//                         <span>{student.name}</span>
//                       </div>
//                     </td>
//                     <td className="p-4 font-mono">{student.rollNo}</td>
//                     <td className="p-4">
//                       <span className="rounded-full bg-purple-900/50 px-3 py-1 text-sm">
//                         {student.domain || "N/A"}
//                       </span>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="3" className="p-8 text-center text-gray-400">
//                     <div className="flex flex-col items-center justify-center gap-2">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-12 w-12 text-gray-500"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={1.5}
//                           d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                         />
//                       </svg>
//                       <p className="text-lg">No students assigned yet</p>
//                       <p className="text-sm text-gray-500">
//                         Students you select will appear here
//                       </p>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//             {supervisedStudents.length > 0 && (
//               <tfoot>
//                 <tr>
//                   <td
//                     colSpan="3"
//                     className="bg-zinc-700 px-4 py-2 text-sm text-gray-300"
//                   >
//                     Showing {supervisedStudents.length} student
//                     {supervisedStudents.length !== 1 ? "s" : ""}
//                   </td>
//                 </tr>
//               </tfoot>
//             )}
//           </table>
//         </div>

//         {/* Right Side: Line Chart */}
//         <div className="md:w-1/2 bg-zinc-800 p-6 shadow-lg rounded-lg border-2 border-blue-500">
//           <h2 className="text-2xl font-bold mb-4 text-blue-400">
//             Rank Distribution
//           </h2>
//           <div className="flex justify-center">
//             {rankData.length > 0 ? (
//               <LineChart width={500} height={300} data={rankData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//                 <XAxis
//                   dataKey="name"
//                   stroke="#ffffff"
//                   tick={{ fill: "#ffffff" }}
//                 />
//                 <YAxis stroke="#ffffff" tick={{ fill: "#ffffff" }} />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "#1f2937",
//                     color: "white",
//                     borderColor: "#3b82f6",
//                   }}
//                 />
//                 <Legend />
//                 <Line
//                   type="monotone"
//                   dataKey="value"
//                   stroke="#3B82F6"
//                   strokeWidth={3}
//                   dot={{ r: 6, fill: "#3B82F6" }}
//                   activeDot={{ r: 8, fill: "#2563EB" }}
//                 />
//               </LineChart>
//             ) : (
//               <p className="text-gray-400 text-center py-10">
//                 No rank data available.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeacherDashboard;





// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
// } from "recharts";
// import { useNavigate } from "react-router-dom";
// import { FaLinkedin, FaGithub } from "react-icons/fa";

// const TeacherDashboard = () => {
//   const navigate = useNavigate();
//   const teacherId = localStorage.getItem("teacherId");
//   const [rankData, setRankData] = useState([]);
//   const [supervisedStudents, setSupervisedStudents] = useState([]);
//   const [teacherInfo, setTeacherInfo] = useState({});
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [showDomainModal, setShowDomainModal] = useState(false);

//   useEffect(() => {
//     const fetchTeacherData = async () => {
//       try {
//         const teacherResponse = await axios.get(
//           `http://localhost:3002/api/teacher/${teacherId}`
//         );
//         const moreInfoResponse = await axios.get(
//           `http://localhost:3002/api/teacherProfile/${teacherId}`
//         );

//         setTeacherInfo({
//           ...teacherResponse.data,
//           ...moreInfoResponse.data.moreInfo,
//         });
//       } catch (error) {
//         console.error("Error fetching teacher data:", error);
//       }
//     };

//     const fetchRankData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3002/api/teacher/rankStatistics/${teacherId}`
//         );
//         const { rankPercentages } = response.data;

//         const formattedData = rankPercentages.map((percentage, index) => ({
//           name: `Rank ${index + 1}`,
//           value: percentage,
//         }));

//         setRankData(formattedData);
//       } catch (error) {
//         console.error("Error fetching rank statistics:", error);
//       }
//     };

//     const fetchSupervisedStudents = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3002/api/supervisedstudents/${teacherId}`
//         );
//         const students = response.data.students || [];
//         setSupervisedStudents(students);
//       } catch (error) {
//         console.error("Error fetching supervised students:", error);
//       }
//     };

//     fetchTeacherData();
//     fetchRankData();
//     fetchSupervisedStudents();
//   }, [teacherId]);

//   const handleSocialClick = (url) => {
//     if (url) {
//       window.open(url.startsWith("http") ? url : `https://${url}`, "_blank");
//     }
//   };

//   const handleViewDomains = (student) => {
//     setSelectedStudent(student);
//     setShowDomainModal(true);
//   };

//   const closeDomainModal = () => {
//     setShowDomainModal(false);
//     setSelectedStudent(null);
//   };

//   return (
//     <div className="min-h-screen bg-zinc-900 text-white p-6">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-blue-400">Teacher Dashboard</h1>
//         <div className="flex gap-4">
//           <button
//             onClick={() => navigate("/StudentList")}
//             className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
//           >
//             View Students
//           </button>
//           <button
//             onClick={() => navigate("/TeacherProfile")}
//             className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
//           >
//            My Profile
//           </button>
//         </div>
//       </div>

//       {/* Teacher Info Card */}
//       <div className="bg-zinc-800 rounded-xl p-6 shadow-lg border-2 border-blue-500 mb-8">
//         <div className="flex flex-col md:flex-row items-center gap-6">
//           <img
//             src={
//               teacherInfo.image
//                 ? `http://localhost:3002${
//                     teacherInfo.image.startsWith("/") ? "" : "/"
//                   }${teacherInfo.image}`
//                 : "/images/default_image.jpg"
//             }
//             alt="Profile"
//             className="w-32 h-32 rounded-full object-cover border-4 border-blue-400"
//           />

//           <div className="flex-1">
//             <h2 className="text-2xl font-bold">{teacherInfo.name}</h2>
//             <p className="text-blue-300">{teacherInfo.designation}</p>
//             <p className="text-gray-300">{teacherInfo.email}</p>
//             <p className="text-gray-300">{teacherInfo.department}</p>

//             <div className="flex gap-4 mt-3">
//               <button
//                 onClick={() => handleSocialClick(teacherInfo.linkedin)}
//                 className={`flex items-center gap-2 px-3 py-1 rounded ${
//                   teacherInfo.linkedin
//                     ? "bg-blue-600 hover:bg-blue-700"
//                     : "bg-gray-600 cursor-not-allowed"
//                 }`}
//                 disabled={!teacherInfo.linkedin}
//               >
//                 <FaLinkedin size={20} />
//                 LinkedIn
//               </button>
//               <button
//                 onClick={() => handleSocialClick(teacherInfo.github)}
//                 className={`flex items-center gap-2 px-3 py-1 rounded ${
//                   teacherInfo.github
//                     ? "bg-gray-700 hover:bg-gray-600"
//                     : "bg-gray-600 cursor-not-allowed"
//                 }`}
//                 disabled={!teacherInfo.github}
//               >
//                 <FaGithub size={20} />
//                 GitHub
//               </button>
//             </div>
//           </div>

//           {/* Stats Card */}
//           <div className="bg-zinc-700 p-4 rounded-lg border border-blue-400">
//             <h3 className="font-semibold mb-2">Supervised Students</h3>
//             <div className="flex flex-col items-center justify-center">
//               <span className="text-4xl font-bold text-blue-400">
//                 {supervisedStudents.length}
//               </span>
//               <span className="text-sm text-gray-300">Total Students</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col md:flex-row gap-6">
//         {/* Left Side: Students Table */}
//         <div className="md:w-1/2 bg-zinc-800 p-6 shadow-lg rounded-lg border-2 border-blue-500">
//           <h2 className="text-2xl font-bold mb-4 text-blue-400">
//             Students Under Your Supervision
//           </h2>

//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="border-b-2 border-blue-500">
//                 <th className="p-4 text-left font-semibold text-blue-300">
//                   Name
//                 </th>
//                 <th className="p-4 text-left font-semibold text-blue-300">
//                   Roll Number
//                 </th>
//                 <th className="p-4 text-left font-semibold text-blue-300 text">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-zinc-600">
//               {supervisedStudents.length > 0 ? (
//                 supervisedStudents.map((student, index) => (
//                   <tr
//                     key={index}
//                     className="transition-colors hover:bg-zinc-700/50"
//                   >
//                     <td className="p-4">
//                       <div className="flex items-center gap-3">
//                         <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-blue-400">
//                           <img
//                             src={
//                               student.image
//                                 ? `http://localhost:3002${
//                                     student.image.startsWith("/") ? "" : "/"
//                                   }${student.image}`
//                                 : "/images/default_profile.jpg"
//                             }
//                             alt={student.name}
//                             className="w-full h-full object-cover"
//                             onError={(e) => {
//                               e.target.src = "/images/default_profile.jpg";
//                               e.target.onerror = null;
//                             }}
//                           />
//                         </div>
//                         <span>{student.name}</span>
//                       </div>
//                     </td>
//                     <td className="p-4 font-mono">{student.rollNo}</td>
//                     <td className="p-4">
//                       <button
//                         onClick={() => handleViewDomains(student)}
//                         className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded text-sm"
//                       >
//                         View Domains
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="3" className="p-8 text-center text-gray-400">
//                     <div className="flex flex-col items-center justify-center gap-2">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-12 w-12 text-gray-500"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={1.5}
//                           d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                         />
//                       </svg>
//                       <p className="text-lg">No students assigned yet</p>
//                       <p className="text-sm text-gray-500">
//                         Students you select will appear here
//                       </p>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//             {supervisedStudents.length > 0 && (
//               <tfoot>
//                 <tr>
//                   <td
//                     colSpan="3"
//                     className="bg-zinc-700 px-4 py-2 text-sm text-gray-300"
//                   >
//                     Showing {supervisedStudents.length} student
//                     {supervisedStudents.length !== 1 ? "s" : ""}
//                   </td>
//                 </tr>
//               </tfoot>
//             )}
//           </table>
//         </div>

//         {/* Right Side: Line Chart */}
//         <div className="md:w-1/2 bg-zinc-800 p-6 shadow-lg rounded-lg border-2 border-blue-500">
//           <h2 className="text-2xl font-bold mb-4 text-blue-400">
//             Rank Distribution
//           </h2>
//           <div className="flex justify-center">
//             {rankData.length > 0 ? (
//               <LineChart width={500} height={300} data={rankData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//                 <XAxis
//                   dataKey="name"
//                   stroke="#ffffff"
//                   tick={{ fill: "#ffffff" }}
//                 />
//                 <YAxis stroke="#ffffff" tick={{ fill: "#ffffff" }} />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "#1f2937",
//                     color: "white",
//                     borderColor: "#3b82f6",
//                   }}
//                 />
//                 <Legend />
//                 <Line
//                   type="monotone"
//                   dataKey="value"
//                   stroke="#3B82F6"
//                   strokeWidth={3}
//                   dot={{ r: 6, fill: "#3B82F6" }}
//                   activeDot={{ r: 8, fill: "#2563EB" }}
//                 />
//               </LineChart>
//             ) : (
//               <p className="text-gray-400 text-center py-10">
//                 No rank data available.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Domain Modal */}
//       {showDomainModal && selectedStudent && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-zinc-800 rounded-xl p-6 shadow-lg border-2 border-blue-500 max-w-md w-full">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-bold text-blue-400">
//                 {selectedStudent.name}'s Domains
//               </h3>
//               <button
//                 onClick={closeDomainModal}
//                 className="text-gray-400 hover:text-white"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>

//             <div className="space-y-4">
//               {selectedStudent.domain ? (
//                 Array.isArray(selectedStudent.domain) ? (
//                   selectedStudent.domain.map((domain, index) => (
//                     <div
//                       key={index}
//                       className="bg-zinc-700 p-3 rounded-lg flex items-center"
//                     >
//                       <span className="rounded-full bg-purple-900/50 px-3 py-1 text-sm mr-3">
//                         {domain}
//                       </span>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="bg-zinc-700 p-3 rounded-lg flex items-center">
//                     <span className="rounded-full bg-purple-900/50 px-3 py-1 text-sm">
//                       {selectedStudent.domain}
//                     </span>
//                   </div>
//                 )
//               ) : (
//                 <p className="text-gray-400">No domains specified</p>
//               )}
//             </div>

//             <div className="mt-6 flex justify-end">
//               <button
//                 onClick={closeDomainModal}
//                 className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TeacherDashboard;


import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const teacherId = localStorage.getItem("teacherId");
  const [rankData, setRankData] = useState([]);
  const [supervisedStudents, setSupervisedStudents] = useState([]);
  const [teacherInfo, setTeacherInfo] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDomainModal, setShowDomainModal] = useState(false);

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const teacherResponse = await axios.get(
          `http://localhost:3002/api/teacher/${teacherId}`
        );
        const moreInfoResponse = await axios.get(
          `http://localhost:3002/api/teacherProfile/${teacherId}`
        );

        setTeacherInfo({
          ...teacherResponse.data,
          ...moreInfoResponse.data.moreInfo,
        });
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
    };

    const fetchRankData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/api/teacher/rankStatistics/${teacherId}`
        );
        const { rankPercentages } = response.data;

        const formattedData = rankPercentages.map((percentage, index) => ({
          name: `Rank ${index + 1}`,
          value: percentage,
        }));

        setRankData(formattedData);
      } catch (error) {
        console.error("Error fetching rank statistics:", error);
      }
    };

    const fetchSupervisedStudents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/api/supervisedstudents/${teacherId}`
        );
        const students = response.data.students || [];
        setSupervisedStudents(students);
      } catch (error) {
        console.error("Error fetching supervised students:", error);
      }
    };

    fetchTeacherData();
    fetchRankData();
    fetchSupervisedStudents();
  }, [teacherId]);

  const handleSocialClick = (url) => {
    if (url) {
      window.open(url.startsWith("http") ? url : `https://${url}`, "_blank");
    }
  };

  const handleViewDomains = (student) => {
    setSelectedStudent(student);
    setShowDomainModal(true);
  };

  const closeDomainModal = () => {
    setShowDomainModal(false);
    setSelectedStudent(null);
  };

  return (
    <div className="min-h-screen bg-[#090c1b] text-white p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#E1C3FF]">Teacher Dashboard</h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/StudentList")}
            className="bg-[#6D0BCF] hover:bg-[#46008B] px-4 py-2 rounded-lg transition border border-[#E1C3FF]"
          >
            View Students
          </button>
          <button
            onClick={() => navigate("/TeacherProfile")}
            className="bg-[#6D0BCF] hover:bg-[#46008B] px-4 py-2 rounded-lg transition border border-[#E1C3FF]"
          >
            My Profile
          </button>
        </div>
      </div>

      {/* Teacher Info Card */}
      <div className="bg-[#0d1126] rounded-xl p-6 shadow-lg border-2 border-[#E1C3FF] mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={
              teacherInfo.image
                ? `http://localhost:3002${
                    teacherInfo.image.startsWith("/") ? "" : "/"
                  }${teacherInfo.image}`
                : "/images/default_image.jpg"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-[#9B30FF]"
          />

          <div className="flex-1">
            <h2 className="text-2xl font-bold">{teacherInfo.name}</h2>
            <p className="text-[#E1C3FF]">{teacherInfo.designation}</p>
            <p className="text-gray-300">{teacherInfo.email}</p>
            <p className="text-gray-300">{teacherInfo.department}</p>

            <div className="flex gap-4 mt-3">
              <button
                onClick={() => handleSocialClick(teacherInfo.linkedin)}
                className={`flex items-center gap-2 px-3 py-1 rounded ${
                  teacherInfo.linkedin
                    ? "bg-[#6D0BCF] hover:bg-[#46008B] border border-[#E1C3FF]"
                    : "bg-gray-600 cursor-not-allowed"
                }`}
                disabled={!teacherInfo.linkedin}
              >
                <FaLinkedin size={20} />
                LinkedIn
              </button>
              <button
                onClick={() => handleSocialClick(teacherInfo.github)}
                className={`flex items-center gap-2 px-3 py-1 rounded ${
                  teacherInfo.github
                    ? "bg-[#6D0BCF] hover:bg-[#46008B] border border-[#E1C3FF]"
                    : "bg-gray-600 cursor-not-allowed"
                }`}
                disabled={!teacherInfo.github}
              >
                <FaGithub size={20} />
                GitHub
              </button>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-[#0d1126] p-4 rounded-lg border border-[#9B30FF]">
            <h3 className="font-semibold mb-2 text-[#E1C3FF]">Supervised Students</h3>
            <div className="flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-[#9B30FF]">
                {supervisedStudents.length}
              </span>
              <span className="text-sm text-gray-300">Total Students</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side: Students Table */}
        <div className="md:w-1/2 bg-[#0d1126] p-6 shadow-lg rounded-lg border-2 border-[#E1C3FF]">
          <h2 className="text-2xl font-bold mb-4 text-[#E1C3FF]">
            Students Under Your Supervision
          </h2>

          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-[#9B30FF]">
                <th className="p-4 text-left font-semibold text-[#E1C3FF]">
                  Name
                </th>
                <th className="p-4 text-left font-semibold text-[#E1C3FF]">
                  Roll Number
                </th>
                <th className="p-4 text-left font-semibold text-[#E1C3FF]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1f3d]">
              {supervisedStudents.length > 0 ? (
                supervisedStudents.map((student, index) => (
                  <tr
                    key={index}
                    className="transition-colors hover:bg-[#1a1f3d]"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-[#9B30FF]">
                          <img
                            src={
                              student.image
                                ? `http://localhost:3002${
                                    student.image.startsWith("/") ? "" : "/"
                                  }${student.image}`
                                : "/images/default_profile.jpg"
                            }
                            alt={student.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = "/images/default_profile.jpg";
                              e.target.onerror = null;
                            }}
                          />
                        </div>
                        <span>{student.name}</span>
                      </div>
                    </td>
                    <td className="p-4 font-mono">{student.rollNo}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleViewDomains(student)}
                        className="bg-[#6D0BCF] hover:bg-[#46008B] px-3 py-1 rounded text-sm border border-[#E1C3FF]"
                      >
                        View Domains
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-8 text-center text-gray-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-lg">No students assigned yet</p>
                      <p className="text-sm text-gray-500">
                        Students you select will appear here
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
            {supervisedStudents.length > 0 && (
              <tfoot>
                <tr>
                  <td
                    colSpan="3"
                    className="bg-[#1a1f3d] px-4 py-2 text-sm text-gray-300"
                  >
                    Showing {supervisedStudents.length} student
                    {supervisedStudents.length !== 1 ? "s" : ""}
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>

        {/* Right Side: Line Chart */}
        <div className="md:w-1/2 bg-[#0d1126] p-6 shadow-lg rounded-lg border-2 border-[#E1C3FF]">
          <h2 className="text-2xl font-bold mb-4 text-[#E1C3FF]">
            Rank Distribution
          </h2>
          <div className="flex justify-center">
            {rankData.length > 0 ? (
              <LineChart width={500} height={300} data={rankData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1f3d" />
                <XAxis
                  dataKey="name"
                  stroke="#E1C3FF"
                  tick={{ fill: "#E1C3FF" }}
                />
                <YAxis stroke="#E1C3FF" tick={{ fill: "#E1C3FF" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0d1126",
                    color: "white",
                    borderColor: "#9B30FF",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#9B30FF"
                  strokeWidth={3}
                  dot={{ r: 6, fill: "#9B30FF" }}
                  activeDot={{ r: 8, fill: "#6D0BCF" }}
                />
              </LineChart>
            ) : (
              <p className="text-gray-400 text-center py-10">
                No rank data available.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Domain Modal */}
      {showDomainModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#0d1126] rounded-xl p-6 shadow-lg border-2 border-[#9B30FF] max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#E1C3FF]">
                {selectedStudent.name}'s Domains
              </h3>
              <button
                onClick={closeDomainModal}
                className="text-gray-400 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {selectedStudent.domain ? (
                Array.isArray(selectedStudent.domain) ? (
                  selectedStudent.domain.map((domain, index) => (
                    <div
                      key={index}
                      className="bg-[#1a1f3d] p-3 rounded-lg flex items-center"
                    >
                      <span className="rounded-full bg-[#6D0BCF] px-3 py-1 text-sm mr-3">
                        {domain}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="bg-[#1a1f3d] p-3 rounded-lg flex items-center">
                    <span className="rounded-full bg-[#6D0BCF] px-3 py-1 text-sm">
                      {selectedStudent.domain}
                    </span>
                  </div>
                )
              ) : (
                <p className="text-gray-400">No domains specified</p>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={closeDomainModal}
                className="bg-[#6D0BCF] hover:bg-[#46008B] px-4 py-2 rounded-lg transition border border-[#E1C3FF]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;