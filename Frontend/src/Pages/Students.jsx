
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Students = () => {
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);
//   const [branch, setBranch] = useState("");
//   const [year, setYear] = useState("");
//   const [domain, setDomain] = useState("");

//   const domainOptions = [
//     { value: "Web Development", label: "Web Development" },
//     { value: "Data Science", label: "Data Science" },
//     { value: "Machine Learning", label: "Machine Learning" },
//     { value: "App Development", label: "App Development" },
//     { value: "UI/UX Design", label: "UI/UX Design" },
//     { value: "Cybersecurity", label: "Cybersecurity" },
//     { value: "Cloud Computing", label: "Cloud Computing" },
//     { value: "Blockchain", label: "Blockchain" },
//     { value: "Game Development", label: "Game Development" },
//     { value: "DevOps", label: "DevOps" },
//     { value: "Embedded Systems", label: "Embedded Systems" },
//     { value: "Internet of Things", label: "Internet of Things" },
//     { value: "Artificial Intelligence", label: "Artificial Intelligence" },
//     { value: "Big Data", label: "Big Data" },
//     { value: "Quantum Computing", label: "Quantum Computing" },
//     { value: "AR/VR", label: "AR/VR" },
//     { value: "Bioinformatics", label: "Bioinformatics" },
//     { value: "Networking", label: "Networking" },
//     { value: "Database Administration", label: "Database Administration" },
//     { value: "Software Testing", label: "Software Testing" },
//     { value: "Game AI", label: "Game AI" },
//     { value: "Robotics", label: "Robotics" },
//     { value: "Full Stack Development", label: "Full Stack Development" },
//     {
//       value: "Microservices Architecture",
//       label: "Microservices Architecture",
//     },
//     { value: "IT Support", label: "IT Support" },
//     { value: "E-commerce Development", label: "E-commerce Development" },
//     { value: "Cloud Security", label: "Cloud Security" },
//     { value: "Penetration Testing", label: "Penetration Testing" },
//     { value: "Cryptography", label: "Cryptography" },
//     { value: "Software Architecture", label: "Software Architecture" },
//   ];


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3002/api/Students`, {
//           params: {branch: branch, year: year,domain: domain,
//           },
//         });
//         console.log("Data fetched:", response.data.allProfileDetails);

//         const sortedData = response.data.allProfileDetails.sort((a, b) =>
//           a.name.localeCompare(b.name)
//         );

//         setData(sortedData);
        
//       } catch (error) {
//         console.error("Error fetching data:", error.message);
//       }
//     };
//     fetchData();
//   }, [branch, year, domain]);

//   return (
//     <div className="min-h-screen bg-[#091024] text-white p-6 ">
//       {/* Filter Section */}
//       <div className="flex flex-col md:flex-row items-center justify-center  mt-10 gap-4 md:gap-8">
//         <select
//           name="branch"
//           id="branch"
//           value={branch}
//           onChange={(e) => setBranch(e.target.value)}
//           required
//           // className="text-white bg-[#0d1126] p-3 rounded-xl border-2 border-[#9B30FF] shadow-sm shadow-[#9B30FF]/20 hover:shadow-[#9B30FF]/30 transition-all duration-300 w-full md:w-64"
//           className="text-white bg-[#0B142C] p-3 rounded-xl shadow-md shadow-[#9B30FF]/20 hover:shadow-[#9B30FF]/30 transition-all duration-300 w-full md:w-64"
//         >
//           <option value="">Select Branch</option>
//           <option value="CSE">CSE</option>
//           <option value="BSC">BSC</option>
//           <option value="ETC">ETC</option>
//         </select>

//         <select
//           value={year}
//           onChange={(e) => setYear(e.target.value)}
//           name="year"
//           id="year"
//           required
//           // className="text-white bg-[#0d1126] p-3 rounded-xl border-2 border-[#9B30FF] shadow-sm shadow-[#9B30FF]/20 hover:shadow-[#9B30FF]/30 transition-all duration-300 w-full md:w-64"
//           className="text-white bg-[#0B142C] p-3 rounded-xl shadow-md shadow-[#9B30FF]/20 hover:shadow-[#9B30FF]/30 transition-all duration-300 w-full md:w-64"
//         >
//           <option value="">Select Year</option>
//           <option value="1st year">1st year</option>
//           <option value="2nd year">2nd year</option>
//           <option value="3rd year">3rd year</option>
//           <option value="4th year">4th year</option>
//         </select>

//         <select
//           name="domain"
//           value={domain}
//           onChange={(e) => setDomain(e.target.value)}
//           id="domain"
//           required
//           // className="text-white bg-[#0d1126] p-3 rounded-xl border-2 border-[#9B30FF] shadow-sm shadow-[#9B30FF]/20 hover:shadow-[#9B30FF]/30 transition-all duration-300 w-full md:w-64"
//           className="text-white bg-[#0B142C] p-3 rounded-xl shadow-md shadow-[#9B30FF]/20 hover:shadow-[#9B30FF]/30 transition-all duration-300 w-full md:w-64"
//         >
//           <option value="">Select Domain</option>
//           <option value="Web Development">Web Development</option>
//           <option value="Machine Learning">Machine Learning</option>
//           <option value="App Development">App Development</option>
//           <option value="UI/UX Design">UI/UX Design</option>
//         </select>
//       </div>

//       {/* Students Grid */}
//       <div className="p-5">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 justify-items-center">
//           {data && data.length > 0 ? (
//             data.map((item, index) => {
//               return (
//                 <div 
//                   key={index} 
//                   className="bg-[#0B142C] p-5 rounded-xl shadow-lg shadow-[#9B30FF]/20 hover:shadow-[#9B30FF]/40 transition-all duration-300 w-full max-w-[350px] hover:transform hover:scale-105 flex flex-col"
//                 >
//                   <div className="image-profile-container rounded-xl overflow-hidden  hover:border-[#E1C3FF] transition-all duration-300 mb-4 flex-shrink-0">
//                     <img
//                       className="w-full h-56 object-cover hover:opacity-90 transition-all duration-300"
//                       src={`http://localhost:3002${item.image}`}
//                       alt={item.name}
//                     />
//                   </div>
//                   <div className="mt-2 group flex-grow flex flex-col">
//                     <h1 className="text-xl font-bold text-[#E1C3FF] group-hover:text-white transition-all duration-300 text-left">
//                       {item.name}
//                     </h1>
//                     <p className="text-sm text-[#E1C3FF] group-hover:text-white transition-all duration-300 mt-2 whitespace-pre-line">
//                       {Array.isArray(item.domain) ? item.domain.join(" , ") : item.domain}
//                     </p>
//                     <div className="mt-auto pt-6">
//                       <button
//                         type="button"
//                         className="w-full px-4 py-2 bg-[#6D0BCF] hover:bg-[#3D306F] text-white rounded-lg text-sm shadow-lg hover:shadow-[#3D306F]/50 transition-all duration-300 transform hover:scale-[1.02]"
//                         onClick={() =>
//                           navigate("/ViewMoreDetails", {
//                             state: { studentID: item.studentID },
//                           })
//                         }
//                       >
//                         View Details
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <div className="col-span-full text-center py-10">
//               <p className="text-[#E1C3FF]">No students found matching your criteria</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Students;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";


