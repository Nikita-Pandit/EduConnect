import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResearchDoubts = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const studentId = localStorage.getItem("studentId"); // Get student ID

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3002/api/ResearchDoubts", {
          params: { name, domain, studentId },
        });

        console.log("Data fetched:", response.data.allProfileDetails);
        setData(response.data.allProfileDetails);
        setFilteredData(response.data.allProfileDetails);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, [name, domain, studentId]);

  useEffect(() => {
    if (name) {
      const filteredSuggestions = data.filter((item) =>
        item.name.toLowerCase().includes(name.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [name, data]);

  const handleSuggestionClick = (suggestion) => {
    setName(suggestion.name);
    setShowSuggestions(false);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-20 gap-8">
        <div className="relative">
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Search teacher by name..."
            className="text-white-600 text-center bg-zinc-500 p-4 border-2 rounded-md outline-none w-96"
            autoComplete="off"
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 mt-1 w-96 bg-zinc-600 border border-gray-300 rounded-md shadow-lg">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-zinc-500 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <select
          name="domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="text-black-500 bg-zinc-500 p-4 border-2 rounded-md outline-none w-96"
        >
          <option value="">Select Domain</option>
          <option value="Web Development">Web Development</option>
          <option value="Machine Learning">ML</option>
          <option value="App Development">App Development</option>
          <option value="UI/UX Design">UI/UX Design</option>
        </select>
      </div>

      <div className="p-5">
        <div className="p-5 justify-center flex flex-row flex-wrap gap-5">
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => {
              const rank = item.rank?.[studentId] || "N/A"; // Get rank or default to "N/A"

              return (
                <div key={index} className="bg-zinc-500 card p-3">
                  <div className="image-profile-container border rounded-md">
                    <img
                      className="rounded-md w-full h-full object-cover"
                      src={`http://localhost:3002${item.image}`}
                      alt={item.name}
                    />
                  </div>
                  <h1 className="student-name">{item.name}</h1>
                  
                  <div className="flex items-center gap-2">
                    <p>{item.domain.join(", ")}</p>
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      {rank}
                    </span>
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      className="more-info text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5"
                      onClick={() => navigate("/ViewTeacherDetails", { state: { teacherID: item.teacherID } })}
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