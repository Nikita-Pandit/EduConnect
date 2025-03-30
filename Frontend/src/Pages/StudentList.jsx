// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const StudentList = () => {
//   const teacherID = localStorage.getItem("teacherId");
//   const [studentIdContainer, setStudentIdContainer] = useState({});
//   const [studentDetailsContainer, setStudentDetailsContainer] = useState([]);
//   const [checkedStudents, setCheckedStudents] = useState({});
//   const [supervisedStudents, setSupervisedStudents] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchStudentRank = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3002/api/teacher/rank/${teacherID}`
//         );
//         setStudentIdContainer(response.data.rank);
//       } catch (error) {
//         console.error("Error fetching rank statistics:", error);
//       }
//     };

//     const fetchSupervisedStudents = async () => {
//       try {
//         // Get from localStorage first
//         const storedStudents = localStorage.getItem(
//           `supervisedStudents_${teacherID}`
//         );
//         const storedChecked = localStorage.getItem(
//           `checkedStudents_${teacherID}`
//         );

//         if (storedStudents && storedChecked) {
//           setSupervisedStudents(JSON.parse(storedStudents));
//           setCheckedStudents(JSON.parse(storedChecked));
//           return;
//         }

//         // Fallback to API if not in localStorage
//         const response = await axios.get(
//           `http://localhost:3002/api/supervisedstudents/${teacherID}`
//         );
//         const students = response.data.students || [];

//         const initialCheckedState = {};
//         students.forEach((student) => {
//           initialCheckedState[student.rollNo] = true;
//         });

//         setSupervisedStudents(students);
//         setCheckedStudents(initialCheckedState);

//         localStorage.setItem(
//           `supervisedStudents_${teacherID}`,
//           JSON.stringify(students)
//         );
//         localStorage.setItem(
//           `checkedStudents_${teacherID}`,
//           JSON.stringify(initialCheckedState)
//         );
//       } catch (error) {
//         console.error("Error fetching supervised students:", error);
//       }
//     };

//     fetchStudentRank();
//     fetchSupervisedStudents();
//   }, [teacherID]);

//   useEffect(() => {
//     const fetchStudentDetails = async () => {
//       const studentDetails = await Promise.all(
//         Object.entries(studentIdContainer).map(async ([id, rank]) => {
//           try {
//             const response = await axios.get(
//               `http://localhost:3002/api/student/idList/${id}`
//             );
//             const { name, roll } = response.data;
//             return { name, roll, rank ,id};
//           } catch (error) {
//             console.error(
//               `Error fetching details for student ID ${id}:`,
//               error
//             );
//             return null;
//           }
//         })
//       );

//       setStudentDetailsContainer(
//         studentDetails.filter((detail) => detail !== null)
//       );
//     };

//     if (Object.keys(studentIdContainer).length > 0) {
//       fetchStudentDetails();
//     }
//   }, [studentIdContainer]);

//   const confirmStudent = async (rollNo) => {
//     try {
//       const endpoint = checkedStudents[rollNo]
//         ? "http://localhost:3002/api/teacher/removeStudent"
//         : "http://localhost:3002/api/teacher/studentCheckbox";

//       const response = await axios.post(endpoint, { teacherID, rollNo });
//       alert(response.data.message);

//       // Update checked state
//       const newCheckedState = {
//         ...checkedStudents,
//         [rollNo]: !checkedStudents[rollNo],
//       };
//       setCheckedStudents(newCheckedState);
//       localStorage.setItem(
//         `checkedStudents_${teacherID}`,
//         JSON.stringify(newCheckedState)
//       );

//       // Update supervised students
//       let updatedStudents;
//       if (!checkedStudents[rollNo]) {
//         // Adding student
//         const studentDetails = studentDetailsContainer.find(
//           (s) => s.roll === rollNo
//         );
//         updatedStudents = [
//           ...supervisedStudents,
//           { name: studentDetails?.name || rollNo, rollNo },
//         ];
//       } else {
//         // Removing student
//         updatedStudents = supervisedStudents.filter(
//           (student) => student.rollNo !== rollNo
//         );
//       }

