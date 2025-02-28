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
//   const [checkedStudents, setCheckedStudents] = useState({}); // State to track checked students

//   // Colors for pie chart divisions
//   const COLORS = [
//     "#FF5733", "#FFC300", "#DAF7A6", "#33FF57", "#33FFF3",
//     "#3375FF", "#8333FF", "#FF33F6", "#FF3366", "#FF6E33"
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
//         console.log("Ranked details:",rankDetails);
//       } catch (error) {
//         console.error("Error fetching rank statistics:", error);
//       }
//     };

//     fetchRankData();
//   }, [teacherID]);

//   const confirmStudent = async (studentID) => {
//     try {
//       const response = await axios.post(
//         `http://localhost:3002/api/teacher/studentCheckbox`,
//         { teacherID, studentID }
//       );

//       alert(response.data.message);

//       // Update the checked state for the student
//       setCheckedStudents(prevState => ({
//         ...prevState,
//         [studentID]: !prevState[studentID] // Toggle the checkbox state
//       }));

//     } catch (error) {
//       alert(error.response?.data?.message || "Error selecting student");
//     }
//   };

//   return (
//     <div className="p-5 bg-zinc-1000">
//       <h1 className="text-2xl font-bold mb-5">Teacher Dashboard</h1>

//       <div className="flex flex-col items-center">
//         <PieChart width={400} height={400}>
//           <Pie
//             data={rankData}
//             cx={200}
//             cy={200}
//             outerRadius={150}
//             fill="#8884d8"
//             dataKey="value"
//             onMouseEnter={(data, index) => setHoveredRank(index + 1)}
//           >
//             {rankData.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index]} />
//             ))}
//           </Pie>
//           <Tooltip
//             contentStyle={{
//               backgroundColor: "#333",
//               border: "1px solid #555",
//               borderRadius: "8px",
//               color: "white",
//             }}
//             labelStyle={{ color: "yellow", fontWeight: "bold" }}
//           />
//         </PieChart>

//         {hoveredRank && (
//           <div className="p-4 bg-white shadow-md rounded-lg mt-4">
//             <h2 className="text-lg font-bold text-black">
//               Students Who Gave Rank {hoveredRank}:
//             </h2>
//             <ul className="list-disc pl-5 text-black">
//               {rankDetails[hoveredRank]?.map((studentID, idx) => (
//                 <li key={idx} className="text-black flex items-center justify-between">
//                   {studentID}
//                   <button
//                     className="ml-4 px-3 py-1 bg-blue-500 text-white rounded text-sm"
//                     onClick={() => navigate("/ViewMoreDetails", { state: { studentID } })}
//                   >
//                     View More Details
//                   </button>
//                   <input
//                     type="checkbox"
//                     checked={checkedStudents[studentID] || false}
//                     onChange={() => confirmStudent(studentID)}
//                   />
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
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
//   const [checkedStudents, setCheckedStudents] = useState({}); // State to track checked students
//   //const [studentRollNumbers, setStudentRollNumbers] = useState({}); // State to store roll numbers

//   // Colors for pie chart divisions
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

//         // Fetch roll numbers for all students
//         const rollNumbers = {};
//         console.log("rank details: ",rankDetails);

//         for (const rank in rankDetails) {
//           console.log("rank: ",rank);
//           for (const studentID of rankDetails[rank]) {
//             const rollNumberResponse = await axios.get(
//               `http://localhost:3002/api/student/${studentID}/rollNumber`
//             );
//             rollNumbers[studentID] = rollNumberResponse.data.rollNumber;
//           }0
//         }
//         setStudentRollNumbers(rollNumbers);
//       } catch (error) {
//         console.error("Error fetching rank statistics:", error);
//       }
//     };

//     fetchRankData();
//   }, [teacherID]);

//   const confirmStudent = async (studentID) => {
//     try {
//       const response = await axios.post(
//         `http://localhost:3002/api/teacher/studentCheckbox`,
//         { teacherID, studentID }
//       );

//       alert(response.data.message);

//       // Update the checked state for the student
//       setCheckedStudents((prevState) => ({
//         ...prevState,
//         [studentID]: !prevState[studentID], // Toggle the checkbox state
//       }));
//     } catch (error) {
//       alert(error.response?.data?.message || "Error selecting student");
//     }
//   };

