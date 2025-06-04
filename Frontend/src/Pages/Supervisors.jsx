// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Supervisors = () => {
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [name, setName] = useState("");
//   const [domain, setDomain] = useState("");
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [suggestions, setSuggestions] = useState([]);

//   const studentId = localStorage.getItem("studentId"); // Get student ID

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3002/api/Supervisors", {
//           params: { name, domain, studentId },
//         });

//         setData(response.data.allProfileDetails);
//         setFilteredData(response.data.allProfileDetails);
//       } catch (error) {
//         console.error("Error fetching data:", error.message);
//       }
//     };
//     fetchData();
//   }, [name, domain, studentId]);

//   useEffect(() => {
//     if (name) {
//       const filteredSuggestions = data.filter((item) =>
//         item.name.toLowerCase().includes(name.toLowerCase())
//       );
//       setSuggestions(filteredSuggestions);
//       setShowSuggestions(true);
//     } else {
//       setShowSuggestions(false);
//     }
//   }, [name, data]);

//   const handleSuggestionClick = (suggestion) => {
//     setName(suggestion.name);
//     setShowSuggestions(false);
//   };

//   return (
//     <div className="min-h-screen bg-[#091024] text-white p-6">
//       {/* Search and Filter Section */}
//       <div className="flex flex-col md:flex-col items-center justify-center mt-10 gap-4 md:gap-8">
//         <div className="relative w-full md:w-96">
//           <input
//             type="text"
//             name="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Search teacher by name..."
//             className="text-white bg-[#0B142C] p-3 rounded-xl shadow-md shadow-[#9B30FF]/20 hover:shadow-[#9B30FF]/30 transition-all duration-300 w-full  focus:ring-2 focus:ring-[#9B30FF]"

//             autoComplete="off"
//           />
//           {showSuggestions && suggestions.length > 0 && (
//             <div className="absolute z-10 mt-1 w-full bg-[#0B142C]  rounded-md shadow-lg max-h-60 overflow-auto">
//               {suggestions.map((suggestion, index) => (
//                 <div
//                   key={index}
//                   className="p-3 hover:bg-[#3D306F] cursor-pointer text-[#E1C3FF]"
//                   onClick={() => handleSuggestionClick(suggestion)}
//                 >
//                   {suggestion.name}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <select
//           name="domain"
//           value={domain}
//           onChange={(e) => setDomain(e.target.value)}
//           className="text-white bg-[#0B142C] p-3 rounded-xl shadow-md shadow-[#9B30FF]/20 hover:shadow-[#9B30FF]/30 transition-all w-full md:w-96 duration-300 focus:ring-2 focus:ring-[#9B30FF]"

//         >
//           <option value="">Select Domain</option>
//           <option value="Web Development">Web Development</option>
//           <option value="Machine Learning">Machine Learning</option>
//           <option value="App Development">App Development</option>
//           <option value="UI/UX Design">UI/UX Design</option>
//         </select>
//       </div>

//       {/* Teachers Grid */}
//       <div className="p-5">
//         <div className="flex mt-10 justify-center">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 max-w-6xl  hover:transform hover:scale-105">
//             {filteredData.length > 0 ? (
//               filteredData.map((item, index) => {
//                 const rank = item.rank?.[studentId] || "N/A";

//                 return (
//                   <div 
//                     key={index} 
//                     // className="bg-[#0B142C] p-5 rounded-xl  shadow-lg hover:shadow-[#9B30FF]/40 transition-all duration-300 w-full max-w-[300px] mx-auto"
//                     className="bg-[#0B142C] p-5 rounded-xl shadow-lg shadow-[#9B30FF]/20 hover:shadow-[#9B30FF]/40 transition-all duration-300 w-full max-w-[350px] hover:transform hover:scale-105 flex flex-col" >
//                     {/* Teacher Image */}
//                     <div className="rounded-xl overflow-hidden mb-4">
//                       <img
//                         className="w-full h-48 object-cover"
//                         src={`http://localhost:3002${item.image}`}
//                         alt={item.name}
//                       />
//                     </div>
                    
//                     {/* Teacher Info */}
//                     <div className="space-y-3">
//                       <div className="flex justify-between items-center">
//                         <h2 className="text-xl font-bold text-[#E1C3FF]">
//                           {item.name}
//                         </h2>
//                         <span className="bg-[#6D0BCF] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
//                           {rank}
//                         </span>
//                       </div>
                      
//                       <p className="text-sm text-[#E1C3FF]">
//                         {Array.isArray(item.domain) ? item.domain.join(", ") : item.domain}
//                       </p>
                      
