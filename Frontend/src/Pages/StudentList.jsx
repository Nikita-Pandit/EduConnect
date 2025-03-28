import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const StudentList = () => {
  const teacherID = localStorage.getItem("teacherId");
  const [studentIdContainer, setStudentIdContainer] = useState({});
  const [studentDetailsContainer, setStudentDetailsContainer] = useState([]);
  const [checkedStudents, setCheckedStudents] = useState({});
  const [supervisedStudents, setSupervisedStudents] = useState([]);
  const [initialCheckedState] = useState({});

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
        setSupervisedStudents(response.data.students);

        // Initialize checkbox state
        const initialCheckedState = {};
        response.data.students.forEach((student) => {
          initialCheckedState[student.rollNo] = true;
        });

        setCheckedStudents(initialCheckedState);

        // ✅ Only one call to `handleCheckedStudentsChange`
        handleCheckedStudentsChange(initialCheckedState);
      } catch (error) {
        console.error("Error fetching supervised students:", error);
      }
    };

    fetchStudentRank();
    fetchSupervisedStudents();
  }, [teacherID]); // ✅ No unnecessary nested function calls
  // ✅ No unnecessary re-renders

  useEffect(() => {
    console.log("Updated checkedStudents list:", checkedStudents);
  }, [checkedStudents]); // This runs whenever checkedStudents changes

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

  useEffect(() => {
    console.log("Updated studentdetailscontainer :", studentDetailsContainer);
  }, [studentDetailsContainer]);

  const confirmStudent = async (rollNo) => {
    try {
      const endpoint = checkedStudents[rollNo]
        ? "http://localhost:3002/api/teacher/removeStudent"
        : "http://localhost:3002/api/teacher/studentCheckbox";

      const response = await axios.post(endpoint, { teacherID, rollNo });

      alert(response.data.message);

      setCheckedStudents((prevState) => ({
        ...prevState,
        [rollNo]: !prevState[rollNo],
      }));

      setSupervisedStudents((prevStudents) => {
        let updatedStudents;
        if (!checkedStudents[rollNo]) {
          updatedStudents = [
            ...prevStudents,
            { name: response.data.student.name, rollNo },
          ];
        } else {
          updatedStudents = prevStudents.filter(
            (student) => student.rollNo !== rollNo
          );
        }
        return updatedStudents;
      });
    } catch (error) {
      alert(
        error.response?.data?.message || "Error updating student selection"
      );
    }
  };

  useEffect(() => {
    console.log("remove student", checkedStudents);
  }, [checkedStudents]);

  // useEffect(()=>{
  // console.log("")
  // },[supervisedStudents])

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