const Students = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3002';
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

  const branchOptions = [
    { value: "CSE", label: "CSE" },
    { value: "BSC", label: "BSC" },
    { value: "ETC", label: "ETC" },
  ];

  const yearOptions = [
    { value: "1st year", label: "1st year" },
    { value: "2nd year", label: "2nd year" },
    { value: "3rd year", label: "3rd year" },
    { value: "4th year", label: "4th year" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(`${backendUrl}/api/Students`, {
          params: { branch, year, domain },
        });

        const sortedData = response.data.allProfileDetails?.sort((a, b) =>
          a.name.localeCompare(b.name)
        ) || [];

        setData(sortedData);
      } catch (error) {
        setError("No students found matching your criteria. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    // Add debounce to prevent rapid API calls when filters change
    const timerId = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(timerId);
  }, [branch, year, domain]);

  return (
    <div className="min-h-screen bg-[#091024] text-white p-6">
      {/* Filter Section */}
      <div className="flex flex-col md:flex-row items-center justify-center mt-10 gap-4 md:gap-8">
        <select
          name="branch"
          id="branch"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="text-white bg-[#0B142C] p-3 rounded-xl shadow-md shadow-[#9B30FF]/20 hover:shadow-[#9B30FF]/30 transition-all duration-300 w-full md:w-64"
        >
          <option value="">Select Branch</option>
          {branchOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

{/* ----------------- */}

{/* <select
  value={year}
  onChange={(e) => setYear(e.target.value)}
  name="year"
  id="year"
  className="text-white bg-[#0B142C] appearance-none p-3 rounded-xl shadow-md shadow-[#9B30FF]/20 hover:shadow-[#9B30FF]/30 transition-all duration-300 w-full md:w-64 focus:outline-none"
>
  <option value="" className="bg-[#0B142C] text-white">Select Year</option>
  {yearOptions.map((option) => (
    <option
      key={option.value}
      value={option.value}
      className="bg-[#0B142C] text-white"
    >
      {option.label}
    </option>
  ))}
</select> */}



<select
  value={year}
  onChange={(e) => setYear(e.target.value)}
  name="year"
  id="year"
  className="text-white bg-[#0B142C] appearance-none p-3 rounded-xl shadow-md shadow-[#9B30FF]/20 hover:shadow-[#9B30FF]/30 transition-all duration-300 w-full md:w-64 focus:outline-none"
>
  <option value="" className="bg-[#0B142C] text-white">Select Year</option>
  {yearOptions.map((option) => (
    <option
      key={option.value}
      value={option.value}
      className="bg-[#0B142C] text-white"
    >
      {option.label}
    </option>
  ))}
</select>

      

        {/* <select
          name="domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          id="domain"
          className="text-white bg-[#0B142C] p-3 rounded-xl shadow-md shadow-[#9B30FF]/20 hover:shadow-[#9B30FF]/30 transition-all duration-300 w-full md:w-64"
        >
          <option value="">Select Domain</option>
          {domainOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select> */}



        <Select
  name="domain"
  value={domainOptions.find((option) => option.value === domain)}
  onChange={(selectedOption) => setDomain(selectedOption ? selectedOption.value : "")}
  options={domainOptions}
  placeholder="Select Domain"
  isClearable
  className="w-full md:w-64 text-black z-50"
  styles={{
    control: (provided) => ({
      ...provided,
      backgroundColor: "#0B142C",
      color: "white",
      borderRadius: "0.75rem",
      padding: "4px",
      outline:"none",
      border: "none",
      boxShadow: "0 0 0 1px #9B30FF",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#0B142C",
      color: "white",
      zIndex: 99,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#6D0BCF" : "#0B142C",
      color: "white",
      cursor: "pointer",
    }),
    input: (provided) => ({
      ...provided,
      color: "white",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "white",
    }),
    menuList: (provided) => ({
      ...provided,
      scrollbarWidth: "none",
      msOverflowStyle: "none",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    }),
  }}
/>

      </div>

      {/* Loading and Error States */}
      {loading && (
        <div className="text-center py-10">
          <p className="text-[#E1C3FF]">Loading students...</p>
        </div>
      )}
      
      {error && (
        <div className="text-center py-10">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Students Grid */}
      <div className="p-5">
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 justify-items-center">
            {data.length > 0 ? (
              data.map((item) => (
                <div 
                  key={item.studentID} 
                  className="bg-[#0B142C] p-5 rounded-xl shadow-lg shadow-[#9B30FF]/20 hover:shadow-[#9B30FF]/40 transition-all duration-300 w-full max-w-[350px] hover:transform hover:scale-105 flex flex-col"
                >
                  <div className="image-profile-container rounded-xl overflow-hidden hover:border-[#E1C3FF] transition-all duration-300 mb-4 flex-shrink-0">
                    <img
                      className="w-full h-56 object-cover hover:opacity-90 transition-all duration-300"
                      src={`${backendUrl}${item.image}`}
                      alt={item.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/350x200?text=No+Image";
                      }}
                    />
                  </div>
                  <div className="mt-2 group flex-grow flex flex-col">
                    <h1 className="text-xl font-bold text-[#E1C3FF] group-hover:text-white transition-all duration-300 text-left">
                      {item.name}
                    </h1>
                    <p className="text-sm text-[#E1C3FF] group-hover:text-white transition-all duration-300 mt-2 whitespace-pre-line">
                      {Array.isArray(item.domain) ? item.domain.join(", ") : item.domain}
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
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-[#E1C3FF]">No students found matching your criteria</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;