// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";

// const ViewTeacherDetails = () => {
//   const location = useLocation();
//   const viewTeacherId =
//     location?.state?.teacherID ||
//     localStorage.getItem("teacherId") ||
//     "defaultID";
//   // localStorage.setItem("teacherId", viewTeacherId);
//   console.log("view more details teacher: ", viewTeacherId);

//   const [teacherName, setTeacherName] = useState("");
//   const [teacherEmail, setTeacherEmail] = useState("");
//   const [teacherContact, setTeacherContact] = useState("");
//   const [isRanked, setIsRanked] = useState(false);
//   const [studentYear, setStudentYear] = useState(null);
//   const [teacherRank, setTeacherRank] = useState(null);
//   const [showRestrictionMessage, setShowRestrictionMessage] = useState(false);

//   const [profile, setProfile] = useState({
//     name: "",
//     Bio: "",
//     github: "",
//     linkedin: "",
//     twitter: "",
//     domain: "",
//     location: "",
//     rank: {},
//   });

//   const [showModal, setShowModal] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);

//   const fetchStudentYear = async () => {
//     console.log("inside fetchstudentyear");
//     try {
//       const studentId = localStorage.getItem("studentId");
//       console.log("yooy", studentId);
//       // If studentId is null or undefined, stop execution
//       if (!studentId) {
//         console.error("No student ID found in localStorage");
//         return;
//       }
//       const response = await axios.get(
//         `http://localhost:3002/api/student/unique/${studentId}`
//       );
//       console.log("Response from backend:", response.data);
//       setStudentYear(response.data.selectYear);
//     } catch (error) {
//       console.error("Error fetching student year:", error);
//     }
//   };
//   useEffect(() => {
//     console.log("studentyear", studentYear);
//   }, [studentYear]);

//   const fetchTeacherName = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3002/api/teacher/${viewTeacherId}`
//       );
//       setTeacherName(response.data.name);
//       setTeacherEmail(response.data.email);
//       setTeacherContact(response.data.contact);
//       setProfile((prevProfile) => ({
//         ...prevProfile,
//         name: response.data.name,
//       }));
//     } catch (error) {
//       console.error("Error fetching student name:", error);
//     }
//   };

//   const fetchTeacherProfileInfo = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3002/api/teacherProfile/${viewTeacherId}`
//       );

//       setProfile((prevProfile) => ({
//         ...prevProfile,
//         ...response.data.moreInfo,
//       }));

//       // Check if this student has already ranked the teacher
//       const studentId = localStorage.getItem("studentId");
//       if (
//         response.data.moreInfo.rank &&
//         response.data.moreInfo.rank[studentId]
//       ) {
//         setIsRanked(true);
//         setTeacherRank(response.data.moreInfo.rank[studentId]);
//       }
//     } catch (error) {
//       console.error("Error in fetching profile info:", error);
//     }
//   };

//   useEffect(() => {
//     fetchStudentYear();
//     fetchTeacherName();
//     fetchTeacherProfileInfo();
//   }, [viewTeacherId]);

//   const saveRank = async (rank) => {
//     try {
//       if (studentYear !== "4th year") {
//          alert("It is only allowed for 4th year students");
//         return;
//       }

//       const response = await axios.post(
//         `http://localhost:3002/api/teacherRank`,
//         {
//           teacherRank: rank,
//           studentId: localStorage.getItem("studentId"),
//           viewTeacherId,
//         }
//       );

//       console.log("Rank saved successfully:", response.data);
//       console.log("student year:", response.data.year);
//       setIsRanked(true);
//       setTeacherRank(rank);
//       setShowModal(false);
//     } catch (error) {
//       if (error.response && error.response.status === 400) {
//         alert(error.response.data.message); // Show popup if duplicate rank
//       } else {
//         console.error("Error saving rank:", error);
//       }
//     }
//   };

//   const handleRankClick = () => {
//     if (studentYear !== "4th year") {
//       setShowRestrictionMessage(true); // Show message for non-4th-year students
//       return;
//     }
//     setShowModal(true); // Open ranking modal for 4th-year students
//   };

