// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Select from "react-select"; // Install via npm install react-select

// const TeacherProfile = () => {
//   const [isEditing, setIsEditing] = useState(false); // NEW STATE
//   const [isFirstVisit, setIsFirstVisit] = useState(true);
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
//     { value: "Microservices Architecture", label: "Microservices Architecture" },
//     { value: "IT Support", label: "IT Support" },
//     { value: "E-commerce Development", label: "E-commerce Development" },
//     { value: "Cloud Security", label: "Cloud Security" },
//     { value: "Penetration Testing", label: "Penetration Testing" },
//     { value: "Cryptography", label: "Cryptography" },
//     { value: "Software Architecture", label: "Software Architecture" },
//   ];

//   const handleDomainChange = (selectedOptions) => {
//     setProfile((prevProfile) => ({
//       ...prevProfile,
//       domain: selectedOptions
//         ? selectedOptions.map((option) => option.value)
//         : [],
//     }));
//   };

//   const teacherId = localStorage.getItem("teacherId") || "defaultID";

//   // console.log("TeacherId");
//   const [teacherName, setTeacherName] = useState("");
//   const [teacherEmail, setTeacherEmail] = useState("");
//   const [teacherContact, setTeacherContact] = useState("");
//   const [profile, setProfile] = useState({
//     name: "",
//     Bio: "",
//     github: "",

//     linkedin: "",
//     twitter: "",

//     domain: "",
//     location: "",
//     image: "/images/default_image.jpg",
//     rank: {},
//   });

//   const fetchTeacherName = async () => {
//     try {
//       // console.log("FetchTeacherName")
//       const response = await axios.get(
//         `http://localhost:3002/api/teacher/${teacherId}`
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
//       console.log("hello");
//       const response = await axios.get(
//         `http://localhost:3002/api/teacherProfile/${teacherId}`
//       );
//       if (response.data.success) {
//         const fetchedProfile = response.data.moreInfo;
//         setProfile((prevProfile) => ({
//           ...prevProfile,
//           ...fetchedProfile,
//         }));
//         setIsFirstVisit(false);
//         setIsEditing(false);
//       }
//     } catch (error) {
//       console.error("Error in fetching profile info:", error);
//     }
//   };

//   useEffect(() => {
//     fetchTeacherName();
//     fetchTeacherProfileInfo();
//   }, [teacherId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
//   };

//   const handleSave = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         `http://localhost:3002/api/teacherProfile/${teacherId}`,
//         profile
//       );
//       toast.success("Profile info saved in the database successfully.", {
//         style: { color: "#ff5722" },
//       });
//       setIsEditing(false); // Exit editing mode
//       setIsFirstVisit(false);
//       // Emit custom event
//       const event = new Event("profileUpdated");
//       window.dispatchEvent(event); // Dispatch the event globally
//       setIsEditing(false); // Exit edit mode after saving
//     } catch (error) {
//       console.error("Error saving profile info in the database:", error);
//       toast.error("Failed to save profile info in the database");
//     }
//   };
//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       console.log("Teacher image");
//       const response = await axios.post(
//         `http://localhost:3002/api/teacherProfile/${teacherId}/uploadImage`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );
//       // console.log("teacher image path", response.data.image);
//       setProfile((prevProfile) => ({
//         ...prevProfile,
//         image: response.data.image,
//       }));
//       toast.success("Image uploaded successfully!");
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       toast.error("Failed to upload image.");
//     }
//   };