//       setSupervisedStudents(updatedStudents);
//       localStorage.setItem(
//         `supervisedStudents_${teacherID}`,
//         JSON.stringify(updatedStudents)
//       );
//     } catch (error) {
//       alert(
//         error.response?.data?.message || "Error updating student selection"
//       );
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Student Details</h2>
//       {studentDetailsContainer.length > 0 ? (

//         <table className="min-w-full border-collapse border border-gray-300">
//           <thead>
//             <tr>
//               <th className="p-2 border border-gray-300">Roll Number</th>
//               <th className="p-2 border border-gray-300">Name</th>
//               <th className="p-2 border border-gray-300">Rank</th>
//               <th className="p-2 border border-gray-300">Details</th>
//               <th className="p-2 border border-gray-300">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {studentDetailsContainer
//               .sort((a, b) => a.rank - b.rank)
//               .map((student, index) => (
//                 <tr key={index} className="hover:bg-zinc-800">
//                   <td className="p-2 border border-gray-300">{student.roll}</td>
//                   <td className="p-2 border border-gray-300">{student.name}</td>
//                   <td className="p-2 border border-gray-300">{student.rank}</td>
//                   <td className="p-2 border border-gray-300">
//                     <button
//                       className="ml-4 px-3 py-1 bg-blue-500 text-white rounded text-sm"
//                       onClick={() =>
//                         navigate("/ViewMoreDetails", {
//                           state: { studentID: student.id },
//                         })
//                       }
//                     >
//                       View More Details
//                     </button>
//                   </td>
//                   <td className="p-2 border border-gray-300 text-center">
//                     <input
//                       type="checkbox"
//                       checked={checkedStudents[student.roll] || false}
//                       onChange={() => confirmStudent(student.roll)}
//                     />
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No student details available.</p>
//       )}
//     </div>
//   );
// };

