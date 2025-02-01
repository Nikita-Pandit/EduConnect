import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
  const navigate = useNavigate()
  const teacherID = localStorage.getItem("teacherId");
  const [rankData, setRankData] = useState([]);
  const [rankDetails, setRankDetails] = useState({});
  const [hoveredRank, setHoveredRank] = useState(null);

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
    // Fetch rank statistics
    const fetchRankData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/api/teacher/rankStatistics/${teacherID}`
        );
        const { rankPercentages, rankDetails } = response.data;

        // Prepare data for the pie chart
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

    fetchRankData();
  }, [teacherID]);

  return (
    <div className="p-5 bg-zinc-1000">
      <h1 className="text-2xl font-bold mb-5">Teacher Dashboard</h1>

      <div className="flex flex-col items-center">
        <PieChart width={400} height={400}>
          <Pie
            data={rankData}
            cx={200}
            cy={200}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={(data, index) => setHoveredRank(index + 1)} // Set hovered rank
            // onMouseLeave={() => setHoveredRank(null)} // Reset on mouse leave
          >
            {rankData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          {/* <Tooltip /> */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#333", // Background color of tooltip
              border: "1px solid #555",
              borderRadius: "8px",
              color: "white", // Change text color inside the tooltip
            }}
            labelStyle={{ color: "yellow", fontWeight: "bold" }} // Change label text color
          />
        </PieChart>

        {hoveredRank && (
          <div className="p-4 bg-white shadow-md rounded-lg mt-4">
            <h2 className="text-lg font-bold text-black">
              Students Who Gave Rank {hoveredRank}:
            </h2>
            <ul className="list-disc pl-5 text-black">
              {rankDetails[hoveredRank]?.map((studentID, idx) => (
                <li
                  className="text-black flex items-center justify-between"
                  key={idx}
                >
                  {studentID}
                  <button
                    className="ml-4 px-3 py-1 bg-blue-500 text-white rounded text-sm"
                    onClick={() =>
                      navigate("/ViewMoreDetails", {
                        state: { studentID },
                      })
                    }
                  >
                    View More Details
                  </button>
                  <input  type="checkbox" />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
