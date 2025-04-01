import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const studentId = localStorage.getItem("studentId");
  const [teacherRanks, setTeacherRanks] = useState([]);
  const [studentInfo, setStudentInfo] = useState({});
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [selectedTeachers, setSelectedTeachers] = useState([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        // Fetch basic student info
        const studentResponse = await axios.get(
          `http://localhost:3002/api/student/${studentId}`
        );

        // Fetch additional student info
        const moreInfoResponse = await axios.get(
          `http://localhost:3002/api/Profile/${studentId}`
        );

        setStudentInfo({
          ...studentResponse.data,
          ...moreInfoResponse.data.moreInfo,
        });

        // Calculate profile completion percentage
        calculateProfileCompletion(moreInfoResponse.data.moreInfo);

        // Fetch teachers who have ranked this student
        const ranksResponse = await axios.get(
          `http://localhost:3002/api/teacherRanks/${studentId}`
        );
        setTeacherRanks(ranksResponse.data);

        // Fetch teachers who have selected this student
        const selectedResponse = await axios.get(
          `http://localhost:3002/api/selectedTeachers/${studentId}`
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
    <div className="min-h-screen bg-zinc-900 text-white p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-400">Student Dashboard</h1>
        <button
          onClick={() => navigate("/profile")}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
        >
          Edit Profile
        </button>
      </div>

      {/* Student Info Card */}
      <div className="bg-zinc-800 rounded-xl p-6 shadow-lg border-2 border-blue-500 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
<img
  src={
    studentInfo.image 
      ? `http://localhost:3002${studentInfo.image.startsWith('/') ? '' : '/'}${studentInfo.image}`
      : "/images/default_image.jpg"
  }
  alt="Profile" 
  className="w-32 h-32 rounded-full object-cover border-4 border-blue-400"
/>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{studentInfo.name}</h2>
            <p className="text-blue-300">{studentInfo.rollNo}</p>
            <p className="text-gray-300">{studentInfo.email}</p>
            <p className="text-gray-300">
              {studentInfo.selectYear} • {studentInfo.branch}
            </p>

            <div className="flex gap-4 mt-3">
              <button
                onClick={() => handleSocialClick(studentInfo.linkedin)}
                className={`flex items-center gap-2 px-3 py-1 rounded ${
                  studentInfo.linkedin
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-600 cursor-not-allowed"
                }`}
                disabled={!studentInfo.linkedin}
              >
                <FaLinkedin size={20} />
                LinkedIn
              </button>
              <button
                onClick={() => handleSocialClick(studentInfo.github)}
                className={`flex items-center gap-2 px-3 py-1 rounded ${
                  studentInfo.github
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-600 cursor-not-allowed"
                }`}
                disabled={!studentInfo.github}
              >
                <FaGithub size={20} />
                GitHub
              </button>
            </div>
          </div>

          {/* Profile Completion */}
          <div className="bg-zinc-700 p-4 rounded-lg border border-blue-400">
            <h3 className="font-semibold mb-2">Profile Completion</h3>
            <div className="w-32 h-32 relative">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#333"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="3"
                  strokeDasharray={`${profileCompletion}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold">{profileCompletion}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Selection Status */}
        <div className="mt-6 bg-zinc-700 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Selection Status</h3>
          {selectedTeachers.length > 0 ? (
            <div>
              <p className="text-green-400">
                You have been selected by {selectedTeachers.length} teacher(s):
              </p>
              <ul className="list-disc pl-5 mt-2">
                {selectedTeachers.map((teacher, index) => (
                  <li key={index}>{teacher.name}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-yellow-400">
              You haven't been selected by any teachers yet.
            </p>
          )}
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-zinc-800 rounded-xl p-6 shadow-lg border-2 border-blue-500 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">Your Skills</h2>
        <div className="flex flex-wrap gap-3">
          {studentInfo.skills?.length > 0 ? (
            studentInfo.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-600 px-4 py-2 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-gray-400">
              No skills added yet. Update your profile to add skills.
            </p>
          )}
        </div>
      </div>

      {/* Teacher Rankings Section */}
      <div className="bg-zinc-800 rounded-xl p-6 shadow-lg border-2 border-blue-500">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">
          Teacher Rankings
        </h2>
        {teacherRanks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-blue-500">
                  <th className="text-left p-3">Teacher Name</th>
                  <th className="text-left p-3">Rank</th>
                </tr>
              </thead>
              <tbody>
                {teacherRanks.map((teacher, index) => (
                  <tr
                    key={index}
                    className="border-b border-zinc-700 hover:bg-zinc-700"
                  >
                    <td className="p-3">{teacher.name}</td>
                    <td className="p-3">
                      <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                        {teacher.rank}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-400">No teachers have ranked you yet.</p>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