// export default StudentList;
// ***************************************************************************************************************************

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const StudentList = () => {
//   const teacherID = localStorage.getItem("teacherId");
//   const [studentIdContainer, setStudentIdContainer] = useState({});
//   const [studentDetailsContainer, setStudentDetailsContainer] = useState([]);
//   const [checkedStudents, setCheckedStudents] = useState({});
//   const [pendingChanges, setPendingChanges] = useState({});
//   const [supervisedStudents, setSupervisedStudents] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchStudentRank = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3002/api/teacher/rank/${teacherID}`
//         );
//         setStudentIdContainer(response.data.rank);
//       } catch (error) {
//         console.error("Error fetching rank statistics:", error);
//       }
//     };

//     const fetchSupervisedStudents = async () => {
//       try {
//         const storedStudents = localStorage.getItem(
//           `supervisedStudents_${teacherID}`
//         );
//         const storedChecked = localStorage.getItem(
//           `checkedStudents_${teacherID}`
//         );

//         if (storedStudents && storedChecked) {
//           setSupervisedStudents(JSON.parse(storedStudents));
//           setCheckedStudents(JSON.parse(storedChecked));
//           return;
//         }

//         const response = await axios.get(
//           `http://localhost:3002/api/supervisedstudents/${teacherID}`
//         );
//         const students = response.data.students || [];

//         const initialCheckedState = {};
//         students.forEach((student) => {
//           initialCheckedState[student.rollNo] = true;
//         });

//         setSupervisedStudents(students);
//         setCheckedStudents(initialCheckedState);

//         localStorage.setItem(
//           `supervisedStudents_${teacherID}`,
//           JSON.stringify(students)
//         );
//         localStorage.setItem(
//           `checkedStudents_${teacherID}`,
//           JSON.stringify(initialCheckedState)
//         );
//       } catch (error) {
//         console.error("Error fetching supervised students:", error);
//       }
//     };

//     fetchStudentRank();
//     fetchSupervisedStudents();
//   }, [teacherID]);

//   useEffect(() => {
//     const fetchStudentDetails = async () => {
//       const studentDetails = await Promise.all(
//         Object.entries(studentIdContainer).map(async ([id, rank]) => {
//           try {
//             const response = await axios.get(
//               `http://localhost:3002/api/student/idList/${id}`
//             );
//             const { name, roll } = response.data;
//             return { name, roll, rank, id };
//           } catch (error) {
//             console.error(
//               `Error fetching details for student ID ${id}:`,
//               error
//             );
//             return null;
//           }
//         })
//       );

//       setStudentDetailsContainer(
//         studentDetails.filter((detail) => detail !== null)
//       );
//     };

//     if (Object.keys(studentIdContainer).length > 0) {
//       fetchStudentDetails();
//     }
//   }, [studentIdContainer]);

//   const handleCheckboxChange = (rollNo) => {
//     setPendingChanges(prev => ({
//       ...prev,
//       [rollNo]: !checkedStudents[rollNo]
//     }));
//   };

//   const saveChanges = async () => {
//     try {
//       // Process all pending changes
//       for (const [rollNo, newCheckedState] of Object.entries(pendingChanges)) {
//         const endpoint = newCheckedState
//           ? "http://localhost:3002/api/teacher/studentCheckbox"
//           : "http://localhost:3002/api/teacher/removeStudent";

//         const response = await axios.post(endpoint, { teacherID, rollNo });

//         // Update checked state only after successful API call
//         setCheckedStudents(prev => ({
//           ...prev,
//           [rollNo]: newCheckedState
//         }));

//         // Update supervised students list
//         if (newCheckedState) {
//           const studentDetails = studentDetailsContainer.find(
//             s => s.roll === rollNo
//           );
//           setSupervisedStudents(prev => [
//             ...prev,
//             { name: studentDetails?.name || rollNo, rollNo }
//           ]);
//         } else {
//           setSupervisedStudents(prev =>
//             prev.filter(student => student.rollNo !== rollNo)
//           );
//         }
//       }

//       // Update localStorage
//       localStorage.setItem(
//         `checkedStudents_${teacherID}`,
//         JSON.stringify({
//           ...checkedStudents,
//           ...pendingChanges
//         })
//       );

//       localStorage.setItem(
//         `supervisedStudents_${teacherID}`,
//         JSON.stringify(
//           supervisedStudents
//             .filter(student => !pendingChanges[student.rollNo] || checkedStudents[student.rollNo])
//             .concat(
//               Object.entries(pendingChanges)
//                 .filter(([rollNo, checked]) => checked)
//                 .map(([rollNo]) => ({
//                   name: studentDetailsContainer.find(s => s.roll === rollNo)?.name || rollNo,
//                   rollNo
//                 }))
//         )
//       ))

//       alert("Changes saved successfully!");
//       setPendingChanges({});
//       setIsEditing(false);
//     } catch (error) {
//       alert(
//         error.response?.data?.message || "Error saving student selections"
//       );
//     }
//   };

//   const cancelChanges = () => {
//     setPendingChanges({});
//     setIsEditing(false);
//   };

//   const startEditing = () => {
//     setIsEditing(true);
//   };

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold">Student Details</h2>
//         {!isEditing ? (
//           <button
//             onClick={startEditing}
//             className="px-4 py-2 bg-blue-500 text-white rounded"
//           >
//             Edit
//           </button>
//         ) : (
//           <div>
//             <button
//               onClick={saveChanges}
//               className="px-4 py-2 bg-green-500 text-white rounded mr-2"
//             >
//               Save
//             </button>
//             <button
//               onClick={cancelChanges}
//               className="px-4 py-2 bg-red-500 text-white rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         )}
//       </div>

//       {studentDetailsContainer.length > 0 ? (
//         <table className="min-w-full border-collapse border border-gray-300">
//           <thead>
//             <tr>
//               <th className="p-2 border border-gray-300">Roll Number</th>
//               <th className="p-2 border border-gray-300">Name</th>
//               <th className="p-2 border border-gray-300">Rank</th>
//               <th className="p-2 border border-gray-300">Details</th>
//               <th className="p-2 border border-gray-300">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {studentDetailsContainer
//               .sort((a, b) => a.rank - b.rank)
//               .map((student, index) => (
//                 <tr key={index} className="hover:bg-zinc-800">
//                   <td className="p-2 border border-gray-300">{student.roll}</td>
//                   <td className="p-2 border border-gray-300">{student.name}</td>
//                   <td className="p-2 border border-gray-300">{student.rank}</td>
//                   <td className="p-2 border border-gray-300">
//                     <button
//                       className="ml-4 px-3 py-1 bg-blue-500 text-white rounded text-sm"
//                       onClick={() =>
//                         navigate("/ViewMoreDetails", {
//                           state: { studentID: student.id },
//                         })
//                       }
//                     >
//                       View More Details
//                     </button>
//                   </td>
//                   <td className="p-2 border border-gray-300 text-center">
//                     <input
//                       type="checkbox"
//                       checked={
//                         pendingChanges[student.roll] !== undefined
//                           ? pendingChanges[student.roll]
//                           : checkedStudents[student.roll] || false
//                       }
//                       onChange={() => handleCheckboxChange(student.roll)}
//                       disabled={!isEditing}
//                     />
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No student details available.</p>
//       )}
//     </div>
//   );
// };

// export default StudentList;

//nice
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const StudentList = () => {
//   const teacherID = localStorage.getItem("teacherId");
//   const [studentIdContainer, setStudentIdContainer] = useState({});
//   const [studentDetailsContainer, setStudentDetailsContainer] = useState([]);
//   const [checkedStudents, setCheckedStudents] = useState({});
//   const [pendingChanges, setPendingChanges] = useState({});
//   const [isEditing, setIsEditing] = useState(false);
//   const navigate = useNavigate();

//   // Fetch all necessary data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch student ranks
//         const rankResponse = await axios.get(
//           `http://localhost:3002/api/teacher/rank/${teacherID}`
//         );
//         setStudentIdContainer(rankResponse.data.rank);

//         // Fetch supervised students
//         const supervisedResponse = await axios.get(
//           `http://localhost:3002/api/supervisedstudents/${teacherID}`
//         );
//         const students = supervisedResponse.data.students || [];

//         // Create checked state
//         const initialCheckedState = {};
//         students.forEach(student => {
//           initialCheckedState[student.rollNo] = true;
//         });

//         setCheckedStudents(initialCheckedState);
//         localStorage.setItem(
//           `checkedStudents_${teacherID}`,
//           JSON.stringify(initialCheckedState)
//         );
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [teacherID]);

//   // Fetch student details when student IDs are available
//   useEffect(() => {
//     const fetchStudentDetails = async () => {
//       const details = await Promise.all(
//         Object.entries(studentIdContainer).map(async ([id, rank]) => {
//           try {
//             const response = await axios.get(
//               `http://localhost:3002/api/student/idList/${id}`
//             );
//             return { ...response.data, rank, id };
//           } catch (error) {
//             console.error(`Error fetching student ${id}:`, error);
//             return null;
//           }
//         })
//       );
//       setStudentDetailsContainer(details.filter(Boolean));
//     };

//     if (Object.keys(studentIdContainer).length > 0) {
//       fetchStudentDetails();
//     }
//   }, [studentIdContainer]);

//   const handleCheckboxChange = (rollNo) => {
//     setPendingChanges(prev => ({
//       ...prev,
//       [rollNo]: !(pendingChanges[rollNo] ?? checkedStudents[rollNo])
//     }));
//   };

//   const saveChanges = async () => {
//     try {
//       const updatedChecked = { ...checkedStudents, ...pendingChanges };
//       const updatedStudents = studentDetailsContainer
//         .filter(student => updatedChecked[student.roll])
//         .map(({ name, roll }) => ({ name, rollNo: roll }));

//       // Update API
//       await axios.post(
//         `http://localhost:3002/api/teacher/updateSupervisedStudents`,
//         { teacherID, students: updatedStudents }
//       );

//       // Update local state
//       setCheckedStudents(updatedChecked);
//       localStorage.setItem(
//         `checkedStudents_${teacherID}`,
//         JSON.stringify(updatedChecked)
//       );
//       localStorage.setItem(
//         `supervisedStudents_${teacherID}`,
//         JSON.stringify(updatedStudents)
//       );

//       // Broadcast storage event to sync other tabs
//       window.dispatchEvent(new Event('storage'));

//       alert("Changes saved successfully!");
//       setPendingChanges({});
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Save error:", error);
//       alert("Failed to save changes. Please try again.");
//     }
//   };

//   const cancelChanges = () => {
//     setPendingChanges({});
//     setIsEditing(false);
//   };

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold">Student Details</h2>
//         {!isEditing ? (
//           <button
//             onClick={() => setIsEditing(true)}
//             className="px-4 py-2 bg-blue-500 text-white rounded"
//           >
//             Edit
//           </button>
//         ) : (
//           <div>
//             <button
//               onClick={saveChanges}
//               className="px-4 py-2 bg-green-500 text-white rounded mr-2"
//             >
//               Save
//             </button>
//             <button
//               onClick={cancelChanges}
//               className="px-4 py-2 bg-red-500 text-white rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         )}
//       </div>

//       <table className="min-w-full border-collapse border border-gray-300">
//         <thead>
//           <tr>
//             <th className="p-2 border border-gray-300">Roll Number</th>
//             <th className="p-2 border border-gray-300">Name</th>
//             <th className="p-2 border border-gray-300">Rank</th>
//             <th className="p-2 border border-gray-300">Details</th>
//             <th className="p-2 border border-gray-300">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {studentDetailsContainer
//             .sort((a, b) => a.rank - b.rank)
//             .map((student) => (
//               <tr key={student.roll} className="hover:bg-zinc-800">
//                 <td className="p-2 border border-gray-300">{student.roll}</td>
//                 <td className="p-2 border border-gray-300">{student.name}</td>
//                 <td className="p-2 border border-gray-300">{student.rank}</td>
//                 <td className="p-2 border border-gray-300">
//                   <button
//                     className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
//                     onClick={() => navigate("/ViewMoreDetails", { state: { studentID: student.id } })}
//                   >
//                     View More
//                   </button>
//                 </td>
//                 <td className="p-2 border border-gray-300 text-center">
//                   <input
//                     type="checkbox"
//                     checked={pendingChanges[student.roll] ?? checkedStudents[student.roll] ?? false}
//                     onChange={() => handleCheckboxChange(student.roll)}
//                     disabled={!isEditing}
//                   />
//                 </td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default StudentList;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const StudentList = () => {
//   const teacherID = localStorage.getItem("teacherId");
//   const [studentIdContainer, setStudentIdContainer] = useState({});
//   const [studentDetailsContainer, setStudentDetailsContainer] = useState([]);
//   const [checkedStudents, setCheckedStudents] = useState({});
//   const [pendingChanges, setPendingChanges] = useState({});
//   const [isEditing, setIsEditing] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const navigate = useNavigate();

//   // Fetch all necessary data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch student ranks
//         const rankResponse = await axios.get(
//           `http://localhost:3002/api/teacher/rank/${teacherID}`
//         );
//         setStudentIdContainer(rankResponse.data.rank);

//         // Fetch supervised students
//         const supervisedResponse = await axios.get(
//           `http://localhost:3002/api/supervisedstudents/${teacherID}`
//         );
//         const students = supervisedResponse.data.students || [];

//         // Create checked state
//         const initialCheckedState = {};
//         students.forEach(student => {
//           initialCheckedState[student.rollNo] = true;
//         });

//         setCheckedStudents(initialCheckedState);
//         localStorage.setItem(
//           `checkedStudents_${teacherID}`,
//           JSON.stringify(initialCheckedState)
//         );
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [teacherID]);