//   return (
//     <>
//       <form>
//         <div className="profile-container p-5 bg-zinc-700 flex">
//           <div className="left-profile p-3 mt-10">
//             <h4 className="student-name">
//               {teacherName ? `Welcome ${teacherName}` : "Loading..."}
//             </h4>
//             <div>
//               <img src={`http://localhost:3002${profile.image}`} alt="" />
//             </div>
//             <div className="flex flex-col gap-3">
//               <input
//                 type="email"
//                 className="input-links bg-zinc-500"
//                 value={teacherEmail}
//                 placeholder="kiit mail"
//               />
//               <input
//                 className="input-links bg-zinc-500"
//                 type="text"
//                 placeholder="location"
//                 required
//                 name="location"
//                 value={profile.location}
//               />
//               <input
//                 type="tel"
//                 className="input-links bg-zinc-500"
//                 value={teacherContact}
//                 placeholder="Contact"
//               />
//             </div>
//           </div>
//           <div className="bg-zinc-500 border-2 rounded-md outline-none w-full right-profile-info p-5">
//             <h1 className="text-3xl text-start mb-3">Write short bio</h1>
//             <textarea
//               className="outline-none bg-zinc-700 w-full border-2 rounded-md"
//               name="Bio"
//               value={profile.Bio}
//               required
//               id=""
//             ></textarea>
//             <h1 className="text-2xl text-start mt-3 mb-2">
//               Social media links
//             </h1>

//             <div className="border-blue-300 flex flex-row bg-zinc-700 p-5 border-2 rounded-md outline-none">
//               <div className="space-y-5 ml-20">
//                 <input
//                   placeholder="Github Link"
//                   className="input-links bg-zinc-500"
//                   name="github"
//                   value={profile.github}
//                 />
//                 <input
//                   placeholder="LinkedIn Link"
//                   className="input-links bg-zinc-500"
//                   name="linkedin"
//                   value={profile.linkedin}
//                 />
//               </div>

//               <div className="space-y-5 me-20">
//                 <input
//                   placeholder="Twitter Link"
//                   className="bg-zinc-500 input-links"
//                   name="twitter"
//                   value={profile.twitter}
//                 />
//               </div>
//             </div>
//             <h1 className="text-2xl text-start mt-3 mb-2">Domain</h1>
//             <div>
//               <textarea
//                 className="bg-zinc-600 outline-none w-full border-2 rounded-md"
//                 name="domain"
//                 value={profile.domain}
//                 required
//                 id=""
//               ></textarea>
//             </div>

//             <div className="mt-5 flex justify-center">

       
//              {isRanked ? (
//       <div>
//         Priority given by you: {teacherRank}
//         {studentYear === "4th year" && (
//           <button
//             type="button"
//             className="bg-yellow-500 text-white px-4 py-2 rounded-lg ml-4"
//             onClick={() => setIsEditMode(true)}
//           >
//             Edit Priority
//           </button>
//         )}
//       </div>
//     ) : showRestrictionMessage ? (
//       <p className="text-white font-semibold text-lg">
//   It is only allowed for 4th-year students.
// </p>

//     ) : (
//       <button
//         type="button"
//         className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//         onClick={handleRankClick}
//       >
//         Rank this Teacher
//       </button>
//     )}
//             </div>


//           </div>
//         </div>
//       </form>

//       {/* Modal for Ranking */}
//       {showModal && studentYear === "4th year" && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <h2 className="text-lg font-bold mb-4">Prioritize this Teacher</h2>
//             <div className="flex gap-3">
//               {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
//                 <button
//                   key={num}
//                   className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center hover:bg-blue-500 hover:text-white"
//                   onClick={async () => {
//                     try {
//                   await saveRank(num);
                     
//                       setShowModal(false);
//                     } catch (error) {
//                       console.error("Error in Prioritizing:", error);
//                     }
//                   }}
//                 >
//                   {num}
//                 </button>
//               ))}
//             </div>
//             <button
//               className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
//               onClick={() => setShowModal(false)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Modal for Editing Rank */}
//       {isEditMode && studentYear === "4th year" && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <h2 className="text-lg font-bold mb-4">Edit your Priority</h2>
//             <div className="flex gap-3">
//               {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
//                 <button
//                   key={num}
//                   className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center hover:bg-blue-500 hover:text-white"
//                   onClick={async () => {
//                     try {
//                       await saveRank(num);
//                       setIsEditMode(false); // Close the edit mode after saving
//                     } catch (error) {
//                       console.error("Error in editing Priority:", error);
//                     }
//                   }}
//                 >
//                   {num}
//                 </button>
//               ))}
//             </div>
//             <button
//               className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
//               onClick={() => setIsEditMode(false)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ViewTeacherDetails;