//   return (
//     <div className="p-5 bg-zinc-1000">
//       <h1 className="text-2xl font-bold mb-5">Teacher Dashboard</h1>

//       <div className="flex flex-col items-center">
//         <PieChart width={400} height={400}>
//           <Pie
//             data={rankData}
//             cx={200}
//             cy={200}
//             outerRadius={150}
//             fill="#8884d8"
//             dataKey="value"
//             onMouseEnter={(data, index) => setHoveredRank(index + 1)}
//           >
//             {rankData.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index]} />
//             ))}
//           </Pie>
//           <Tooltip
//             contentStyle={{
//               backgroundColor: "#333",
//               border: "1px solid #555",
//               borderRadius: "8px",
//               color: "white",
//             }}
//             labelStyle={{ color: "yellow", fontWeight: "bold" }}
//           />
//         </PieChart>

//         {hoveredRank && (
//           <div className="p-4 bg-white shadow-md rounded-lg mt-4">
//             <h2 className="text-lg font-bold text-black">
//               Students Who Gave Rank {hoveredRank}:
//             </h2>
//             <ul className="list-disc pl-5 text-black">
//               {rankDetails[hoveredRank]?.map((studentID, idx) => (
//                 <li
//                   key={idx}
//                   className="text-black flex items-center justify-between"
//                 >
//                   {/* Display rollNumber and rank */}
//                   Roll Number: {studentRollNumbers[studentID]}, Rank:{" "}
//                   {hoveredRank}
//                   <button
//                     className="ml-4 px-3 py-1 bg-blue-500 text-white rounded text-sm"
//                     onClick={() =>
//                       navigate("/ViewMoreDetails", { state: { studentID } })
//                     }
//                   >
//                     View More Details
//                   </button>
//                   <input
//                     type="checkbox"
//                     checked={checkedStudents[studentID] || false}
//                     onChange={() => confirmStudent(studentID)}
//                   />
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
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
//   const [checkedStudents, setCheckedStudents] = useState({}); // State to track checked students
//   const [supervisedStudents, setSupervisedStudents] = useState([]); // State to track students under supervision

//   // Colors for pie chart divisions
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
//         console.log("Ranked details:", rankDetails);
//       } catch (error) {
//         console.error("Error fetching rank statistics:", error);
//       }
//     };

//     fetchRankData();
//   }, [teacherID]);

//   const confirmStudent = async (rollNo) => {
//     try {
//       const response = await axios.post(
//         `http://localhost:3002/api/teacher/studentCheckbox`,
//         { teacherID, rollNo }
//       );
//        console.log(response.data.student)
//       alert(response.data.message);

//       // Update the checked state for the student
//       setCheckedStudents((prevState) => ({
//         ...prevState,
//         [rollNo]: !prevState[rollNo], // Toggle the checkbox state
//       }));

//       // Update the supervised students list
//       if (!checkedStudents[rollNo]) {
//         setSupervisedStudents((prevStudents) => [...prevStudents, rollNo]);
//       } else {
//         setSupervisedStudents((prevStudents) =>
//           prevStudents.filter((id) => id !== rollNo)
//         );
//       }
//     } catch (error) {
//       alert(error.response?.data?.message || "Error selecting student");
//     }
//   };

//   return (
//     <div className="p-5 bg-zinc-1000">
//       <h1 className="text-2xl font-bold mb-5">Teacher Dashboard</h1>

//       <div className="flex">
//         {/* Left side: Students under supervision table */}
//         <div className="w-1/3 p-4 bg-zinc-800 shadow-md rounded-lg border-2 border-blue-300">
//           <h2 className="text-lg font-bold text-white  mb-4">
//             Students under your supervision
//           </h2>
//           <table className="w-full">
//             <thead>
//               <tr>
//                 <th className="text-left">Name</th>

//                 <th className="text-left">Roll Number</th>
//               </tr>
//             </thead>
//             <tbody>
//               {supervisedStudents.map((rollNo, index) => (
//                 <tr key={index}>
//                   <td>{name}</td>
//                   <td>{rollNo}</td>
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