//   // Fetch student details when student IDs are available
//   useEffect(() => {
//     const fetchStudentDetails = async () => {
//       const details = await Promise.all(
//         Object.entries(studentIdContainer).map(async ([id, rank]) => {
//           try {
//             const response = await axios.get(
//               `http://localhost:3002/api/student/idList/${id}`
//             );
//             return { ...response.data, rank, id };
//           } catch (error) {
//             console.error(`Error fetching student ${id}:`, error);
//             return null;
//           }
//         })
//       );
//       setStudentDetailsContainer(details.filter(Boolean));
//     };

//     if (Object.keys(studentIdContainer).length > 0) {
//       fetchStudentDetails();
//     }
//   }, [studentIdContainer]);

//   const handleCheckboxChange = (rollNo) => {
//     setPendingChanges(prev => ({
//       ...prev,
//       [rollNo]: !(pendingChanges[rollNo] ?? checkedStudents[rollNo])
//     }));
//   };

//   const saveChanges = async () => {
//     try {
//       setIsSaving(true);
//       const updatedChecked = { ...checkedStudents, ...pendingChanges };
//       const updatedStudents = studentDetailsContainer
//         .filter(student => updatedChecked[student.roll])
//         .map(({ name, roll }) => ({ name, rollNo: roll }));

