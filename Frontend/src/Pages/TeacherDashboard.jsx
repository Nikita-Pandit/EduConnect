// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { PieChart, Pie, Tooltip, Cell } from "recharts";
// import { useNavigate } from "react-router-dom";

// const TeacherDashboard = () => {
//   const navigate = useNavigate();
//   const teacherID = localStorage.getItem("teacherId");
//   const [rankData, setRankData] = useState([]);
//   const [rankDetails, setRankDetails] = useState({});
//   const [hoveredRank, setHoveredRank] = useState(null);
//   const [supervisedStudents, setSupervisedStudents] = useState([]);

//   const COLORS = [
//     "#FF5733",
//     "#FFC300",
//     "#DAF7A6",
//     "#33FF57",
//     "#33FFF3",
//     "#3375FF",
//     "#8333FF",
//     "#FF33F6",
//     "#FF3366",
//     "#FF6E33",
//   ];

//   useEffect(() => {
//     const fetchRankData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3002/api/teacher/rankStatistics/${teacherID}`
//         );
//         const { rankPercentages, rankDetails } = response.data;

//         const formattedData = rankPercentages.map((percentage, index) => ({
//           name: `Rank ${index + 1}`,
//           value: percentage,
//         }));

//         setRankData(formattedData);
//         setRankDetails(rankDetails);
//       } catch (error) {
//         console.error("Error fetching rank statistics:", error);
//       }
//     };

//     const fetchSupervisedStudents = async () => {
//       try {
//         // Get from localStorage first
//         const storedStudents = localStorage.getItem(`supervisedStudents_${teacherID}`);
//         if (storedStudents) {
//           setSupervisedStudents(JSON.parse(storedStudents));
//           return;
//         }

//         // Fallback to API if not in localStorage
//         const response = await axios.get(
//           `http://localhost:3002/api/supervisedstudents/${teacherID}`
//         );
//         const students = response.data.students || [];
//         setSupervisedStudents(students);
//         localStorage.setItem(`supervisedStudents_${teacherID}`, JSON.stringify(students));
//       } catch (error) {
//         console.error("Error fetching supervised students:", error);
//       }
//     };

//     fetchRankData();
//     fetchSupervisedStudents();
//   }, [teacherID]);

//   return (
//     <div className="p-5 bg-zinc-1000">
//       <h1 className="text-2xl font-bold mb-5">Teacher Dashboard</h1>

//       <div className="flex">
//         {/* Left side: Students under supervision table */}
//         <div className="w-1/3 p-4 bg-zinc-800 shadow-md rounded-lg border-2 border-blue-300">
//           <h2 className="text-lg font-bold text-white mb-4">
//             Students under your supervision
//           </h2>
//           <table className="w-full">
//             <thead>
//               <tr className="border-b-2 border-gray-400">
//                 <th className="text-left text-white">Name</th>
//                 <th className="text-left text-white">Roll Number</th>
//               </tr>
//             </thead>
//             <tbody>
//               {supervisedStudents.map((student, index) => (
//                 <tr key={index} className="text-white border-b border-gray-600">
//                   <td className="py-2">{student.name}</td>
//                   <td className="py-2">{student.rollNo}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Right side: Pie chart and other details */}
//         <div className="w-2/3 flex flex-col items-center">
//           <PieChart width={400} height={400}>
//             <Pie
//               data={rankData}
//               cx={200}
//               cy={200}
//               outerRadius={150}
//               fill="#8884d8"
//               dataKey="value"
//               onMouseEnter={(data, index) => setHoveredRank(index + 1)}
//             >
//               {rankData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index]} />
//               ))}
//             </Pie>
//             <Tooltip
//               contentStyle={{
//                 backgroundColor: "#333",
//                 border: "1px solid #555",
//                 borderRadius: "8px",
//                 color: "white",
//               }}
//               labelStyle={{ color: "yellow", fontWeight: "bold" }}
//             />
//           </PieChart>
//           <button
//             onClick={() => navigate("/StudentList")}
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
//           >
//             MORE
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeacherDashboard;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { PieChart, Pie, Tooltip, Cell } from "recharts";
// import { useNavigate } from "react-router-dom";

// const TeacherDashboard = () => {
//   const navigate = useNavigate();
//   const teacherID = localStorage.getItem("teacherId");
//   const [rankData, setRankData] = useState([]);
//   const [rankDetails, setRankDetails] = useState({});
//   const [hoveredRank, setHoveredRank] = useState(null);
//   const [supervisedStudents, setSupervisedStudents] = useState([]);

//   const COLORS = [
//     "#FF5733",
//     "#FFC300",
//     "#DAF7A6",
//     "#33FF57",
//     "#33FFF3",
//     "#3375FF",
//     "#8333FF",
//     "#FF33F6",
//     "#FF3366",
//     "#FF6E33",
//   ];

//   const fetchSupervisedStudents = async () => {
//     try {
//       // First try localStorage
//       const storedStudents = localStorage.getItem(`supervisedStudents_${teacherID}`);
//       if (storedStudents) {
//         setSupervisedStudents(JSON.parse(storedStudents));
//       }

//       // Then always refresh from API to ensure we have latest data
//       const response = await axios.get(
//         `http://localhost:3002/api/supervisedstudents/${teacherID}`
//       );
//       const students = response.data.students || [];
//       setSupervisedStudents(students);
//       localStorage.setItem(`supervisedStudents_${teacherID}`, JSON.stringify(students));
//     } catch (error) {
//       console.error("Error fetching supervised students:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchRankData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3002/api/teacher/rankStatistics/${teacherID}`
//         );
//         const { rankPercentages, rankDetails } = response.data;

//         const formattedData = rankPercentages.map((percentage, index) => ({
//           name: `Rank ${index + 1}`,
//           value: percentage,
//         }));

//         setRankData(formattedData);
//         setRankDetails(rankDetails);
//       } catch (error) {
//         console.error("Error fetching rank statistics:", error);
//       }
//     };

//     fetchRankData();
//     fetchSupervisedStudents();

//     // Listen for storage events to update when changes are made in other tabs
//     const handleStorageChange = (e) => {
//       if (e.key === `supervisedStudents_${teacherID}`) {
//         fetchSupervisedStudents();
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, [teacherID]);

//   return (
//     <div className="p-5 bg-zinc-1000">
//       <h1 className="text-2xl font-bold mb-5">Teacher Dashboard</h1>

//       <div className="flex">
//         {/* Left side: Students under supervision table */}
//         <div className="w-1/3 p-4 bg-zinc-800 shadow-md rounded-lg border-2 border-blue-300">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-bold text-white">
//               Students under your supervision
//             </h2>
//             {/* <button
//               onClick={fetchSupervisedStudents}
//               className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
//             >
//               Refresh
//             </button> */}
//           </div>
//           <table className="w-full">
//             <thead>
//               <tr className="border-b-2 border-gray-400">
//                 <th className="text-left text-white">Name</th>
//                 <th className="text-left text-white">Roll Number</th>
//               </tr>
//             </thead>
//             <tbody>
//               {supervisedStudents.length > 0 ? (
//                 supervisedStudents.map((student, index) => (
//                   <tr key={index} className="text-white border-b border-gray-600">
//                     <td className="py-2">{student.name}</td>
//                     <td className="py-2">{student.rollNo}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="2" className="text-white py-2 text-center">
//                     No students under supervision
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Right side: Pie chart and other details */}
//         <div className="w-2/3 flex flex-col items-center">
//           <PieChart width={400} height={400}>
//             <Pie
//               data={rankData}
//               cx={200}
//               cy={200}
//               outerRadius={150}
//               fill="#8884d8"
//               dataKey="value"
//               onMouseEnter={(data, index) => setHoveredRank(index + 1)}
//             >
//               {rankData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index]} />
//               ))}
//             </Pie>
//             <Tooltip
//               contentStyle={{
//                 backgroundColor: "#333",
//                 border: "1px solid #555",
//                 borderRadius: "8px",
//                 color: "white",
//               }}
//               labelStyle={{ color: "yellow", fontWeight: "bold" }}
//             />
//           </PieChart>
//           <button
//             onClick={() => navigate("/StudentList")}
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
//           >
//             MANAGE STUDENTS
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeacherDashboard;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { PieChart, Pie, Tooltip, Cell } from "recharts";
// import { useNavigate } from "react-router-dom";

// const TeacherDashboard = () => {
//   const navigate = useNavigate();
//   const teacherID = localStorage.getItem("teacherId");
//   const [rankData, setRankData] = useState([]);
//   const [supervisedStudents, setSupervisedStudents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const COLORS = [
//     "#FF5733",
//     "#FFC300",
//     "#DAF7A6",
//     "#33FF57",
//     "#33FFF3",
//     "#3375FF",
//     "#8333FF",
//     "#FF33F6",
//     "#FF3366",
//     "#FF6E33",
//   ];

//   const fetchSupervisedStudents = async () => {
//     try {
//       setLoading(true);
//       // Always fetch fresh data from API
//       const response = await axios.get(
//         `http://localhost:3002/api/supervisedstudents/${teacherID}`
//       );
//       const students = response.data.students || [];

//       // Filter out any invalid entries
//       const validStudents = students.filter((s) => s.rollNo && s.name);

//       setSupervisedStudents(validStudents);
//       localStorage.setItem(
//         `supervisedStudents_${teacherID}`,
//         JSON.stringify(validStudents)
//       );
//     } catch (error) {
//       console.error("Error fetching students:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch rank data
//         const rankResponse = await axios.get(
//           `http://localhost:3002/api/teacher/rankStatistics/${teacherID}`
//         );
//         const rankPercentages = rankResponse.data.rankPercentages || [];
//         setRankData(
//           rankPercentages.map((value, index) => ({
//             name: `Rank ${index + 1}`,
//             value,
//           }))
//         );

//         // Fetch supervised students
//         await fetchSupervisedStudents();
//       } catch (error) {
//         console.error("Error fetching dashboard data:", error);
//       }
//     };

//     fetchData();

//     // Listen for storage updates
//     const handleStorageUpdate = () => {
//       fetchSupervisedStudents();
//     };

//     window.addEventListener("storage", handleStorageUpdate);
//     return () => window.removeEventListener("storage", handleStorageUpdate);
//   }, [teacherID]);

//   return (
//     <div className="p-5 bg-zinc-1000">
//       <h1 className="text-2xl font-bold mb-5">Teacher Dashboard</h1>

//       <div className="flex flex-col md:flex-row gap-4">
//         <div className="w-full md:w-1/3 p-4 bg-zinc-800 rounded-lg border-2 border-blue-300">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-bold text-white">
//               Students Under Supervision
//             </h2>
//             <button
//               onClick={fetchSupervisedStudents}
//               className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
//               disabled={loading}
//             >
//               {loading ? "Loading..." : "Refresh"}
//             </button>
//           </div>

//           {loading ? (
//             <p className="text-white">Loading students...</p>
//           ) : supervisedStudents.length > 0 ? (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b-2 border-gray-400">
//                     <th className="text-left text-white p-2">Name</th>
//                     <th className="text-left text-white p-2">Roll No</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {supervisedStudents.map((student) => (
//                     <tr
//                       key={student.rollNo}
//                       className="border-b border-gray-600"
//                     >
//                       <td className="text-white p-2">{student.name}</td>
//                       <td className="text-white p-2">{student.rollNo}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <p className="text-white">No students under supervision</p>
//           )}
//         </div>

//         <div className="w-full md:w-2/3 flex flex-col items-center">
//           <PieChart width={400} height={400}>
//             <Pie
//               data={rankData}
//               cx="50%"
//               cy="50%"
//               outerRadius={150}
//               dataKey="value"
//               label={({ name, percent }) =>
//                 `${name}: ${(percent * 100).toFixed(0)}%`
//               }
//             >
//               {rankData.map((_, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={COLORS[index % COLORS.length]}
//                 />
//               ))}
//             </Pie>
//             <Tooltip
//               formatter={(value) => [`${value}%`, "Percentage"]}
//               contentStyle={{
//                 backgroundColor: "#333",
//                 border: "1px solid #555",
//                 borderRadius: "8px",
//                 color: "white",
//               }}
//             />
//           </PieChart>
//           <button
//             onClick={() => navigate("/StudentList")}
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
//           >
//             Manage Students
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeacherDashboard;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { PieChart, Pie, Tooltip, Cell } from "recharts";
// import { useNavigate } from "react-router-dom";

// const TeacherDashboard = () => {
//   const navigate = useNavigate();
//   const teacherID = localStorage.getItem("teacherId");
//   const [rankData, setRankData] = useState([]);
//   const [supervisedStudents, setSupervisedStudents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const COLORS = [
//     "#FF5733",
//     "#FFC300",
//     "#DAF7A6",
//     "#33FF57",
//     "#33FFF3",
//     "#3375FF",
//     "#8333FF",
//     "#FF33F6",
//     "#FF3366",
//     "#FF6E33",
//   ];

//   const fetchSupervisedStudents = async () => {
//     try {
//       setLoading(true);
//       // Always fetch fresh data from API
//       const response = await axios.get(
//         `http://localhost:3002/api/supervisedstudents/${teacherID}`
//       );
//       const students = response.data.students || [];

//       // Filter out any invalid entries
//       const validStudents = students.filter((s) => s.rollNo && s.name);

//       setSupervisedStudents(validStudents);
//       localStorage.setItem(
//         `supervisedStudents_${teacherID}`,
//         JSON.stringify(validStudents)
//       );
//     } catch (error) {
//       console.error("Error fetching students:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch rank data
//         const rankResponse = await axios.get(
//           `http://localhost:3002/api/teacher/rankStatistics/${teacherID}`
//         );
//         const rankPercentages = rankResponse.data.rankPercentages || [];
//         setRankData(
//           rankPercentages.map((value, index) => ({
//             name: `Rank ${index + 1}`,
//             value,
//           }))
//         );

//         // Fetch supervised students
//         await fetchSupervisedStudents();
//       } catch (error) {
//         console.error("Error fetching dashboard data:", error);
//       }
//     };

//     fetchData();

//     // Listen for storage updates
//     const handleStorageUpdate = () => {
//       fetchSupervisedStudents();
//     };

//     window.addEventListener("storage", handleStorageUpdate);
//     return () => window.removeEventListener("storage", handleStorageUpdate);
//   }, [teacherID]);

//   return (
//     <div className="p-5 bg-zinc-1000">
//       <h1 className="text-2xl font-bold mb-5">Teacher Dashboard</h1>

//       <div className="flex flex-col md:flex-row gap-4">
//         <div className="w-full md:w-1/3 p-4 bg-zinc-800 rounded-lg border-2 border-blue-300">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-bold text-white">
//               Students Under Supervision
//             </h2>
//             <button
//               onClick={fetchSupervisedStudents}
//               className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
//               disabled={loading}
//             >
//               {loading ? "Loading..." : "Refresh"}
//             </button>
//           </div>

//           {loading ? (
//             <p className="text-white">Loading students...</p>
//           ) : supervisedStudents.length > 0 ? (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b-2 border-gray-400">
//                     <th className="text-left text-white p-2">Name</th>
//                     <th className="text-left text-white p-2">Roll No</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {supervisedStudents.map((student) => (
//                     <tr
//                       key={student.rollNo}
//                       className="border-b border-gray-600"
//                     >
//                       <td className="text-white p-2">{student.name}</td>
//                       <td className="text-white p-2">{student.rollNo}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <p className="text-white">No students under supervision</p>
//           )}
//         </div>

//         <div className="w-full md:w-2/3 flex flex-col items-center">
//           <PieChart width={400} height={400}>
//             <Pie
//               data={rankData}
//               cx="50%"
//               cy="50%"
//               outerRadius={150}
//               dataKey="value"
//               label={({ name, percent }) =>
//                 `${name}: ${(percent * 100).toFixed(0)}%`
//               }
//             >
//               {rankData.map((_, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={COLORS[index % COLORS.length]}
//                 />
//               ))}
//             </Pie>
//             <Tooltip
//               formatter={(value) => [`${value}%`, "Percentage"]}
//               contentStyle={{
//                 backgroundColor: "#333",
//                 border: "1px solid #555",
//                 borderRadius: "8px",
//                 color: "white",
//               }}
//             />
//           </PieChart>
//           <button
//             onClick={() => navigate("/StudentList")}
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
//           >
//             Manage Students
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeacherDashboard;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
// import { useNavigate } from "react-router-dom";

// const TeacherDashboard = () => {
//   const navigate = useNavigate();
//   const teacherID = localStorage.getItem("teacherId");
//   const [rankData, setRankData] = useState([]);
//   const [supervisedStudents, setSupervisedStudents] = useState([]);

//   useEffect(() => {
//     const fetchRankData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3002/api/teacher/rankStatistics/${teacherID}`
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
//         const storedStudents = localStorage.getItem(`supervisedStudents_${teacherID}`);
//         if (storedStudents) {
//           setSupervisedStudents(JSON.parse(storedStudents));
//           return;
//         }

//         const response = await axios.get(
//           `http://localhost:3002/api/supervisedstudents/${teacherID}`
//         );
//         const students = response.data.students || [];
//         setSupervisedStudents(students);
//         localStorage.setItem(`supervisedStudents_${teacherID}`, JSON.stringify(students));
//       } catch (error) {
//         console.error("Error fetching supervised students:", error);
//       }
//     };

