import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentList = () => {
  const teacherID = localStorage.getItem("teacherId");
  const [studentIdContainer, setStudentIdContainer] = useState({});
  const [studentDetailsContainer, setStudentDetailsContainer] = useState([]);
  const [checkedStudents, setCheckedStudents] = useState({});
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
        // Get from localStorage first
        const storedStudents = localStorage.getItem(
          `supervisedStudents_${teacherID}`
        );
        const storedChecked = localStorage.getItem(
          `checkedStudents_${teacherID}`
        );

        if (storedStudents && storedChecked) {
          setSupervisedStudents(JSON.parse(storedStudents));
          setCheckedStudents(JSON.parse(storedChecked));
          return;
        }

        // Fallback to API if not in localStorage
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

        localStorage.setItem(
          `supervisedStudents_${teacherID}`,
          JSON.stringify(students)
        );
        localStorage.setItem(
          `checkedStudents_${teacherID}`,
          JSON.stringify(initialCheckedState)
        );
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
            return { name, roll, rank ,id};
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

  const confirmStudent = async (rollNo) => {
    try {
      const endpoint = checkedStudents[rollNo]
        ? "http://localhost:3002/api/teacher/removeStudent"
        : "http://localhost:3002/api/teacher/studentCheckbox";

      const response = await axios.post(endpoint, { teacherID, rollNo });
      alert(response.data.message);

      // Update checked state
      const newCheckedState = {
        ...checkedStudents,
        [rollNo]: !checkedStudents[rollNo],
      };
      setCheckedStudents(newCheckedState);
      localStorage.setItem(
        `checkedStudents_${teacherID}`,
        JSON.stringify(newCheckedState)
      );

      // Update supervised students
      let updatedStudents;
      if (!checkedStudents[rollNo]) {
        // Adding student
        const studentDetails = studentDetailsContainer.find(
          (s) => s.roll === rollNo
        );
        updatedStudents = [
          ...supervisedStudents,
          { name: studentDetails?.name || rollNo, rollNo },
        ];
      } else {
        // Removing student
        updatedStudents = supervisedStudents.filter(
          (student) => student.rollNo !== rollNo
        );
      }

      setSupervisedStudents(updatedStudents);
      localStorage.setItem(
        `supervisedStudents_${teacherID}`,
        JSON.stringify(updatedStudents)
      );
    } catch (error) {
      alert(
        error.response?.data?.message || "Error updating student selection"
      );
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Student Details</h2>
      {studentDetailsContainer.length > 0 ? (
       
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="p-2 border border-gray-300">Roll Number</th>
              <th className="p-2 border border-gray-300">Name</th>
              <th className="p-2 border border-gray-300">Rank</th>
              <th className="p-2 border border-gray-300">Details</th>
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
                  <td className="p-2 border border-gray-300">
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
                  <td className="p-2 border border-gray-300 text-center">
                    <input
                      type="checkbox"
                      checked={checkedStudents[student.roll] || false}
                      onChange={() => confirmStudent(student.roll)}
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
