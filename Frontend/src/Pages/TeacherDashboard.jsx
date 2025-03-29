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
  const [supervisedStudents, setSupervisedStudents] = useState([]);

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
        // Get from localStorage first
        const storedStudents = localStorage.getItem(`supervisedStudents_${teacherID}`);
        if (storedStudents) {
          setSupervisedStudents(JSON.parse(storedStudents));
          return;
        }

        // Fallback to API if not in localStorage
        const response = await axios.get(
          `http://localhost:3002/api/supervisedstudents/${teacherID}`
        );
        const students = response.data.students || [];
        setSupervisedStudents(students);
        localStorage.setItem(`supervisedStudents_${teacherID}`, JSON.stringify(students));
      } catch (error) {
        console.error("Error fetching supervised students:", error);
      }
    };

    fetchRankData();
    fetchSupervisedStudents();
  }, [teacherID]);

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
          <button
            onClick={() => navigate("/StudentList")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
          >
            MORE
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;