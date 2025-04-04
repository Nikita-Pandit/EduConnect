// import React, { useEffect, useState } from "react";

// import { useLocation } from "react-router-dom";
// import axios from "axios";

// import { assets, url } from "../assets/assets";

// const ViewMoreDetails = () => {
//   const location = useLocation();
//   const id =
//     location?.state?.studentID || localStorage.getItem("studentId") || "defaultID";
//     console.log("id in view more details: ",id);
//   //localStorage.setItem("userId", id);
//   console.log(id);
//   const [studentName, setStudentName] = useState("");
//   const [studentEmail, setStudentEmail] = useState("");
//   const [studentContact, setStudentContact] = useState("");
//   // const [image,setImage]=useState(false)
//   const [profile, setProfile] = useState({
//     Bio: "",
//     github: "",
//     instagram: "",
//     linkedin: "",
//     twitter: "",
//     leetcode: "",
//     projects: "",
//     skills: "",
//     domain: "",
//     location: "",
//     branch: "",
//     selectYear: "",
//     rollNo:"",
//     CGPA:"",
//   });
//   const fetchStudentName = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3002/api/student/${id}`
//       );
//       setStudentName(response.data.name);
//       setStudentEmail(response.data.email);
//       setStudentContact(response.data.contact);
     
//     } catch (error) {
//       console.error("Error fetching student name:", error);
//     }
//   };
//   const fetchProfileInfo = async () => {
//     console.log("profile section");
//     try {
//       const response = await axios.get(
//         `http://localhost:3002/api/Profile/${id}`
//       );
//       console.log(response.data.moreInfo);
//       setProfile(response.data.moreInfo);
//       setProfile((prevProfile) => ({
//         ...prevProfile,
//         ...response.data.moreInfo,
//       }));
//     } catch (error) {
//       console.error("Error in fetching profile info:", error);
//     }
//   };
//   useEffect(() => {
//     fetchStudentName();
//     fetchProfileInfo(); // Always fetch profile info
//   }, [id]);
//   return (
//     <>
//       <form>
//         <div className="profile-container  p-5 bg-zinc-700 flex">
//           <div className=" left-profile  p-3 mt-10">
//             <h4 className="student-name">
//               {studentName ? `Welcome ${studentName}` : "Loading..."}
//             </h4>
//             <div>
//               <img src={`http://localhost:3002${profile.image}`} alt="" />
//             </div>
//             <div className="flex flex-col gap-3">
//               <input
//                 type="email"
//                 className="input-links bg-zinc-500"
//                 value={studentEmail}
//                 placeholder="kiit mail"
//               />
//               <input
//                 type="text"
//                 className="input-links bg-zinc-500"
//                 value={profile.rollNo}
//                 placeholder="KIIT Roll Number"
//                 name="rollNo"
//                 required
//               />
//               <input
//                 className="input-links  bg-zinc-500"
//                 type="text"
//                 placeholder="location"
//                 required
//                 name="location"
//                 value={profile.location}
//               />
//               <input
//                 type="tel"
//                 className="input-links  bg-zinc-500"
//                 value={studentContact}
//                 placeholder="Contact"
//               />

//               <input
//                 type="text"
//                 className="input-links  bg-zinc-500"
//                 placeholder="branch"
//                 required
//                 name="branch"
//                 value={profile.branch}
//               />
//               <input
//                 type="number"
//                 className="input-links  bg-zinc-500"
//                 placeholder="CGPA"
//                 required
//                 name="CGPA"
//                 value={profile.CGPA}
//               />
//               <input
//                 type="text"
//                 className="input-links  bg-zinc-500"
//                 placeholder="selectYear"
//                 required
//                 name="selectYear"
//                 value={profile.selectYear}
//               />
//             </div>
//           </div>
//           <div className="bg-zinc-500  border-2 rounded-md outline-none w-full right-profile-info p-5">
//             <h1 className="text-3xl text-start mb-3">write short bio</h1>
//             <textarea
//               className="outline- bg-zinc-700 w-full border-2 rounded-md"
//               name="Bio"
//               value={profile.Bio}
//               required
//               id=""
//             ></textarea>
//             <h1 className="text-2xl text-start mt-3  mb-2">
//               Social media links
//             </h1>

//             <div className="border-blue-300 flex flex-row  bg-zinc-700 p-5 border-2 rounded-md outline-none">
//               <div className="space-y-5 ml-20">
//                 <input
//                   placeholder="Github Link"
//                   className="input-links  bg-zinc-500"
//                   name="github"
//                   value={profile.github}
//                 />
//                 <input
//                   placeholder=" Linkedin Link"
//                   className="input-links  bg-zinc-500"
//                   name="linkedin"
//                   value={profile.linkedin}
//                 />
//                 <input
//                   placeholder=" leetcode Link"
//                   className="input-links  bg-zinc-500"
//                   name="leetcode"
//                   value={profile.leetcode}
//                 />
//               </div>