//           {hoveredRank && (
//             <div className="p-4 bg-white shadow-md rounded-lg mt-4">
//               <h2 className="text-lg font-bold text-black">
//                 Students Who Gave Rank {hoveredRank}:
//               </h2>
//               <ul className="list-disc pl-5 text-black">
//                 {rankDetails[hoveredRank]?.map((rollNo, idx) => (
//                   <li
//                     key={idx}
//                     className="text-black flex items-center justify-between"
//                   >
//                     {rollNo}
//                     <button
//                       className="ml-4 px-3 py-1 bg-blue-500 text-white rounded text-sm"
//                       onClick={() =>
//                         navigate("/ViewMoreDetails", { state: { rollNo } })
//                       }
//                     >
//                       View More Details
//                     </button>
//                     <input
//                       type="checkbox"
//                       checked={checkedStudents[rollNo] || false}
//                       onChange={() => confirmStudent(rollNo)}
//                     />
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
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
//   const [checkedStudents, setCheckedStudents] = useState({}); // State to track checked students
//   const [supervisedStudents, setSupervisedStudents] = useState([]); // State to track students under supervision

//   // Colors for pie chart divisions
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
//         console.log("Ranked details:", rankDetails);
//       } catch (error) {
//         console.error("Error fetching rank statistics:", error);
//       }
//     };

//     fetchRankData();
//   }, [teacherID]);

//   const confirmStudent = async (rollNo) => {
//     try {
//       const response = await axios.post(
//         `http://localhost:3002/api/teacher/studentCheckbox`,
//         { teacherID, rollNo }
//       );
//       console.log(response.data.student);

//       alert(response.data.message);

//       // Extract name and rollNo from response.data.student
//       const { name, rollNo: studentRollNo } = response.data.student;

//       // Update the checked state for the student
//       setCheckedStudents((prevState) => ({
//         ...prevState,
//         [studentRollNo]: !prevState[studentRollNo], // Toggle the checkbox state
//       }));

//       // Update the supervised students list
//       if (!checkedStudents[studentRollNo]) {
//         setSupervisedStudents((prevStudents) => [
//           ...prevStudents,
//           { name, rollNo: studentRollNo }, // Store both name and rollNo
//         ]);
//       } else {
//         setSupervisedStudents((prevStudents) =>
//           prevStudents.filter((student) => student.rollNo !== studentRollNo)
//         );
//       }
//     } catch (error) {
//       alert(error.response?.data?.message || "Error selecting student");
//     }
//   };

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
//               <tr>
//                 <th className="text-left text-white">Name</th>
//                 <th className="text-left text-white">Roll Number</th>
//               </tr>
//             </thead>
//             <tbody>
//               {supervisedStudents.map((student, index) => (
//                 <tr key={index} className="text-white">
//                   <td>{student.name}</td> {/* Display student name */}
//                   <td>{student.rollNo}</td> {/* Display student roll number */}
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

//           {hoveredRank && (
//             <div className="p-4 bg-white shadow-md rounded-lg mt-4">
//               <h2 className="text-lg font-bold text-black">
//                 Students Who Gave Rank {hoveredRank}:
//               </h2>
//               <ul className="list-disc pl-5 text-black">
//                 {rankDetails[hoveredRank]?.map((rollNo, idx) => (
//                   <li
//                     key={idx}
//                     className="text-black flex items-center justify-between"
//                   >
//                     {rollNo}
//                     <button
//                       className="ml-4 px-3 py-1 bg-blue-500 text-white rounded text-sm"
//                       onClick={() =>
//                         navigate("/ViewMoreDetails", { state: { rollNo } })
//                       }
//                     >
//                       View More Details
//                     </button>
//                     <input
//                       type="checkbox"
//                       checked={checkedStudents[rollNo] || false}
//                       onChange={() => confirmStudent(rollNo)}
//                     />
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
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
//   const [checkedStudents, setCheckedStudents] = useState({}); // State to track checked students
//   const [supervisedStudents, setSupervisedStudents] = useState([]); // State to track students under supervision

//   // Colors for pie chart divisions
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
//         console.log("Ranked details:", rankDetails);
//       } catch (error) {
//         console.error("Error fetching rank statistics:", error);
//       }
//     };

//     const fetchsupervisedstudents = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3002/api/supervisedstudents/${teacherID}`
//         );
//         console.log("students", response.data.students);
//          setSupervisedStudents(response.data.students);
//          //confirmStudent(response.data.students.rollNo)
//       } catch (error) {
//         console.error("Error fetching rank statistics:", error);
//       }
//     };