//   const customStyles = {
//     control: (base) => ({
//       ...base,
//       backgroundColor: "#374151",
//       color: "#FFFFFF",
//       border: "2px solid rgb(80, 158, 179)",
//       borderRadius: "10px",
//       boxShadow: "none",
//       padding: "10px",
//     }),
//     menu: (base) => ({
//       ...base,
//       backgroundColor: "#71717A",
//       color: "#FFFFFF",
//     }),
//     option: (base, state) => ({
//       ...base,
//       backgroundColor: state.isFocused ? "#374151" : "#1F2937",
//       color: "#FFFFFF",
//       "&:active": {
//         backgroundColor: "#4B5563",
//       },
//     }),
//     multiValue: (base) => ({
//       ...base,
//       backgroundColor: "#71717A",
//       color: "#FFFFFF",
//       borderRadius: "0.375rem",
//     }),
//     multiValueLabel: (base) => ({
//       ...base,
//       color: "#FFFFFF",
//     }),
//     multiValueRemove: (base) => ({
//       ...base,
//       color: "#FFFFFF",
//       "&:hover": {
//         backgroundColor: "#4B5563",
//         color: "#FFFFFF",
//       },
//     }),
//   };
//   return (
//     <>
//       <form onSubmit={handleSave}>
//         <ToastContainer />
//         <div className="profile-container p-5 bg-zinc-700 flex">
//           <div className="left-profile p-3 mt-10">
//             <h4 className="student-name">
//               {teacherName ? `Welcome, ${teacherName}` : "Loading..."}
//             </h4>
//             <div className="flex items-center justify-center mt-3 mb-3">
//               <img
//                 src={
//                   profile.image.startsWith("/uploads/")
//                     ? `http://localhost:3002${profile.image}`
//                     : `http://localhost:3002/images/default_image.jpg`
//                 }
//                 alt="Profile"
//                 className="profile-image object-contain rounded-lg"
//                 // onClick={() => isEditing && document.getElementById("imageUpload").click()} // Prevent click if not editing
//                 onClick={() =>
//                   (isEditing || isFirstVisit) &&
//                   document.getElementById("imageUpload").click()
//                 }
//                 // onClick={() => document.getElementById("imageUpload").click()} // Prevent click if not editing
//                 style={{
//                   width: "180px",
//                   height: "180px",
//                   cursor: isEditing ? "pointer" : "default",
//                 }}
//                 // style={{ width: "180px", height: "180px", cursor: "pointer" }}
//               />
//               <input
//                 type="file"
//                 id="imageUpload"
//                 style={{ display: "none" }}
//                 onChange={handleImageChange}
//                 disabled={!isEditing && !isFirstVisit} // Disable file input if not in editing mode
//               />
//             </div>
//             <div className="flex flex-col gap-3">
//               <input
//                 type="email"
//                 className="input-links bg-zinc-500"
//                 value={teacherEmail}
//                 placeholder="KIIT mail"
//               />
//               <input
//                 className="input-links bg-zinc-500"
//                 type="text"
//                 placeholder="Location"
//                 onChange={handleChange}
//                 required
//                 name="location"
//                 value={profile.location}
//                 disabled={!isEditing && !isFirstVisit} // Disable file input if not in editing mode
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
//               onChange={handleChange}
//               name="Bio"
//               value={profile.Bio}
//               required
//               disabled={!isEditing && !isFirstVisit} // Disable file input if not in editing mode
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
//                   onChange={handleChange}
//                   value={profile.github}
//                   disabled={!isEditing && !isFirstVisit} // Disable file input if not in editing mode
//                 />
//                 <input
//                   placeholder="LinkedIn Link"
//                   className="input-links bg-zinc-500"
//                   name="linkedin"
//                   onChange={handleChange}
//                   value={profile.linkedin}
//                   disabled={!isEditing && !isFirstVisit} // Disable file input if not in editing mode
//                 />
//               </div>
//               <div className="space-y-5 me-20">
//                 <input
//                   placeholder="Twitter Link"
//                   onChange={handleChange}
//                   className="bg-zinc-500 input-links"
//                   name="twitter"
//                   value={profile.twitter}
//                   disabled={!isEditing && !isFirstVisit} // Disable file input if not in editing mode
//                 />
//               </div>
//             </div>
//             <h1 className="text-2xl text-start mt-3 mb-2">Domain</h1>
//             <div>
//               <Select
//                 isMulti
//                 options={domainOptions}
//                 value={domainOptions.filter((option) =>
//                   profile.domain.includes(option.value)
//                 )}
//                 onChange={handleDomainChange}
//                 styles={customStyles}
//                 isDisabled={!isEditing && !isFirstVisit} // Disable file input if not in editing mode
//               />
//             </div>
//           </div>
//         </div>
//         <div className="flex justify-center mt-5">
//           <button
//             type="button"
//             className="text-center px-5 py-2 bg-green-500 rounded-lg mr-3"
//             onClick={() => {
//               setIsEditing(true);
//               setIsFirstVisit(true);
//             }}
//             // disabled={!isEditing && !isFirstVisit} // Disable file input if not in editing mode
//           >
//             Edit
//           </button>
//           <button
//             type="submit"
//             className="text-center px-5 py-2 bg-blue-500 rounded-lg"
//             // disabled={!isEditing && !isFirstVisit} // Disable file input if not in editing mode
//           >
//             Save
//           </button>
//         </div>
//       </form>
//     </>
//   );
// };

// export default TeacherProfile;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

const TeacherProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

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

  const handleDomainChange = (selectedOptions) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      domain: selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [],
    }));
  };

  const teacherId = localStorage.getItem("teacherId") || "defaultID";

  const [teacherName, setTeacherName] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherContact, setTeacherContact] = useState("");
  const [profile, setProfile] = useState({
    name: "",
    Bio: "",
    github: "",
    linkedin: "",
    twitter: "",
    domain: "",
    location: "",
    image: "/images/default_image.jpg",
    rank: {},
  });

  const fetchTeacherName = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3002/api/teacher/${teacherId}`
      );
      setTeacherName(response.data.name);
      setTeacherEmail(response.data.email);
      setTeacherContact(response.data.contact);
      setProfile((prevProfile) => ({
        ...prevProfile,
        name: response.data.name,
      }));
    } catch (error) {
      console.error("Error fetching student name:", error);
    }
  };

  const fetchTeacherProfileInfo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3002/api/teacherProfile/${teacherId}`
      );
      if (response.data.success) {
        const fetchedProfile = response.data.moreInfo;
        setProfile((prevProfile) => ({
          ...prevProfile,
          ...fetchedProfile,
        }));
        setIsFirstVisit(false);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error in fetching profile info:", error);
    }
  };

  useEffect(() => {
    fetchTeacherName();
    fetchTeacherProfileInfo();
  }, [teacherId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3002/api/teacherProfile/${teacherId}`,
        profile
      );
      toast.success("Profile info saved in the database successfully.", {
        style: { color: "#ff5722" },
      });
      setIsEditing(false);
      setIsFirstVisit(false);
      const event = new Event("profileUpdated");
      window.dispatchEvent(event);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile info in the database:", error);
      toast.error("Failed to save profile info in the database");
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `http://localhost:3002/api/teacherProfile/${teacherId}/uploadImage`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setProfile((prevProfile) => ({
        ...prevProfile,
        image: response.data.image,
      }));
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image.");
    }
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#0d1126",
      color: "#FFFFFF",
      border: "2px solid #9B30FF",
      borderRadius: "10px",
      boxShadow: "none",
      padding: "10px",
      "&:hover": {
        borderColor: "#E1C3FF",
        boxShadow: "0 0 0 1px #E1C3FF"
      }
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#0d1126",
      color: "#FFFFFF",
      border: "2px solid #9B30FF",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#6D0BCF" : "#0d1126",
      color: "#FFFFFF",
      "&:active": {
        backgroundColor: "#46008B",
      },
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#6D0BCF",
      color: "#FFFFFF",
      borderRadius: "0.375rem",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "#FFFFFF",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "#FFFFFF",
      "&:hover": {
        backgroundColor: "#46008B",
        color: "#FFFFFF",
      },
    }),
  };


return (
  <div className="min-h-screen bg-[#091024] text-white p-6 w-full">
    <form onSubmit={handleSave} className="max-w-6xl mx-auto">
      <ToastContainer />
      <div className="profile-container w-full h-full p-8 bg-[#0d1126] rounded-xl  shadow-lg shadow-[#9B30FF]/20 hover:shadow-[#9B30FF]/30 transition-all duration-300">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Profile Section */}
          <div className="w-full md:w-1/3 p-5 bg-[#0B142C] rounded-xl shadow-md shadow-[#9B30FF]/10 hover:shadow-[#9B30FF]/20 transition-all duration-300">
            <div className="flex flex-col items-center">
              <h4 className="text-xl font-bold text-[#E1C3FF] mb-4 text-center hover:text-[#3D306F] transition-colors duration-300">
                {teacherName ? `Welcome, ${teacherName}` : "Loading..."}
              </h4>
              
              {/* Profile Image */}
              <div className="relative mb-4">
                <div className="relative overflow-hidden rounded-full border-4 border-[#9B30FF] w-36 h-36 shadow-lg shadow-[#9B30FF]/20 hover:shadow-[#9B30FF]/40 transition-all duration-300 group">
                  <img
                    src={
                      profile.image.startsWith("/uploads/")
                        ? `http://localhost:3002${profile.image}`
                        : `http://localhost:3002/images/default_image.jpg`
                    }
                    alt="Profile"
                    className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-300"
                    onClick={() =>
                      (isEditing || isFirstVisit) &&
                      document.getElementById("imageUpload").click()
                    }
                    style={{
                      cursor: (isEditing || isFirstVisit) ? "pointer" : "default",
                    }}
                  />
                  {(isEditing || isFirstVisit) && (
                    <div className="absolute inset-0 bg-[#3D306F] bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  id="imageUpload"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={!isEditing && !isFirstVisit}
                />
              </div>

              {/* Personal Information */}
              <div className="w-full space-y-3">
                <div>
                  <label className="text-sm text-[#E1C3FF] hover:text-[#3D306F] transition-colors duration-300">Email</label>
                  <input
                    type="email"
                    className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-2 text-sm text-white disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:border-[#3D306F] hover:bg-[#3D306F]/20 transition-all duration-300"
                    value={teacherEmail}
                    disabled
                  />
                </div>

                <div>
                  <label className="text-sm text-[#E1C3FF] hover:text-[#3D306F] transition-colors duration-300">Location</label>
                  <input
                    type="text"
                    className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-2 text-sm text-white disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:border-[#3D306F] hover:bg-[#3D306F]/20 transition-all duration-300"
                    placeholder="Enter location"
                    onChange={handleChange}
                    name="location"
                    value={profile.location}
                    disabled={!isEditing && !isFirstVisit}
                  />
                </div>

                <div>
                  <label className="text-sm text-[#E1C3FF] hover:text-[#3D306F] transition-colors duration-300">Contact</label>
                  <input
                    type="tel"
                    className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-2 text-sm text-white disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:border-[#3D306F] hover:bg-[#3D306F]/20 transition-all duration-300"
                    value={teacherContact}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Profile Section */}
          <div className="w-full md:w-2/3 bg-[#0B142C] p-5 rounded-xl shadow-md shadow-[#9B30FF]/10 hover:shadow-[#9B30FF]/20 transition-all duration-300">
            <div className="space-y-4">
              <div>
                <h1 className="text-xl font-bold text-[#E1C3FF] mb-2 hover:text-[#3D306F] transition-colors duration-300">Bio</h1>
                <textarea
                  className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-3 text-sm text-white h-32 resize-none disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:border-[#3D306F] hover:bg-[#3D306F]/20 transition-all duration-300"
                  onChange={handleChange}
                  name="Bio"
                  value={profile.Bio}
                  disabled={!isEditing && !isFirstVisit}
                ></textarea>
              </div>

              <div>
                <h1 className="text-xl font-bold text-[#E1C3FF] mb-2 hover:text-[#3D306F] transition-colors duration-300">Social Links</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <input
                      placeholder="GitHub"
                      className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-2 text-sm text-white disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:border-[#3D306F] hover:bg-[#3D306F]/20 transition-all duration-300"
                      name="github"
                      onChange={handleChange}
                      value={profile.github}
                      disabled={!isEditing && !isFirstVisit}
                    />
                    <input
                      placeholder="LinkedIn"
                      className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-2 text-sm text-white disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:border-[#3D306F] hover:bg-[#3D306F]/20 transition-all duration-300"
                      name="linkedin"
                      onChange={handleChange}
                      value={profile.linkedin}
                      disabled={!isEditing && !isFirstVisit}
                    />
                  </div>
                  <div className="space-y-3">
                    <input
                      placeholder="Twitter"
                      className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-2 text-sm text-white disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:border-[#3D306F] hover:bg-[#3D306F]/20 transition-all duration-300"
                      name="twitter"
                      onChange={handleChange}
                      value={profile.twitter}
                      disabled={!isEditing && !isFirstVisit}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h1 className="text-xl font-bold text-[#E1C3FF] mb-2 hover:text-[#3D306F] transition-colors duration-300">Domain</h1>
                <Select
                  isMulti
                  options={domainOptions}
                  value={domainOptions.filter((option) =>
                    profile.domain.includes(option.value)
                  )}
                  onChange={handleDomainChange}
                  styles={customStyles}
                  isDisabled={!isEditing && !isFirstVisit}
                  className="basic-multi-select shadow-sm shadow-[#9B30FF]/10 hover:border-[#3D306F] transition-all duration-300"
                  classNamePrefix="select"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          type="button"
          className="px-5 py-2 bg-[#6D0BCF] hover:bg-[#3D306F] text-white rounded text-sm shadow-lg hover:shadow-[#3D306F]/50 transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
          onClick={() => {
            setIsEditing(true);
            setIsFirstVisit(true);
          }}
        >
          <span>Edit Profile</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
        <button
          type="submit"
          className="px-5 py-2 bg-[#6D0BCF] hover:bg-[#3D306F] text-white rounded text-sm shadow-lg hover:shadow-[#3D306F]/50 transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:hover:bg-[#6D0BCF] disabled:hover:shadow-none disabled:transform-none"
          disabled={!isEditing && !isFirstVisit}
        >
          <span>Save Changes</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </form>
  </div>
);

};

export default TeacherProfile;