//               <div className="space-y-5 me-20">
//                 <input
//                   placeholder="Instagram Link"
//                   className="bg-zinc-500 input-links"
//                   name="instagram"
//                   value={profile.instagram}
//                 />
//                 <input
//                   placeholder="Twitter Link"
//                   className="bg-zinc-500 input-links"
//                   name="twitter"
//                   value={profile.twitter}
//                 />
//               </div>
//             </div>

//             <div>
//               <h1 className="text-2xl text-start mt-3  mb-2">
//                 Ongoing Projects
//               </h1>
//               <textarea
//                 className="outline-none bg-zinc-700 w-full border-2 rounded-md"
//                 name="projects"
//                 value={profile.projects}
//                 id=""
//               ></textarea>
//             </div>

//              <h1 className="text-2xl text-start mt-3  mb-2">Domain</h1>
//             <div>
//               <textarea
//                 className="bg-zinc-600 outline-none w-full border-2 rounded-md"
//                 name="domain"
//                 value={profile.domain}
//                 required
//                 id=""
//               ></textarea>
//             </div>
//             <h1 className="text-2xl text-start mt-3  mb-2">Skills</h1>
//             <div>
//               <textarea
//                 className="bg-zinc-600 outline-none w-full border-2 rounded-md"
//                 name="skills"
//                 value={profile.skills}
//                 required
//                 id=""
//               ></textarea>
//             </div>
            
//           </div>
//         </div>
//       </form>
//     </>
//   );
// };

// export default ViewMoreDetails;






import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewMoreDetails = () => {
  const location = useLocation();
  const id = location?.state?.studentID || localStorage.getItem("studentId") || "defaultID";
  console.log("id in view more details: ", id);

  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentContact, setStudentContact] = useState("");
  const [profile, setProfile] = useState({
    Bio: "",
    github: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    leetcode: "",
    projects: "",
    skills: "",
    domain: "",
    location: "",
    branch: "",
    selectYear: "",
    rollNo: "",
    CGPA: "",
    image: "/images/default_image.jpg"
  });

  const fetchStudentName = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3002/api/student/${id}`
      );
      setStudentName(response.data.name);
      setStudentEmail(response.data.email);
      setStudentContact(response.data.contact);
    } catch (error) {
      console.error("Error fetching student name:", error);
    }
  };

  const fetchProfileInfo = async () => {
    console.log("profile section");
    try {
      const response = await axios.get(
        `http://localhost:3002/api/Profile/${id}`
      );
      console.log(response.data.moreInfo);
      setProfile(prevProfile => ({
        ...prevProfile,
        ...response.data.moreInfo
      }));
    } catch (error) {
      console.error("Error in fetching profile info:", error);
    }
  };

  useEffect(() => {
    fetchStudentName();
    fetchProfileInfo();
  }, [id]);

  return (
    <div className="min-h-screen bg-[#091024] text-white p-6 w-full">
      <div className="max-w-6xl mt-10 mx-auto">
        <ToastContainer />
        <div className="profile-container w-full h-full p-8 bg-[#0d1126] rounded-xl shadow-lg shadow-[#9B30FF]/20 hover:shadow-[#9B30FF]/30 transition-all duration-300">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Profile Section */}
            <div className="w-full md:w-1/3 p-5 bg-[#0B142C] rounded-xl shadow-lg shadow-[#9B30FF]/20 hover:shadow-[#9B30FF]/40 transition-all duration-300">
              <div className="flex flex-col items-center">
                <h4 className="text-xl font-bold text-[#E1C3FF] mb-4 text-center hover:text-[#3D306F] transition-colors duration-300">
                  {studentName ? `Welcome, ${studentName}` : "Loading..."}
                </h4>
                
                {/* Profile Image */}
                <div className="relative mb-4">
                  <div className="relative overflow-hidden rounded-full border-4 border-[#9B30FF] w-36 h-36 shadow-lg shadow-[#9B30FF]/30 hover:shadow-[#9B30FF]/50 transition-all duration-300">
                    <img
                      src={
                        profile.image.startsWith("/uploads/")
                          ? `http://localhost:3002${profile.image}`
                          : `http://localhost:3002/images/default_image.jpg`
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
  
                {/* Personal Information */}
                <div className="w-full space-y-3">
                  <div>
                    <label className="text-sm text-[#E1C3FF] hover:text-[#3D306F] transition-colors duration-300">KIIT Mail</label>
                    <input
                      type="email"
                      className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-2 text-sm text-white disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:bg-[#3D306F]/20 transition-all duration-300"
                      value={studentEmail}
                      placeholder="KIIT mail"
                      disabled
                    />
                  </div>
  
                  <div>
                    <label className="text-sm text-[#E1C3FF] hover:text-[#3D306F] transition-colors duration-300">Roll Number</label>
                    <input
                      type="text"
                      className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-2 text-sm text-white disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:bg-[#3D306F]/20 transition-all duration-300"
                      placeholder="KIIT Roll Number"
                      name="rollNo"
                      value={profile.rollNo}
                      disabled
                    />
                  </div>
  
                  <div>
                    <label className="text-sm text-[#E1C3FF] hover:text-[#3D306F] transition-colors duration-300">Location</label>
                    <input
                      type="text"
                      className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-2 text-sm text-white disabled:opacity-70
                       shadow-sm shadow-[#9B30FF]/10 hover:bg-[#3D306F]/20 transition-all duration-300"
                      placeholder="Location"
                      name="location"
                      value={profile.location}
                      disabled
                    />
                  </div>
  
                  <div>
                    <label className="text-sm text-[#E1C3FF] hover:text-[#3D306F] transition-colors duration-300">Contact</label>
                    <input
                      type="tel"
                      className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-2 text-sm text-white disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:bg-[#3D306F]/20 transition-all duration-300"
                      value={studentContact}
                      placeholder="Contact"
                      disabled
                    />
                  </div>
  
                  <div>
                    <label className="text-sm text-[#E1C3FF] hover:text-[#3D306F] transition-colors duration-300">Branch</label>
                    <input
                      type="text"
                      className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-2 text-sm text-white disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:bg-[#3D306F]/20 transition-all duration-300"
                      placeholder="Branch"
                      name="branch"
                      value={profile.branch}
                      disabled
                    />
                  </div>
  
                  <div>
                    <label className="text-sm text-[#E1C3FF] hover:text-[#3D306F] transition-colors duration-300">CGPA</label>
                    <input
                      type="number"
                      className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-2 text-sm text-white disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:bg-[#3D306F]/20 transition-all duration-300"
                      placeholder="CGPA"
                      name="CGPA"
                      value={profile.CGPA}
                      disabled
                    />
                  </div>
  
                  <div>
                    <label className="text-sm text-[#E1C3FF] hover:text-[#3D306F] transition-colors duration-300">Year</label>
                    <input
                      type="text"
                      className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-2 text-sm text-white disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:bg-[#3D306F]/20 transition-all duration-300"
                      value={profile.selectYear}
                      name="selectYear"
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
                    name="Bio"
                    value={profile.Bio}
                    disabled
                  ></textarea>
                </div>
  
                <div>
                  <h1 className="text-xl font-bold text-[#E1C3FF] mb-2 hover:text-[#3D306F] transition-colors duration-300">Social Links</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <input
                        placeholder="GitHub"
                        className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-2 text-sm text-white disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:bg-[#3D306F]/20 transition-all duration-300"
                        name="github"
                        value={profile.github}
                        disabled
                      />
                      <input
                        placeholder="LinkedIn"
                        className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-2 text-sm text-white disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:bg-[#3D306F]/20 transition-all duration-300"
                        name="linkedin"
                        value={profile.linkedin}
                        disabled
                      />
                      <input
                        placeholder="Leetcode"
                        className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-2 text-sm text-white disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:bg-[#3D306F]/20 transition-all duration-300"
                        name="leetcode"
                        value={profile.leetcode}
                        disabled
                      />
                    </div>
                    <div className="space-y-3">
                      <input
                        placeholder="Instagram"
                        className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-2 text-sm text-white disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:bg-[#3D306F]/20 transition-all duration-300"
                        name="instagram"
                        value={profile.instagram}
                        disabled
                      />
                      <input
                        placeholder="Twitter"
                        className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-2 text-sm text-white disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:bg-[#3D306F]/20 transition-all duration-300"
                        name="twitter"
                        value={profile.twitter}
                        disabled
                      />
                    </div>
                  </div>
                </div>
  
                <div>
                  <h1 className="text-xl font-bold text-[#E1C3FF] mb-2 hover:text-[#3D306F] transition-colors duration-300">Ongoing Projects</h1>
                  <textarea
                    className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-3 text-sm text-white h-32 resize-none disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:bg-[#3D306F]/20 transition-all duration-300"
                    name="projects"
                    value={profile.projects}
                    disabled
                  ></textarea>
                </div>
  
                <div>
                  <h1 className="text-xl font-bold text-[#E1C3FF] mb-2 hover:text-[#3D306F] transition-colors duration-300">Domain</h1>
                  <textarea
                    className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-3 text-sm text-white h-20 resize-none disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:bg-[#3D306F]/20 transition-all duration-300"
                    name="domain"
                    value={profile.domain}
                    disabled
                  ></textarea>
                </div>
  
                <div>
                  <h1 className="text-xl font-bold text-[#E1C3FF] mb-2 hover:text-[#3D306F] transition-colors duration-300">Skills</h1>
                  <textarea
                    className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-3 text-sm text-white h-20 resize-none disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:bg-[#3D306F]/20 transition-all duration-300"
                    name="skills"
                    value={profile.skills}
                    disabled
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMoreDetails;