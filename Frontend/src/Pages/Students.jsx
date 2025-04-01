
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Students = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [domain, setDomain] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/api/Students`, {
          params: {
            branch: branch,
            year: year,
            domain: domain,
          },
        });
        console.log("Data fetched:", response.data.allProfileDetails);

        const sortedData = response.data.allProfileDetails.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setData(sortedData);
        
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, [branch, year, domain]);

  return (
    <div className="min-h-screen bg-[#091024] text-white p-6 ">
      {/* Filter Section */}
      <div className="flex flex-col md:flex-row items-center justify-center  mt-10 gap-4 md:gap-8">
        <select
          name="branch"
          id="branch"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          required
          // className="text-white bg-[#0d1126] p-3 rounded-xl border-2 border-[#9B30FF] shadow-sm shadow-[#9B30FF]/20 hover:shadow-[#9B30FF]/30 transition-all duration-300 w-full md:w-64"
          className="text-white bg-[#0B142C] p-3 rounded-xl shadow-md shadow-[#9B30FF]/20 hover:shadow-[#9B30FF]/30 transition-all duration-300 w-full md:w-64"
        >
          <option value="">Select Branch</option>
          <option value="CSE">CSE</option>
          <option value="BSC">BSC</option>
          <option value="ETC">ETC</option>
        </select>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          name="year"
          id="year"
          required
          // className="text-white bg-[#0d1126] p-3 rounded-xl border-2 border-[#9B30FF] shadow-sm shadow-[#9B30FF]/20 hover:shadow-[#9B30FF]/30 transition-all duration-300 w-full md:w-64"
          className="text-white bg-[#0B142C] p-3 rounded-xl shadow-md shadow-[#9B30FF]/20 hover:shadow-[#9B30FF]/30 transition-all duration-300 w-full md:w-64"
        >
          <option value="">Select Year</option>
          <option value="1st year">1st year</option>
          <option value="2nd year">2nd year</option>
          <option value="3rd year">3rd year</option>
          <option value="4th year">4th year</option>
        </select>

        <select
          name="domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          id="domain"
          required
          // className="text-white bg-[#0d1126] p-3 rounded-xl border-2 border-[#9B30FF] shadow-sm shadow-[#9B30FF]/20 hover:shadow-[#9B30FF]/30 transition-all duration-300 w-full md:w-64"
          className="text-white bg-[#0B142C] p-3 rounded-xl shadow-md shadow-[#9B30FF]/20 hover:shadow-[#9B30FF]/30 transition-all duration-300 w-full md:w-64"
        >
          <option value="">Select Domain</option>
          <option value="Web Development">Web Development</option>
          <option value="Machine Learning">Machine Learning</option>
          <option value="App Development">App Development</option>
          <option value="UI/UX Design">UI/UX Design</option>
        </select>
      </div>

      {/* Students Grid */}
      <div className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 justify-items-center">
          {data && data.length > 0 ? (
            data.map((item, index) => {
              return (
                <div 
                  key={index} 
                  className="bg-[#0B142C] p-5 rounded-xl shadow-lg shadow-[#9B30FF]/20 hover:shadow-[#9B30FF]/40 transition-all duration-300 w-full max-w-[350px] hover:transform hover:scale-105 flex flex-col"
                >
                  <div className="image-profile-container rounded-xl overflow-hidden  hover:border-[#E1C3FF] transition-all duration-300 mb-4 flex-shrink-0">
                    <img
                      className="w-full h-56 object-cover hover:opacity-90 transition-all duration-300"
                      src={`http://localhost:3002${item.image}`}
                      alt={item.name}
                    />
                  </div>
                  <div className="mt-2 group flex-grow flex flex-col">
                    <h1 className="text-xl font-bold text-[#E1C3FF] group-hover:text-white transition-all duration-300 text-left">
                      {item.name}
                    </h1>
                    <p className="text-sm text-[#E1C3FF] group-hover:text-white transition-all duration-300 mt-2 whitespace-pre-line">
                      {item.domain}
                    </p>
                    <div className="mt-auto pt-6">
                      <button
                        type="button"
                        className="w-full px-4 py-2 bg-[#6D0BCF] hover:bg-[#3D306F] text-white rounded-lg text-sm shadow-lg hover:shadow-[#3D306F]/50 transition-all duration-300 transform hover:scale-[1.02]"
                        onClick={() =>
                          navigate("/ViewMoreDetails", {
                            state: { studentID: item.studentID },
                          })
                        }
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-[#E1C3FF]">No students found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Students;