//     fetchRankData(),
//     fetchsupervisedstudents()
//   }, [teacherID]);
//   // useEffect(() => {
//   //   const fetchsupervisedstudents = async () => {
//   //     try {
//   //       const response = await axios.get(
//   //         `http://localhost:3002/api/supervisedstudents/${teacherID}`
//   //       );
//   //       console.log("students", response.data.students);
//   //       // setSupervisedStudents(response.data.students);
//   //     } catch (error) {
//   //       console.error("Error fetching rank statistics:", error);
//   //     }
//   //   };

//   //   fetchsupervisedstudents();
//   // }, [teacherID]);
//   const confirmStudent = async (rollNo) => {
//     try {
//       const response = await axios.post(
//         `http://localhost:3002/api/teacher/studentCheckbox`,
//         { teacherID, rollNo }
//       );
//       console.log(response.data.student);

//       alert(response.data.message);

//       // Extract name and rollNo from response.data.student
//       const { name, rollNo: studentRollNo } = response.data.student;

//       // Update the checked state for the student
//       setCheckedStudents((prevState) => ({
//         ...prevState,
//         [studentRollNo]: !prevState[studentRollNo], // Toggle the checkbox state
//       }));

//       // Update the supervised students list
//       if (!checkedStudents[studentRollNo]) {
//         setSupervisedStudents((prevStudents) => [
//           ...prevStudents,
//           { name, rollNo: studentRollNo }, // Store both name and rollNo
//         ]);
//       } else {
//         setSupervisedStudents((prevStudents) =>
//           prevStudents.filter((student) => student.rollNo !== studentRollNo)
//         );
//       }
//     } catch (error) {
//       alert(error.response?.data?.message || "Error selecting student");
//     }
//   };

//   return (
//     <div className="p-5 bg-zinc-1000">
//       <h1 className="text-2xl font-bold mb-5">Teacher Dashboard</h1>

//       <div className="flex">
//         {/* Left side: Students under supervision table */}
//         <div className="w-1/3 p-4 bg-zinc-800 shadow-md rounded-lg border-2 border-blue-300">
//           <h2 className="text-lg font-bold text-white mb-4 ">
//             Students under your supervision
//           </h2>
//           <table className="w-full">
//             <thead>
//               <tr className="border-b-2 border-gray-400 ">
//                 <th className="text-left text-white">Name</th>
//                 <th className="text-left text-white">Roll Number</th>
//               </tr>
//             </thead>
//             <tbody>
//               {supervisedStudents.map((student, index) => (
//                 <tr
//                   key={index}
//                   className="text-white border-b border-gray-600" // Add border to each row
//                 >
//                   <td className="py-2">{student.name}</td>{" "}
//                   {/* Add padding for spacing */}
//                   <td className="py-2">{student.rollNo}</td>{" "}
//                   {/* Add padding for spacing */}
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

//           {hoveredRank && (
//             <div className="p-4 bg-white shadow-md rounded-lg mt-4">
//               <h2 className="text-lg font-bold text-black">
//                 Students Who Gave Rank {hoveredRank}:
//               </h2>
//               <ul className="list-disc pl-5 text-black">
//                 {rankDetails[hoveredRank]?.map((rollNo, idx) => (
//                   <li
//                     key={idx}
//                     className="text-black flex items-center justify-between"
//                   >
//                     {rollNo}
//                     <button
//                       className="ml-4 px-3 py-1 bg-blue-500 text-white rounded text-sm"
//                       onClick={() =>
//                         navigate("/ViewMoreDetails", { state: { rollNo } })
//                       }
//                     >
//                       View More Details
//                     </button>

//                      <input
//                       type="checkbox"
//                       checked={checkedStudents[rollNo] || false}
//                       onChange={() => confirmStudent(rollNo)}
//                     />
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeacherDashboard;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const teacherID = localStorage.getItem("teacherId");
  const [rankData, setRankData] = useState([]);
  const [rankDetails, setRankDetails] = useState({});
  const [hoveredRank, setHoveredRank] = useState(null);
  const [checkedStudents, setCheckedStudents] = useState({});
  const [supervisedStudents, setSupervisedStudents] = useState([]);

  // Colors for pie chart divisions
  const COLORS = [
    "#FF5733",
    "#FFC300",
    "#DAF7A6",
    "#33FF57",
    "#33FFF3",
    "#3375FF",
    "#8333FF",
    "#FF33F6",
    "#FF3366",
    "#FF6E33",
  ];

  useEffect(() => {
    const fetchRankData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/api/teacher/rankStatistics/${teacherID}`
        );
        const { rankPercentages, rankDetails } = response.data;

        const formattedData = rankPercentages.map((percentage, index) => ({
          name: `Rank ${index + 1}`,
          value: percentage,
        }));

        setRankData(formattedData);
        setRankDetails(rankDetails);
      } catch (error) {
        console.error("Error fetching rank statistics:", error);
      }
    };

    const fetchSupervisedStudents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/api/supervisedstudents/${teacherID}`
        );
        console.log("Supervised students:", response.data.students);

        setSupervisedStudents(response.data.students);

        // ✅ **Mark all supervised students as checked**
        const initialCheckedState = {};
        response.data.students.forEach((student) => {
          initialCheckedState[student.rollNo] = true;
        });
        setCheckedStudents(initialCheckedState);
      } catch (error) {
        console.error("Error fetching supervised students:", error);
      }
    };

    fetchRankData();
    fetchSupervisedStudents();
  }, [teacherID]);

  const confirmStudent = async (rollNo) => {
    try {
      const response = await axios.post(
        `http://localhost:3002/api/teacher/studentCheckbox`,
        { teacherID, rollNo }
      );

      console.log(response.data.student);
      alert(response.data.message);

      const { name, rollNo: studentRollNo } = response.data.student;

      setCheckedStudents((prevState) => ({
        ...prevState,
        [studentRollNo]: !prevState[studentRollNo], // Toggle checkbox state
      }));

      // ✅ **Update the supervised students list accordingly**
      setSupervisedStudents((prevStudents) => {
        if (!checkedStudents[studentRollNo]) {
          return [...prevStudents, { name, rollNo: studentRollNo }];
        } else {
          return prevStudents.filter(
            (student) => student.rollNo !== studentRollNo
          );
        }
      });
    } catch (error) {
      alert(error.response?.data?.message || "Error selecting student");
    }
  };

  return (
    <div className="p-5 bg-zinc-1000">
      <h1 className="text-2xl font-bold mb-5">Teacher Dashboard</h1>

      <div className="flex">
        {/* Left side: Students under supervision table */}
        <div className="w-1/3 p-4 bg-zinc-800 shadow-md rounded-lg border-2 border-blue-300">
          <h2 className="text-lg font-bold text-white mb-4">
            Students under your supervision
          </h2>
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-400">
                <th className="text-left text-white">Name</th>
                <th className="text-left text-white">Roll Number</th>
              </tr>
            </thead>
            <tbody>
              {supervisedStudents.map((student, index) => (
                <tr key={index} className="text-white border-b border-gray-600">
                  <td className="py-2">{student.name}</td>
                  <td className="py-2">{student.rollNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right side: Pie chart and other details */}
        <div className="w-2/3 flex flex-col items-center">
          <PieChart width={400} height={400}>
            <Pie
              data={rankData}
              cx={200}
              cy={200}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={(data, index) => setHoveredRank(index + 1)}
            >
              {rankData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#333",
                border: "1px solid #555",
                borderRadius: "8px",
                color: "white",
              }}
              labelStyle={{ color: "yellow", fontWeight: "bold" }}
            />
          </PieChart>

          {hoveredRank && (
            <div className="p-4 bg-white shadow-md rounded-lg mt-4">
              <h2 className="text-lg font-bold text-black">
                Students Who Gave Rank {hoveredRank}:
              </h2>
              <ul className="list-disc pl-5 text-black">
                {rankDetails[hoveredRank]?.map((rollNo, idx) => (
                  <li
                    key={idx}
                    className="text-black flex items-center justify-between"
                  >
                    {rollNo}
                    <button
                      className="ml-4 px-3 py-1 bg-blue-500 text-white rounded text-sm"
                      onClick={() =>
                        navigate("/ViewMoreDetails", { state: { rollNo } })
                      }
                    >
                      View More Details
                    </button>

                    {/* ✅ Keep checkboxes ticked after refresh */}
                    <input
                      type="checkbox"
                      checked={checkedStudents[rollNo] || false}
                      onChange={() => confirmStudent(rollNo)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
