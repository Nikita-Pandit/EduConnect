import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ResearchDoubts = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [domain, setDomain] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/api/ResearchDoubts`, {
          params: {
            branch: branch,
            year: year,
            domain: domain,
          },
        });
        console.log("Data fetched:", response.data.allProfileDetails);

        setData(response.data.allProfileDetails);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, [branch, year, domain]);
  return (
    <>
      <div className="flex items-center justify-center mt-20 gap-8">
        <select
          name="branch"
          id="branch"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          required
          className="text-black-500 bg-zinc-500 p-4 border-2 rounded-md outline-none border-none w-64"
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
          className="text-black-500 bg-zinc-500 p-4 border-2 rounded-md outline-none border-none w-64"
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
          className="text-black-500 bg-zinc-500 p-4 border-2 rounded-md outline-none border-none w-64"
        >
          <option value="">Select Domain</option>
          <option value="Web Development">web development</option>
          <option value="Machine Learning">ML</option>
          <option value="App Development">App Development</option>
          <option value=" UI/UX Design">UI/UX Design</option>
        </select>
      </div>

      <div className="p-5">
        <div className="p-5 justify-center flex flex-row flex-wrap gap-5">
          {data && data.length > 0 ? (
            data.map((item, index) => {
              return (
                <div key={index} className="bg-zinc-500 card p-3">
                  <div className="image-profile-container  border rounded-md">
                    {/* uploaded image can be seen in research doubt */}
                    <img
                      className="rounded-md w-full h-full object-cover"
                      src={
                        item.image
                          ? `http://localhost:3002${item.image}`
                          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWejx1A1AUS1FgggjfcC-4iUXMg7C-GaJdrQ&s"
                      }
                      alt={item.name}
                    />
                    
                  </div>
                  
                  <h1 className="student-name">{item.name}</h1>
                  {/* <p>Web development, AI/ML, App Development</p> */}
                  <p>{item.domain}</p>
                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      className="more-info text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      onClick={() =>
                        navigate("/ViewMoreDetails", {
                          state: { studentID: item.studentID },
                        })
                      }
                    >
                      View more details
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ResearchDoubts;