//       // Update API
//       const response = await axios.post(
//         `http://localhost:3002/api/teacher/updateSupervisedStudents`,
//         { teacherID, students: updatedStudents }
//       );

//       if (!response.data.success) {
//         throw new Error("Failed to update students");
//       }

//       // Update local state
//       setCheckedStudents(updatedChecked);
//       localStorage.setItem(
//         `checkedStudents_${teacherID}`,
//         JSON.stringify(updatedChecked)
//       );
//       localStorage.setItem(
//         `supervisedStudents_${teacherID}`,
//         JSON.stringify(updatedStudents)
//       );

//       // Broadcast changes to other components
//       window.dispatchEvent(new CustomEvent('supervisedStudentsChanged', {
//         detail: { teacherID }
//       }));

//       alert("Changes saved successfully!");
//       setPendingChanges({});
//       setIsEditing(false);

//       // Redirect to dashboard
//       navigate("/TeacherDashboard", { state: { refreshed: true } });
//     } catch (error) {
//       console.error("Save error:", error);
//       alert("Failed to save changes. Please try again.");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const cancelChanges = () => {
//     setPendingChanges({});
//     setIsEditing(false);
//   };

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold">Student Details</h2>
//         {!isEditing ? (
//           <button
//             onClick={() => setIsEditing(true)}
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//           >
//             Edit
//           </button>
//         ) : (
//           <div>
//             <button
//               onClick={saveChanges}
//               className="px-4 py-2 bg-green-500 text-white rounded mr-2 hover:bg-green-600 transition"
//               disabled={isSaving}
//             >
//               {isSaving ? 'Saving...' : 'Save'}
//             </button>
//             <button
//               onClick={cancelChanges}
//               className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
//               disabled={isSaving}
//             >
//               Cancel
//             </button>
//           </div>
//         )}
//       </div>

