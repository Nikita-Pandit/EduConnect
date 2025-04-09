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
import { FaLinkedin, FaGithub,FaExternalLinkAlt } from "react-icons/fa";


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
    <div className="min-h-screen  bg-[#091024] text-white p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8 mt-10">
        <h1 className="text-3xl font-bold text-[#E1C3FF] hover:text-[#9B30FF] transition-colors duration-300">
          Teacher Dashboard
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/StudentList")}
            // className="bg-[#6D0BCF] hover:bg-[#46008B] px-4 py-2 rounded-lg transition-all duration-300 border border-[#E1C3FF] hover:scale-105 shadow-lg hover:shadow-[#9B30FF]/50"
            className="bg-gradient-to-r from-[#3D306F] to-[#9B30FF] hover:from-[#9B30FF] hover:to-[#3D306F] px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-[#3D306F] flex items-center gap-2"

            data-tooltip="View all students"
          >
            View Students
          </button>
          <button
            onClick={() => navigate("/TeacherProfile")}
            // className="bg-[#6D0BCF] hover:bg-[#46008B] px-4 py-2 rounded-lg transition-all duration-300 border border-[#E1C3FF] hover:scale-105 shadow-lg hover:shadow-[#9B30FF]/50"
            className="bg-gradient-to-r from-[#3D306F] to-[#9B30FF] hover:from-[#9B30FF] hover:to-[#3D306F] px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-[#3D306F] flex items-center gap-2"
            data-tooltip="Edit your profile"
          >
            <span>My Profile</span>
                     <FaExternalLinkAlt size={14} />
          </button>
        </div>
      </div>
  
      {/* Teacher Info Card */}
      <div className="bg-[#0d1126] rounded-xl p-6 shadow-lg mb-8 hover:shadow-[#9B30FF]/30 transition-shadow duration-300 border border-transparent hover:border-[#9B30FF]/30">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative group">
            <img
              src={
                teacherInfo.image
                  ? `http://localhost:3002${
                      teacherInfo.image.startsWith("/") ? "" : "/"
                    }${teacherInfo.image}`
                  : "/images/default_image.jpg"
              }
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-[#9B30FF] group-hover:border-[#E1C3FF] transition-all duration-300"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-sm font-medium">View Profile</span>
            </div>
          </div>
  
          <div className="flex-1">
            <h2 className="text-2xl font-bold hover:text-[#E1C3FF] transition-colors duration-300">
              {teacherInfo.name}
            </h2>
            <p className="text-[#E1C3FF] hover:text-[#9B30FF] transition-colors duration-300">
              {teacherInfo.designation}
            </p>
            <p className="text-gray-300 hover:text-white transition-colors duration-300">
              {teacherInfo.email}
            </p>
            <p className="text-gray-300 hover:text-white transition-colors duration-300">
              {teacherInfo.department}
            </p>
  
            <div className="flex gap-4 mt-3">
              <button
                onClick={() => handleSocialClick(teacherInfo.linkedin)}
                className={`flex items-center gap-2 px-3 py-1 rounded transition-all duration-300 ${
                  teacherInfo.linkedin
                    ? "bg-[#6D0BCF] hover:bg-[#46008B] border border-[#E1C3FF] hover:scale-105"
                    : "bg-gray-600 cursor-not-allowed"
                }`}
                disabled={!teacherInfo.linkedin}
                data-tooltip={teacherInfo.linkedin ? "Open LinkedIn profile" : "No LinkedIn provided"}
              >
                <FaLinkedin size={20} />
                LinkedIn
              </button>
              <button
                onClick={() => handleSocialClick(teacherInfo.github)}
                className={`flex items-center gap-2 px-3 py-1 rounded transition-all duration-300 ${
                  teacherInfo.github
                    ? "bg-[#6D0BCF] hover:bg-[#46008B] border border-[#E1C3FF] hover:scale-105"
                    : "bg-gray-600 cursor-not-allowed"
                }`}
                disabled={!teacherInfo.github}
                data-tooltip={teacherInfo.github ? "Open GitHub profile" : "No GitHub provided"}
              >
                <FaGithub size={20} />
                GitHub
              </button>
            </div>
          </div>
  
          {/* Stats Card */}
          <div className="bg-[#0d1126] p-4 rounded-lg border border-[#9B30FF] hover:border-[#E1C3FF] transition-colors duration-300 hover:shadow-lg hover:shadow-[#9B30FF]/20 group">
            <h3 className="font-semibold mb-2 text-[#E1C3FF] group-hover:text-[#9B30FF] transition-colors duration-300">
              Supervised Students
            </h3>
            <div className="flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-[#9B30FF] group-hover:text-[#E1C3FF] transition-colors duration-300">
                {supervisedStudents.length}
              </span>
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                Total Students
              </span>
            </div>
          </div>
        </div>
      </div>
  
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side: Students Table */}
        <div className="md:w-1/2 bg-[#0d1126] p-6 shadow-lg rounded-lg hover:shadow-[#9B30FF]/20 transition-shadow duration-300">
          <h2 className="text-2xl font-bold mb-4 text-[#E1C3FF] hover:text-[#9B30FF] transition-colors duration-300">
            Students Under Your Supervision
          </h2>
  
          <div className="overflow-hidden rounded-lg">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-[#9B30FF] hover:border-[#E1C3FF] transition-colors duration-300">
                  <th className="p-4 text-left font-semibold text-[#E1C3FF] hover:text-[#9B30FF] transition-colors duration-300">
                    Name
                  </th>
                  <th className="p-4 text-left font-semibold text-[#E1C3FF] hover:text-[#9B30FF] transition-colors duration-300">
                    Roll Number
                  </th>
                  <th className="p-4 text-left font-semibold text-[#E1C3FF] hover:text-[#9B30FF] transition-colors duration-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a1f3d]">
                {supervisedStudents.length > 0 ? (
                  supervisedStudents.map((student, index) => (
                    <tr
                      key={index}
                      className="transition-all duration-300 hover:bg-[#1a1f3d] hover:shadow-inner hover:shadow-[#9B30FF]/10"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3 group">
                          <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-[#9B30FF] group-hover:border-[#E1C3FF] transition-colors duration-300">
                            <img
                              src={
                                student.image
                                  ? `http://localhost:3002${
                                      student.image.startsWith("/") ? "" : "/"
                                    }${student.image}`
                                  : "/images/default_profile.jpg"
                              }
                              alt={student.name}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                              onError={(e) => {
                                e.target.src = "/images/default_profile.jpg";
                                e.target.onerror = null;
                              }}
                            />
                          </div>
                          <span className="group-hover:text-[#E1C3FF] transition-colors duration-300">
                            {student.name}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 font-mono hover:text-[#E1C3FF] transition-colors duration-300">
                        {student.rollNo}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleViewDomains(student)}
                          className="bg-[#6D0BCF] hover:bg-[#46008B] px-3 py-1 rounded text-sm border border-[#E1C3FF] hover:scale-105 transition-all duration-300 shadow hover:shadow-[#9B30FF]/30"
                          data-tooltip={`View ${student.name}'s domains`}
                        >
                          View Domains
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="p-8 text-center text-gray-400 hover:text-gray-300 transition-colors duration-300">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12 text-gray-500 hover:text-[#9B30FF] transition-colors duration-300"
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
                        <p className="text-lg hover:text-[#E1C3FF] transition-colors duration-300">
                          No students assigned yet
                        </p>
                        <p className="text-sm text-gray-500 hover:text-gray-400 transition-colors duration-300">
                          Students you select will appear here
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
              {supervisedStudents.length > 0 && (
                <tfoot>
                  <tr className="hover:bg-[#1a1f3d] transition-colors duration-300">
                    <td
                      colSpan="3"
                      className="bg-[#1a1f3d] px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      Showing {supervisedStudents.length} student
                      {supervisedStudents.length !== 1 ? "s" : ""}
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
  
        {/* Right Side: Line Chart */}
        <div className="md:w-1/2 bg-[#0d1126] p-6 shadow-lg rounded-lg hover:shadow-[#9B30FF]/20 transition-shadow duration-300">
          <h2 className="text-2xl font-bold mb-4 text-[#E1C3FF] hover:text-[#9B30FF] transition-colors duration-300">
            Rank Distribution
          </h2>
          <div className="flex justify-center">
            {rankData.length > 0 ? (
              <div className="hover:scale-[1.02] transition-transform duration-500">
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
                      boxShadow: "0 0 20px rgba(155, 48, 255, 0.3)"
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
                    animationDuration={2000}
                  />
                </LineChart>
              </div>
            ) : (
              <div className="text-gray-400 text-center py-10 hover:text-gray-300 transition-colors duration-300 group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto text-gray-500 group-hover:text-[#9B30FF] transition-colors duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <p className="mt-2 group-hover:text-[#E1C3FF] transition-colors duration-300">
                  No rank data available.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

  {/* Domain Modal */}
{showDomainModal && selectedStudent && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
    <div className="bg-[#0d1126] rounded-xl p-6 shadow-lg border-2 border-[#9B30FF] max-w-md w-full animate-[fadeIn_0.3s_ease-in-out]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-[#E1C3FF] hover:text-[#9B30FF] transition-colors duration-300">
          {selectedStudent.name}'s Domains
        </h3>
        <button
          onClick={closeDomainModal}
          className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:rotate-90"
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

      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
        {selectedStudent.domain ? (
          Array.isArray(selectedStudent.domain) ? (
            selectedStudent.domain.map((domain, index) => (
              <div
                key={index}
                className="bg-[#1a1f3d] p-3 rounded-lg flex items-center hover:bg-[#2a2f4d] transition-colors duration-300 group"
              >
                <span className="rounded-full bg-[#6D0BCF] px-3 py-1 text-sm mr-3 group-hover:bg-[#46008B] transition-colors duration-300">
                  Domain {index + 1}
                </span>
                <span className="group-hover:text-[#E1C3FF] transition-colors duration-300">
                  {domain}
                </span>
              </div>
            ))
          ) : (
            <div className="bg-[#1a1f3d] p-3 rounded-lg flex items-center hover:bg-[#2a2f4d] transition-colors duration-300 group">
              <span className="rounded-full bg-[#6D0BCF] px-3 py-1 text-sm group-hover:bg-[#46008B] transition-colors duration-300">
                {selectedStudent.domain}
              </span>
            </div>
          )
        ) : (
          <p className="text-gray-400 hover:text-gray-300 transition-colors duration-300">
            No domains specified
          </p>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={closeDomainModal}
          className="bg-[#6D0BCF] hover:bg-[#46008B] px-4 py-2 rounded-lg transition-all duration-300 border border-[#E1C3FF] hover:scale-105 shadow hover:shadow-[#9B30FF]/50"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
      {/* Tooltip container (add this at the bottom of your component) */}
      <div className="fixed z-[1000] hidden bg-[#0d1126] text-white px-3 py-2 rounded-lg border border-[#9B30FF] text-sm max-w-xs pointer-events-none transition-opacity duration-300 shadow-lg" id="tooltip"></div>
    </div>
  );
};

export default TeacherDashboard;