//                       <button
//                         className="w-full mt-4 px-4 py-2 bg-[#6D0BCF] hover:bg-[#5A0AAE] text-white rounded-lg text-sm transition-all"
//                         onClick={() => navigate("/ViewTeacherDetails", { state: { teacherID: item.teacherID } })}
//                       >
//                         View Details
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })
//             ) : (
//               <div className="col-span-full text-center py-10">
//                 <p className="text-[#E1C3FF]">No teachers found matching your criteria</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Supervisors;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Supervisors = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const domainOptions = [
    { value: "Web Development", label: "Web Development" },
    { value: "Data Science", label: "Data Science" },
    { value: "Machine Learning", label: "Machine Learning" },
    { value: "App Development", label: "App Development" },
    { value: "UI/UX Design", label: "UI/UX Design" },
    { value: "Cybersecurity", label: "Cybersecurity" },
    { value: "Cloud Computing", label: "Cloud Computing" },
    { value: "Blockchain", label: "Blockchain" },
    { value: "Game Development", label: "Game Development" },
    { value: "DevOps", label: "DevOps" },
    { value: "Embedded Systems", label: "Embedded Systems" },
    { value: "Internet of Things", label: "Internet of Things" },
    { value: "Artificial Intelligence", label: "Artificial Intelligence" },
    { value: "Big Data", label: "Big Data" },
    { value: "Quantum Computing", label: "Quantum Computing" },
    { value: "AR/VR", label: "AR/VR" },
    { value: "Bioinformatics", label: "Bioinformatics" },
    { value: "Networking", label: "Networking" },
    { value: "Database Administration", label: "Database Administration" },
    { value: "Software Testing", label: "Software Testing" },
    { value: "Game AI", label: "Game AI" },
    { value: "Robotics", label: "Robotics" },
    { value: "Full Stack Development", label: "Full Stack Development" },
    { value: "Microservices Architecture", label: "Microservices Architecture" },
    { value: "IT Support", label: "IT Support" },
    { value: "E-commerce Development", label: "E-commerce Development" },
    { value: "Cloud Security", label: "Cloud Security" },
    { value: "Penetration Testing", label: "Penetration Testing" },
    { value: "Cryptography", label: "Cryptography" },
    { value: "Software Architecture", label: "Software Architecture" },
  ];

  const studentId = localStorage.getItem("studentId"); // Get student ID
 const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3002';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/Supervisors`, {
          params: { name, domain, studentId },
        });

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
    <div className="min-h-screen bg-[#091024] text-white p-6">
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-col items-center justify-center mt-10 gap-4 md:gap-8">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Search teacher by name..."
            className="text-white bg-[#0B142C] p-3 rounded-xl shadow-md shadow-[#9B30FF]/20 hover:shadow-[#9B30FF]/30 transition-all duration-300 w-full focus:ring-2 focus:ring-[#9B30FF]"
            autoComplete="off"
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-[#0B142C] rounded-md shadow-lg max-h-60 overflow-auto">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-3 hover:bg-[#3D306F] cursor-pointer text-[#E1C3FF]"
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
          className="text-white bg-[#0B142C] p-3 rounded-xl shadow-md shadow-[#9B30FF]/20 hover:shadow-[#9B30FF]/30 transition-all w-full md:w-96 duration-300 focus:ring-2 focus:ring-[#9B30FF]"
        >
          <option value="">Select Domain</option>
          {domainOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Teachers Grid */}
      <div className="p-5">
        <div className="flex mt-10 justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 max-w-6xl hover:transform hover:scale-105">
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => {
                const rank = item.rank?.[studentId] || "N/A";

                return (
                  <div 
                    key={index} 
                    className="bg-[#0B142C] p-5 rounded-xl shadow-lg shadow-[#9B30FF]/20 hover:shadow-[#9B30FF]/40 transition-all duration-300 w-full max-w-[350px] hover:transform hover:scale-105 flex flex-col"
                  >
                    {/* Teacher Image */}
                    <div className="rounded-xl overflow-hidden mb-4">
                      <img
                        className="w-full h-48 object-cover"
                        src={`${backendUrl}${item.image}`}
                        alt={item.name}
                      />
                    </div>
                    
                    {/* Teacher Info */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-[#E1C3FF]">
                          {item.name}
                        </h2>
                        <span className="bg-[#6D0BCF] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          {rank}
                        </span>
                      </div>
                      
                      <p className="text-sm text-[#E1C3FF]">
                        {Array.isArray(item.domain) ? item.domain.join(", ") : item.domain}
                      </p>
                      
                      <button
                        className="w-full mt-4 px-4 py-2 bg-[#6D0BCF] hover:bg-[#5A0AAE] text-white rounded-lg text-sm transition-all"
                        onClick={() => navigate("/ViewTeacherDetails", { state: { teacherID: item.teacherID } })}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-[#E1C3FF]">No teachers found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Supervisors;