//       {studentDetailsContainer.length > 0 ? (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-zinc-700 text-white">
//                 <th className="p-2 border border-gray-300">Roll Number</th>
//                 <th className="p-2 border border-gray-300">Name</th>
//                 <th className="p-2 border border-gray-300">Rank</th>
//                 <th className="p-2 border border-gray-300">Details</th>
//                 <th className="p-2 border border-gray-300">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {studentDetailsContainer
//                 .sort((a, b) => a.rank - b.rank)
//                 .map((student) => (
//                   <tr key={student.roll} className="hover:bg-zinc-800 text-white">
//                     <td className="p-2 border border-gray-300">{student.roll}</td>
//                     <td className="p-2 border border-gray-300">{student.name}</td>
//                     <td className="p-2 border border-gray-300">{student.rank}</td>
//                     <td className="p-2 border border-gray-300">
//                       <button
//                         className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition"
//                         onClick={() => navigate("/ViewMoreDetails", {
//                           state: { studentID: student.id }
//                         })}
//                       >
//                         View More
//                       </button>
//                     </td>
//                     <td className="p-2 border border-gray-300 text-center">
//                       <input
//                         type="checkbox"
//                         checked={pendingChanges[student.roll] ?? checkedStudents[student.roll] ?? false}
//                         onChange={() => handleCheckboxChange(student.roll)}
//                         disabled={!isEditing || isSaving}
//                         className="w-4 h-4"
//                       />
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p className="text-white">No student details available.</p>
//       )}
//     </div>
//   );
// };

// export default StudentList;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentList = () => {
  const teacherID = localStorage.getItem("teacherId");
  const [studentIdContainer, setStudentIdContainer] = useState({});
  const [studentDetailsContainer, setStudentDetailsContainer] = useState([]);
  const [checkedStudents, setCheckedStudents] = useState({});
  const [pendingChanges, setPendingChanges] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [supervisedStudents, setSupervisedStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentRank = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/api/teacher/rank/${teacherID}`
        );
        setStudentIdContainer(response.data.rank);
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

        const initialCheckedState = {};
        students.forEach((student) => {
          initialCheckedState[student.rollNo] = true;
        });

        setSupervisedStudents(students);
        setCheckedStudents(initialCheckedState);
      } catch (error) {
        console.error("Error fetching supervised students:", error);
      }
    };

    fetchStudentRank();
    fetchSupervisedStudents();
  }, [teacherID]);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      const studentDetails = await Promise.all(
        Object.entries(studentIdContainer).map(async ([id, rank]) => {
          try {
            const response = await axios.get(
              `http://localhost:3002/api/student/idList/${id}`
            );
            const { name, roll } = response.data;
            return { name, roll, rank, id };
          } catch (error) {
            console.error(
              `Error fetching details for student ID ${id}:`,
              error
            );
            return null;
          }
        })
      );

      setStudentDetailsContainer(
        studentDetails.filter((detail) => detail !== null)
      );
    };

    if (Object.keys(studentIdContainer).length > 0) {
      fetchStudentDetails();
    }
  }, [studentIdContainer]);

  const handleCheckboxChange = (rollNo) => {
    if (!isEditMode) return;

    setPendingChanges((prev) => ({
      ...prev,
      [rollNo]: !checkedStudents[rollNo],
    }));
  };

  const handleSaveChanges = async () => {
    try {
      // Process additions
      const additions = Object.entries(pendingChanges)
        .filter(([rollNo, isChecked]) => isChecked && !checkedStudents[rollNo])
        .map(([rollNo]) => rollNo);

      // Process removals
      const removals = Object.entries(pendingChanges)
        .filter(([rollNo, isChecked]) => !isChecked && checkedStudents[rollNo])
        .map(([rollNo]) => rollNo);

      // Send additions to server
      await Promise.all(
        additions.map(async (rollNo) => {
          await axios.post("http://localhost:3002/api/studentCheckbox", {
            teacherID,
            rollNo,
          });
        })
      );

      // Send removals to server
      await Promise.all(
        removals.map(async (rollNo) => {
          await axios.post("http://localhost:3002/api/teacher/removeStudent", {
            teacherID,
            rollNo,
          });
        })
      );

      // Update local state
      const newCheckedState = { ...checkedStudents, ...pendingChanges };
      setCheckedStudents(newCheckedState);
      setPendingChanges({});
      setIsEditMode(false);

      // Refresh supervised students list
      const response = await axios.get(
        `http://localhost:3002/api/supervisedstudents/${teacherID}`
      );
      setSupervisedStudents(response.data.students || []);
    } catch (error) {
      console.error("Error saving changes:", error);
      // alert("Error saving changes. Please try again.");
    }
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setPendingChanges({});
    setIsEditMode(false);
  };

  return (
    <div className="p-4 bg-zinc-900 min-h-screen text-white">
      <h2 className="text-xl font-bold mb-4">Student Details</h2>
      {studentDetailsContainer.length > 0 ? (
        <>
          <table className="min-w-full border-collapse border border-gray-600">
            <thead>
              <tr className="bg-zinc-800">
                <th className="p-2 border border-gray-600">Roll Number</th>
                <th className="p-2 border border-gray-600">Name</th>
                <th className="p-2 border border-gray-600">Rank</th>
                <th className="p-2 border border-gray-600">Details</th>
                <th className="p-2 border border-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {studentDetailsContainer
                .sort((a, b) => a.rank - b.rank)
                .map((student, index) => (
                  <tr key={index} className="hover:bg-zinc-800">
                    <td className="p-2 border border-gray-600">
                      {student.roll}
                    </td>
                    <td className="p-2 border border-gray-600">
                      {student.name}
                    </td>
                    <td className="p-2 border border-gray-600">
                      {student.rank}
                    </td>
                    <td className="p-2 border border-gray-600">
                      <button
                        className="ml-4 px-3 py-1 bg-blue-500 text-white rounded text-sm"
                        onClick={() =>
                          navigate("/ViewMoreDetails", {
                            state: { studentID: student.id },
                          })
                        }
                      >
                        View More Details
                      </button>
                    </td>
                    <td className="p-2 border border-gray-600 text-center">
                      <input
                        type="checkbox"
                        checked={
                          pendingChanges[student.roll] !== undefined
                            ? pendingChanges[student.roll]
                            : checkedStudents[student.roll] || false
                        }
                        onChange={() => handleCheckboxChange(student.roll)}
                        disabled={!isEditMode}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="mt-4 flex gap-4">
            {!isEditMode ? (
              <button
                onClick={handleEdit}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  onClick={handleSaveChanges}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </>
      ) : (
        <p>No student details available.</p>
      )}
    </div>
  );
};

export default StudentList;