import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ViewTeacherDetails = () => {
  const location = useLocation();
  const viewTeacherId = location?.state?.teacherID || localStorage.getItem("teacherId") || "defaultID";
   const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3002';
  const [teacherName, setTeacherName] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherContact, setTeacherContact] = useState("");
  
  const [isRanked, setIsRanked] = useState(false);
  const [studentYear, setStudentYear] = useState(null);
  const [teacherRank, setTeacherRank] = useState(null);
  const [showRestrictionMessage, setShowRestrictionMessage] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    Bio: "",
    github: "",
    linkedin: "",
    twitter: "",
    domain: "",
    location: "",
    rank: {},
    image: "/images/default_image.jpg"
  });

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchStudentYear = async () => {
    try {
      const studentId = localStorage.getItem("studentId");
      if (!studentId) return;
      const response = await axios.get(
        `${backendUrl}/api/student/unique/${studentId}`
      );
      setStudentYear(response.data.selectYear);
    } catch (error) {
      console.error("Error fetching student year:", error);
    }
  };

  const fetchTeacherName = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/teacher/${viewTeacherId}`
      );
      setTeacherName(response.data.name);
      setTeacherEmail(response.data.email);
      setTeacherContact(response.data.contact);
      setProfile(prev => ({ ...prev, name: response.data.name }));
    } catch (error) {
      console.error("Error fetching teacher name:", error);
    }
  };

  const fetchTeacherProfileInfo = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/teacherProfile/${viewTeacherId}`
      );
      setProfile(prev => ({ ...prev, ...response.data.moreInfo }));

      const studentId = localStorage.getItem("studentId");
      if (response.data.moreInfo.rank?.[studentId]) {
        setIsRanked(true);
        setTeacherRank(response.data.moreInfo.rank[studentId]);
      }
    } catch (error) {
      console.error("Error fetching profile info:", error);
    }
  };

  const saveRank = async (rank) => {
    try {
      if (studentYear !== "4th year") {
        alert("It is only allowed for 4th year students");
        return;
      }

      await axios.post(`${backendUrl}/api/teacherRank`, {
        teacherRank: rank,
        studentId: localStorage.getItem("studentId"),
        viewTeacherId,
      });

      setIsRanked(true);
      setTeacherRank(rank);
      setShowModal(false);
      setIsEditMode(false);
    } catch (error) {
      if (error.response?.status === 400) {
        alert(error.response.data.message);
      } else {
        console.error("Error saving rank:", error);
      }
    }
  };

  const handleRankClick = () => {
    if (studentYear !== "4th year") {
      setShowRestrictionMessage(true);
      return;
    }
    setShowModal(true);
  };

  useEffect(() => {
    fetchStudentYear();
    fetchTeacherName();
    fetchTeacherProfileInfo();
  }, [viewTeacherId]);

  return (
    <div className="min-h-screen bg-[#091024] text-white p-6">
      <div className="max-w-6xl mt-10 mx-auto">
        <div className="profile-container w-full h-full p-8 bg-[#0d1126] rounded-xl shadow-lg shadow-[#9B30FF]/20 hover:shadow-[#9B30FF]/30 transition-all duration-300">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Profile Section */}
            <div className="w-full md:w-1/3 p-5 bg-[#0B142C] rounded-xl shadow-lg shadow-[#9B30FF]/20 hover:shadow-[#9B30FF]/40 transition-all duration-300">
              <div className="flex flex-col items-center">
                <h4 className="text-xl font-bold text-[#E1C3FF] mb-4 text-center hover:text-[#3D306F] transition-colors duration-300">
                  {teacherName ? `Welcome, ${teacherName}` : "Loading..."}
                </h4>
                
                {/* Profile Image */}
                <div className="relative mb-4">
                  <div className="relative overflow-hidden rounded-full border-4 border-[#9B30FF] w-36 h-36 shadow-lg shadow-[#9B30FF]/30 hover:shadow-[#9B30FF]/50 transition-all duration-300">
                    <img
                      src={
                        profile.image.startsWith("/uploads/")
                          ? `${backendUrl}${profile.image}`
                          : `${backendUrl}/images/default_image.jpg`
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
  
                {/* Personal Information */}
                <div className="w-full space-y-3">
                  <div>
                    <label className="text-sm text-[#E1C3FF] hover:text-[#3D306F] transition-colors duration-300">Email</label>
                    <input
                      type="email"
                      className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-2 text-sm text-white disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:bg-[#3D306F]/20 transition-all duration-300"
                      value={teacherEmail}
                      disabled
                    />
                  </div>
  
                  <div>
                    <label className="text-sm text-[#E1C3FF] hover:text-[#3D306F] transition-colors duration-300">Location</label>
                    <input
                      type="text"
                      className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-2 text-sm text-white disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:bg-[#3D306F]/20 transition-all duration-300"
                      value={profile.location}
                      disabled
                    />
                  </div>
  
                  <div>
                    <label className="text-sm text-[#E1C3FF] hover:text-[#3D306F] transition-colors duration-300">Contact</label>
                    <input
                      type="tel"
                      className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-2 text-sm text-white disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:bg-[#3D306F]/20 transition-all duration-300"
                      value={teacherContact}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
  
            {/* Right Profile Section */}
            <div className="w-full md:w-2/3 bg-[#0B142C] p-5 rounded-xl shadow-lg shadow-[#9B30FF]/20 hover:shadow-[#9B30FF]/40 transition-all duration-300">
              <div className="space-y-4">
                <div>
                  <h1 className="text-xl font-bold text-[#E1C3FF] mb-2 hover:text-[#3D306F] transition-colors duration-300">Bio</h1>
                  <textarea
                    className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-3 text-sm text-white h-32 resize-none disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:bg-[#3D306F]/20 transition-all duration-300"
                    value={profile.Bio}
                    disabled
                  />
                </div>
  
                <div>
                  <h1 className="text-xl font-bold text-[#E1C3FF] mb-2 hover:text-[#3D306F] transition-colors duration-300">Social Links</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <input
                        placeholder="GitHub"
                        className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-2 text-sm text-white disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:bg-[#3D306F]/20 transition-all duration-300"
                        value={profile.github}
                        disabled
                      />
                      <input
                        placeholder="LinkedIn"
                        className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-2 text-sm text-white disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:bg-[#3D306F]/20 transition-all duration-300"
                        value={profile.linkedin}
                        disabled
                      />
                    </div>
                    <div className="space-y-3">
                      <input
                        placeholder="Twitter"
                        className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-2 text-sm text-white disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:bg-[#3D306F]/20 transition-all duration-300"
                        value={profile.twitter}
                        disabled
                      />
                    </div>
                  </div>
                </div>
  
                <div>
                  <h1 className="text-xl font-bold text-[#E1C3FF] mb-2 hover:text-[#3D306F] transition-colors duration-300">Domain</h1>
                  <textarea
                    className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-3 text-sm text-white h-20 resize-none disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:bg-[#3D306F]/20 transition-all duration-300"
                    value={profile.domain}
                    disabled
                  />
                </div>
  
                {/* Priority Section */}
                <div className="mt-6 flex justify-center">
                  {isRanked ? (
                    <div className="flex items-center gap-4">
                      <span className="text-[#E1C3FF]">Priority given by you: {teacherRank}</span>
                      {studentYear === "4th year" && (
                        <button
                          type="button"
                          className="px-4 py-2 bg-[#FFC107] hover:bg-[#FFA000] text-[#0B142C] rounded-lg text-sm shadow-lg hover:shadow-[#FFA000]/50 transition-all duration-300"
                          onClick={() => setIsEditMode(true)}
                        >
                          Edit Priority
                        </button>
                      )}
                    </div>
                  ) : showRestrictionMessage ? (
                    <p className="text-[#E1C3FF] font-semibold">
                      It is only allowed for 4th-year students.
                    </p>
                  ) : (
                    <button
                      type="button"
                      className="px-6 py-2 bg-[#6D0BCF] hover:bg-[#5A0AAE] text-white rounded-lg text-sm shadow-lg hover:shadow-[#5A0AAE]/50 transition-all duration-300"
                      onClick={handleRankClick}
                    >
                      Prioritize this Teacher
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Priority Modal */}
      {(showModal || isEditMode) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#0B142C] p-6 rounded-xl border-2 border-[#9B30FF] shadow-lg shadow-[#9B30FF]/30">
            <h2 className="text-xl font-bold text-[#E1C3FF] mb-4">
              {isEditMode ? "Edit Your Priority" : "Prioritize this Teacher"}
            </h2>
            <div className="flex justify-center gap-3 mb-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  key={num}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    num === teacherRank && isEditMode
                      ? "bg-[#9B30FF] text-white"
                      : "bg-[#0d1126] text-[#E1C3FF] hover:bg-[#9B30FF] hover:text-white"
                  }`}
                  onClick={() => saveRank(num)}
                >
                  {num}
                </button>
              ))}
            </div>
            <button
              className="w-full py-2 bg-[#6D0BCF] hover:bg-[#5A0AAE] text-white rounded-lg transition-all"
              onClick={() => isEditMode ? setIsEditMode(false) : setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTeacherDetails;