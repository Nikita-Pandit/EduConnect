
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
