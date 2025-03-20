// import React, { useEffect, useState } from "react";
// import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// const StudentList = () => {
//   // const navigate = useNavigate();
//   const teacherID = localStorage.getItem("teacherId");
//   const [studentIdContainer, setStudentIdContainer] = useState([]);
//   const [studentDetailsContainer, setStudentDetailsContainer] = useState([{}]);
//   useEffect(() => {
//     const fetchStudentRank = async () => {
//       try {
//         // console.log("id of the teacher", teacherID);
//         const response = await axios.get(
//           `http://localhost:3002/api/teacher/rank/${teacherID}`
//         );
//         const { rank } = response.data;
//         setStudentIdContainer(rank);
//         console.log(rank);
//       } catch (error) {
//         console.error("Error fetching rank statistics:", error);
//       }
//     };

//     fetchStudentRank();
//   }, [teacherID]);
//   const handleRank = async (id, rank) => {
//     // console.log(`Student ID: ${id}, Rank: ${rank}`);
//     const response = await axios.get(
//       `http://localhost:3002/api/student/idList/${id}`
//     );
//     // console.log("response.data is ", response.data);
//     // console.log("response.data.name", response.data.name);
//     const { name, roll } = response.data;
//     // console.log("name of the student is", name);
//     // console.log("roll of the student is", roll);
//     setStudentDetailsContainer({
//         name:name,
//         roll:roll,
//         rank:rank
//     });
//   };
//   return (
//     <div>
//       {Object.entries(studentIdContainer).map(([id, rank]) => {
//         handleRank(id, rank);
//       })}
//     </div>
//   );
// };

// export default StudentList;
import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentList = () => {
  const teacherID = localStorage.getItem("teacherId");
  const [studentIdContainer, setStudentIdContainer] = useState({});
  const [studentDetailsContainer, setStudentDetailsContainer] = useState([]);
    const [checkedStudents, setCheckedStudents] = useState({});
      const [supervisedStudents, setSupervisedStudents] = useState([]);

  useEffect(() => {
    const fetchStudentRank = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/api/teacher/rank/${teacherID}`
        );
        const { rank } = response.data;
        console.log("printing rank", rank);
        setStudentIdContainer(rank);
      } catch (error) {
        console.error("Error fetching rank statistics:", error);
      }
    };

    fetchStudentRank();
  }, [teacherID]);
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

  useEffect(() => {
    const fetchStudentDetails = async () => {
      const studentDetails = await Promise.all(
        Object.entries(studentIdContainer).map(async ([id, rank]) => {
          try {
            const response = await axios.get(
              `http://localhost:3002/api/student/idList/${id}`
            );
            const { name, roll } = response.data;
            return { name, roll, rank };
          } catch (error) {
            console.error(
              `Error fetching details for student ID ${id}:`,
              error
            );
            return null;
          }
        })
      );
      console.log("details of the students", studentDetails);
      setStudentDetailsContainer(
        studentDetails.filter((detail) => detail !== null)
      );
    };

    fetchStudentDetails();
  }, [studentIdContainer]);
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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Student Details</h2>
      {studentDetailsContainer.length > 0 ? (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="">
              <th className="p-2 border border-gray-300 ">Roll Number</th>
              <th className="p-2 border border-gray-300">Name</th>
              <th className="p-2 border border-gray-300">Rank</th>
              <th className="p-2 border border-gray-300">Select</th>
            </tr>
          </thead>
          <tbody>
            {studentDetailsContainer
              .sort((a, b) => a.rank - b.rank)
              .map((student, index) => (
                <tr key={index} className="hover:bg-zinc-800">
                  <td className="p-2 border border-gray-300">{student.roll}</td>
                  <td className="p-2 border border-gray-300">{student.name}</td>
                  <td className="p-2 border border-gray-300">{student.rank}</td>
                  <td className="p-2 border border-gray-300 text-center">
                    <input type="checkbox"
                       checked={checkedStudents[rollNo] || false}
                    onClick={() => confirmStudent(student.roll)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <p>No student details available.</p>
      )}
    </div>
  );
};

export default StudentList;