//     fetchRankData();
//     fetchSupervisedStudents();
//   }, [teacherID]);

//   return (
//     <div className="p-6 bg-zinc-900 min-h-screen text-white">
//       <h1 className="text-3xl font-bold mb-6 text-center">Teacher Dashboard</h1>

//       <div className="flex flex-col md:flex-row gap-6">
//         {/* Left Side: Students Table */}
//         <div className="md:w-1/3 bg-zinc-800 p-5 shadow-lg rounded-lg border-2 border-blue-300">
//           <h2 className="text-xl font-bold text-white mb-4 text-center">
//             Students Under Your Supervision
//           </h2>
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="border-b-2 border-gray-500">
//                   <th className="text-left p-2">Name</th>
//                   <th className="text-left p-2">Roll Number</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {supervisedStudents.length > 0 ? (
//                   supervisedStudents.map((student, index) => (
//                     <tr key={index} className="border-b border-gray-600">
//                       <td className="py-2 px-3">{student.name}</td>
//                       <td className="py-2 px-3">{student.rollNo}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="2" className="text-center py-3 text-gray-400">
//                       No students assigned yet.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Right Side: Line Chart */}
//         <div className="md:w-2/3 flex flex-col items-center">
//           <h2 className="text-xl font-semibold text-white mb-3">Rank Progression Over Time</h2>
//           <div className="bg-zinc-800 p-5 rounded-lg shadow-lg border-2 border-green-400">
//             {rankData.length > 0 ? (
//               <LineChart width={500} height={300} data={rankData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" stroke="white" />
//                 <YAxis stroke="white" />
//                 <Tooltip contentStyle={{ backgroundColor: "#222", color: "white" }} />
//                 <Legend />
//                 <Line type="monotone" dataKey="value" stroke="#00C49F" strokeWidth={3} dot={{ r: 6 }} />
//               </LineChart>
//             ) : (
//               <p className="text-gray-400 text-center">No rank data available.</p>
//             )}
//           </div>

//           <button
//             onClick={() => navigate("/StudentList")}
//             className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg mt-4 transition"
//           >
//             View More Students
//           </button>
//         </div>
//       </div>
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

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const teacherID = localStorage.getItem("teacherId");
  const [rankData, setRankData] = useState([]);
  const [supervisedStudents, setSupervisedStudents] = useState([]);

  useEffect(() => {
    const fetchRankData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/api/teacher/rankStatistics/${teacherID}`
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
          `http://localhost:3002/api/supervisedstudents/${teacherID}`
        );
        const students = response.data.students || [];
        setSupervisedStudents(students);
      } catch (error) {
        console.error("Error fetching supervised students:", error);
      }
    };

    fetchRankData();
    fetchSupervisedStudents();
  }, [teacherID]);

  return (
    <div className="p-6 bg-zinc-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Teacher Dashboard</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side: Students Table */}
        <div className="md:w-1/3 bg-zinc-800 p-5 shadow-lg rounded-lg border-2 border-blue-300">
          <h2 className="text-xl font-bold text-white mb-4 text-center">
            Students Under Your Supervision
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-500">
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Roll Number</th>
                </tr>
              </thead>
              <tbody>
                {supervisedStudents.length > 0 ? (
                  supervisedStudents.map((student, index) => (
                    <tr key={index} className="border-b border-gray-600">
                      <td className="py-2 px-3">{student.name}</td>
                      <td className="py-2 px-3">{student.rollNo}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="text-center py-3 text-gray-400">
                      No students assigned yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Line Chart */}
        <div className="md:w-2/3 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-white mb-3">
            Rank Progression Over Time
          </h2>
          <div className="bg-zinc-800 p-5 rounded-lg shadow-lg border-2 border-green-400">
            {rankData.length > 0 ? (
              <LineChart width={500} height={300} data={rankData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="white" />
                <YAxis stroke="white" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#222", color: "white" }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#00C49F"
                  strokeWidth={3}
                  dot={{ r: 6 }}
                />
              </LineChart>
            ) : (
              <p className="text-gray-400 text-center">
                No rank data available.
              </p>
            )}
          </div>

          <button
            onClick={() => navigate("/StudentList")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg mt-4 transition"
          >
            View More Students
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
