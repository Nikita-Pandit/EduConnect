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
    <div className="min-h-screen bg-[#091024] text-white p-6 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="p-6 bg-[#0d1126] rounded-xl shadow-2xl border-2 border-[#9B30FF] transform transition-all duration-500 hover:shadow-purple-500/30">
          <h2 className="text-2xl font-bold text-[#E1C3FF] mb-6">Student Details</h2>
          
          {studentDetailsContainer.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#0d1126] border-b-2 border-[#9B30FF]">
                      <th className="p-4 text-left text-[#E1C3FF] font-semibold w-[15%]">Roll No.</th>
                      <th className="p-4 text-left text-[#E1C3FF] font-semibold w-[25%]">Name</th>
                      <th className="p-4 text-center text-[#E1C3FF] font-semibold w-[10%]">Rank</th>
                      <th className="p-4 text-center text-[#E1C3FF] font-semibold w-[25%]">Details</th>
                      <th className="p-4 text-center text-[#E1C3FF] font-semibold w-[15%]">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentDetailsContainer
                      .sort((a, b) => a.rank - b.rank)
                      .map((student, index) => (
                        <tr 
                          key={index} 
                          className="border-b border-[#9B30FF]/30 hover:bg-[#6D0BCF]/20 transition-colors duration-300 group relative"
                        >
                          <td className="p-4 align-middle text-sm font-medium">
                            {student.roll}
                          </td>
                          <td className="p-4 align-middle">
                            <span className="text-[#E1C3FF]">{student.name}</span>
                          </td>
                          <td className="p-4 text-center align-middle">
                            <span className="inline-block bg-[#6D0BCF]/30 px-3 py-1 rounded-full text-sm font-medium">
                              {student.rank}
                            </span>
                          </td>
                          <td className="p-4 text-center align-middle">
                            <button
                              className="mx-auto px-4 py-2 bg-[#6D0BCF] hover:bg-[#46008B] text-white rounded-lg transition-all duration-300 border border-[#E1C3FF] flex items-center gap-2 hover:shadow-[0_0_15px_rgba(155,48,255,0.5)]"
                              onClick={() =>
                                navigate("/ViewMoreDetails", {
                                  state: { studentID: student.id },
                                })
                              }
                            >
                              <span>View</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </td>
                          <td className="p-4 text-center align-middle">
                            <label className="inline-flex items-center cursor-pointer">
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  checked={
                                    pendingChanges[student.roll] !== undefined
                                      ? pendingChanges[student.roll]
                                      : checkedStudents[student.roll] || false
                                  }
                                  onChange={() => handleCheckboxChange(student.roll)}
                                  disabled={!isEditMode}
                                  className="sr-only peer"
                                />
                                <div className="w-10 h-5 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#9B30FF]"></div>
                              </div>
                            </label>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
  
              <div className="flex justify-end gap-4 mt-6 pt-6 border-t border-[#9B30FF]">
                {!isEditMode ? (
                  <button
                    onClick={handleEdit}
                    className="px-6 py-3 bg-[#6D0BCF] hover:bg-[#46008B] text-white font-medium rounded-lg shadow-lg hover:shadow-purple-500/30 transition-all duration-300 border-2 border-[#E1C3FF] flex items-center gap-2 hover:scale-[1.02] transform"
                  >
                    <span>Edit Students</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSaveChanges}
                      className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-lg hover:shadow-green-500/30 transition-all duration-300 border-2 border-[#E1C3FF] flex items-center gap-2 hover:scale-[1.02] transform"
                    >
                      <span>Save Changes</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-lg hover:shadow-red-500/30 transition-all duration-300 border-2 border-[#E1C3FF] flex items-center gap-2 hover:scale-[1.02] transform"
                    >
                      <span>Cancel</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-[#E1C3FF]">
              <p className="text-lg">No student details available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentList;
