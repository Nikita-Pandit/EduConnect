import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select"; // Install via npm install react-select
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate=useNavigate();
  const [isEditing, setIsEditing] = useState(false); // NEW STATE
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
    {
      value: "Microservices Architecture",
      label: "Microservices Architecture",
    },
    { value: "IT Support", label: "IT Support" },
    { value: "E-commerce Development", label: "E-commerce Development" },
    { value: "Cloud Security", label: "Cloud Security" },
    { value: "Penetration Testing", label: "Penetration Testing" },
    { value: "Cryptography", label: "Cryptography" },
    { value: "Software Architecture", label: "Software Architecture" },
  ];

  const skillOptionsByDomain = {
    "Web Development": [
      { value: "HTML", label: "HTML" },
      { value: "CSS", label: "CSS" },
      { value: "JavaScript", label: "JavaScript" },
      { value: "React", label: "React" },
      { value: "Node.js", label: "Node.js" },
    ],
    "Data Science": [
      { value: "Python", label: "Python" },
      { value: "Pandas", label: "Pandas" },
      { value: "NumPy", label: "NumPy" },
      { value: "Matplotlib", label: "Matplotlib" },
    ],
    "Machine Learning": [
      { value: "TensorFlow", label: "TensorFlow" },
      { value: "PyTorch", label: "PyTorch" },
      { value: "Scikit-learn", label: "Scikit-learn" },
    ],
    "App Development": [
      { value: "Flutter", label: "Flutter" },
      { value: "React Native", label: "React Native" },
      { value: "Swift", label: "Swift" },
    ],
    "UI/UX Design": [
      { value: "Figma", label: "Figma" },
      { value: "Adobe XD", label: "Adobe XD" },
      { value: "Sketch", label: "Sketch" },
    ],
    Cybersecurity: [
      { value: "Ethical Hacking", label: "Ethical Hacking" },
      { value: "Kali Linux", label: "Kali Linux" },
      { value: "Penetration Testing", label: "Penetration Testing" },
    ],
    "Cloud Computing": [
      { value: "AWS", label: "AWS" },
      { value: "Azure", label: "Azure" },
      { value: "Google Cloud", label: "Google Cloud" },
    ],
    Blockchain: [
      { value: "Solidity", label: "Solidity" },
      { value: "Ethereum", label: "Ethereum" },
      { value: "Hyperledger", label: "Hyperledger" },
    ],
    "Game Development": [
      { value: "Unity", label: "Unity" },
      { value: "Unreal Engine", label: "Unreal Engine" },
      { value: "C#", label: "C#" },
    ],
    DevOps: [
      { value: "Docker", label: "Docker" },
      { value: "Kubernetes", label: "Kubernetes" },
      { value: "Jenkins", label: "Jenkins" },
    ],
    "Embedded Systems": [
      { value: "C", label: "C" },
      { value: "Embedded C", label: "Embedded C" },
      { value: "Arduino", label: "Arduino" },
    ],
    "Internet of Things": [
      { value: "Raspberry Pi", label: "Raspberry Pi" },
      { value: "MQTT", label: "MQTT" },
      { value: "Zigbee", label: "Zigbee" },
    ],
    "Artificial Intelligence": [
      { value: "Deep Learning", label: "Deep Learning" },
      { value: "NLP", label: "NLP" },
      { value: "Computer Vision", label: "Computer Vision" },
    ],
    "Big Data": [
      { value: "Hadoop", label: "Hadoop" },
      { value: "Spark", label: "Spark" },
      { value: "Kafka", label: "Kafka" },
    ],
    "Quantum Computing": [
      { value: "Qiskit", label: "Qiskit" },
      { value: "Quantum Algorithms", label: "Quantum Algorithms" },
      { value: "IBM Quantum", label: "IBM Quantum" },
    ],
    "AR/VR": [
      { value: "Unity 3D", label: "Unity 3D" },
      { value: "Blender", label: "Blender" },
      { value: "Oculus SDK", label: "Oculus SDK" },
    ],
    Bioinformatics: [
      { value: "Biopython", label: "Biopython" },
      { value: "Genomics", label: "Genomics" },
      { value: "Protein Modeling", label: "Protein Modeling" },
    ],
    Networking: [
      { value: "CCNA", label: "CCNA" },
      { value: "Routing & Switching", label: "Routing & Switching" },
      { value: "Firewall Management", label: "Firewall Management" },
    ],
    "Database Administration": [
      { value: "MySQL", label: "MySQL" },
      { value: "PostgreSQL", label: "PostgreSQL" },
      { value: "MongoDB", label: "MongoDB" },
    ],
    "Software Testing": [
      { value: "Selenium", label: "Selenium" },
      { value: "JUnit", label: "JUnit" },
      { value: "TestNG", label: "TestNG" },
    ],
    "Game AI": [
      { value: "Reinforcement Learning", label: "Reinforcement Learning" },
      { value: "Pathfinding Algorithms", label: "Pathfinding Algorithms" },
      { value: "Behavior Trees", label: "Behavior Trees" },
    ],
    Robotics: [
      { value: "ROS", label: "ROS" },
      { value: "Gazebo", label: "Gazebo" },
      { value: "Arduino", label: "Arduino" },
    ],
    "Full Stack Development": [
      { value: "React.js", label: "React.js" },
      { value: "Express.js", label: "Express.js" },
      { value: "MongoDB", label: "MongoDB" },
    ],
    "IT Support": [
      { value: "Windows Server", label: "Windows Server" },
      { value: "Linux Administration", label: "Linux Administration" },
      { value: "Technical Support", label: "Technical Support" },
    ],
    "Cloud Security": [
      { value: "IAM", label: "IAM" },
      { value: "Cloud Firewall", label: "Cloud Firewall" },
      { value: "Zero Trust Security", label: "Zero Trust Security" },
    ],
    Cryptography: [
      { value: "AES Encryption", label: "AES Encryption" },
      { value: "RSA", label: "RSA" },
      { value: "Hashing", label: "Hashing" },
    ],
  };

  const handleDomainChange = (selectedOptions) => {
    const selectedDomains = selectedOptions.map((option) => option.value);

    setProfile((prevProfile) => {
      const updatedSkills = Array.isArray(prevProfile.skills)
        ? prevProfile.skills.filter((skill) =>
            selectedDomains.some((domain) =>
              skillOptionsByDomain[domain]?.some((opt) => opt.value === skill)
            )
          )
        : []; // Ensures `skills` is always an array before filtering

      return {
        ...prevProfile,
        domain: selectedDomains,
        skills: updatedSkills, // Retain only the relevant skills
      };
    });
  };


  const handleSkillsChange = (selectedOptions) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      skills: selectedOptions.map((option) => option.value),
    }));
  };

  const id = localStorage.getItem("studentId") || "defaultID";

  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentContact, setStudentContact] = useState("");
  const [profile, setProfile] = useState({
    name: "",
    Bio: "",
    github: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    leetcode: "",
    projects: "",
    skills: [],
    domain: "",
    location: "",
    branch: "",
    selectYear: "",
    image: "/images/default_image.jpg",
    selectStudent: {},
    rollNo: "",
    CGPA:""
  });

  const fetchStudentName = async () => {
    try {
      console.log("id in profile",id);
      const response = await axios.get(
        `http://localhost:3002/api/student/${id}`
      );
      setStudentName(response.data.name);
      setStudentEmail(response.data.email);
      setStudentContact(response.data.contact);
      setProfile((prevProfile) => ({
        ...prevProfile,
        name: response.data.name,
      }));
    } catch (error) {
      console.error("Error fetching student name:", error);
    }
  };



  const fetchProfileInfo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3002/api/Profile/${id}`
      );
      if (response.data.success) {
        setProfile({
          ...response.data.moreInfo,
          skills: Array.isArray(response.data.moreInfo.skills)
            ? response.data.moreInfo.skills
            : [], // Ensures `skills` is always an array
        });
        setIsFirstVisit(false);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error in fetching profile info:", error);
    }
  };

  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/api/Profile/${id}`
        );
        if (response.data.success) {
          setProfile(response.data.moreInfo);
          setIsFirstVisit(false);
          setIsEditing(false);
        }
      } catch (error) {
        console.error("Error in fetching profile info:", error);
      }
    };
    fetchStudentName();
    fetchProfileInfo();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    console.log("first");
    try {
      console.log("first");
      const response = await axios.post(
        `http://localhost:3002/api/Profile/${id}`,
        profile
      );
      // toast.success("Profile info saved in the database successfully.", {
      //   style: { color: "#ff5722" },
      // });
      setIsEditing(false);
      setIsFirstVisit(false);
      // Emit custom event
      const event = new Event("profileUpdated");
      window.dispatchEvent(event); // Dispatch the event globally
      setIsEditing(false); // Exit edit mode after saving
      navigate('/StudentDashboard');
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
      console.log("student img");
      const response = await axios.post(
        `http://localhost:3002/api/Profile/${id}/uploadImage`,
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
      backgroundColor: "#374151",
      color: "#FFFFFF",
      border: "2px solid rgb(80, 158, 179)",
      borderRadius: "10px",
      padding: "10px",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#71717A",
      color: "#FFFFFF",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#374151" : "#1F2937",
      color: "#FFFFFF",
      "&:active": {
        backgroundColor: "#4B5563",
      },
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#71717A",
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
        backgroundColor: "#4B5563",
        color: "#FFFFFF",
      },
    }),
  };

  // return (
  //   <>
  //     <form onSubmit={handleSave}>
  //       <ToastContainer />
  //       <div className="profile-container p-5 bg-zinc-700 flex">
  //         <div className="left-profile p-3 mt-10">
  //           <h4 className="student-name">
  //             {studentName ? `Welcome, ${studentName}` : "Loading..."}
  //           </h4>
  //           <div className="flex items-center justify-center mt-3 mb-3">
  //             <img
  //               src={
  //                 profile.image.startsWith("/uploads/")
  //                   ? `http://localhost:3002${profile.image}`
  //                   : `http://localhost:3002/images/default_image.jpg`
  //               }
  //               alt="Profile"
  //               className="profile-image object-contain rounded-lg"
  //               onClick={() =>
  //                 (isEditing || isFirstVisit) &&
  //                 document.getElementById("imageUpload").click()
  //               }
  //               style={{
  //                 width: "180px",
  //                 height: "180px",
  //                 cursor: isEditing ? "pointer" : "default",
  //               }}
  //             />
  //             <input
  //               type="file"
  //               id="imageUpload"
  //               style={{ display: "none" }}
  //               onChange={handleImageChange}
  //               disabled={!isEditing && !isFirstVisit} // Disable file input if not in editing mode
  //             />
  //           </div>
  //           <div className="flex flex-col gap-3">
  //             <input
  //               type="email"
  //               className="input-links bg-zinc-500"
  //               value={studentEmail}
  //               placeholder="KIIT mail"
  //             />
  //             <input
  //               type="text"
  //               className="input-links bg-zinc-500"
  //               value={profile.rollNo}
  //               placeholder="KIIT Roll Number"
  //               name="rollNo"
  //               onChange={handleChange}
  //               required
  //               disabled={!isEditing && !isFirstVisit}
  //             />
  //             <input
  //               className="input-links bg-zinc-500"
  //               type="text"
  //               placeholder="Location"
  //               onChange={handleChange}
  //               required
  //               name="location"
  //               value={profile.location}
  //               disabled={!isEditing && !isFirstVisit}
  //             />
  //             <input
  //               type="tel"
  //               className="input-links bg-zinc-500"
  //               value={studentContact}
  //               placeholder="Contact"
  //             />
  //             <input
  //               type="text"
  //               className="input-links bg-zinc-500"
  //               placeholder="Branch"
  //               onChange={handleChange}
  //               required
  //               name="branch"
  //               value={profile.branch}
  //               disabled={!isEditing && !isFirstVisit}
  //             />
  //             <input
  //               type="number"
  //               className="input-links bg-zinc-500"
  //               placeholder="CGPA"
  //               onChange={handleChange}
  //               required
  //               name="CGPA"
  //               value={profile.CGPA}
  //               disabled={!isEditing && !isFirstVisit}
  //             />
  //             <select
  //               value={profile.selectYear}
  //               onChange={handleChange}
  //               name="selectYear"
  //               id="year"
  //               required
  //               className="input-links bg-zinc-500"
  //               disabled={!isEditing && !isFirstVisit}
  //             >
  //               <option value="">Select Year</option>
  //               <option value="1st year">1st Year</option>
  //               <option value="2nd year">2nd Year</option>
  //               <option value="3rd year">3rd Year</option>
  //               <option value="4th year">4th Year</option>
  //             </select>
  //           </div>
  //         </div>

  //         <div className="bg-zinc-500 border-2 rounded-md outline-none w-full right-profile-info p-5">
  //           <h1 className="text-3xl text-start mb-3">Write short bio</h1>
  //           <textarea
  //             className="outline-none bg-zinc-700 w-full border-2 rounded-md"
  //             onChange={handleChange}
  //             name="Bio"
  //             value={profile.Bio}
  //             required
  //             disabled={!isEditing && !isFirstVisit}
  //           ></textarea>
  //           <h1 className="text-2xl text-start mt-3 mb-2">
  //             Social media links
  //           </h1>
  //           <div className="border-blue-300 flex flex-row bg-zinc-700 p-5 border-2 rounded-md outline-none">
  //             <div className="space-y-5 ml-20">
  //               <input
  //                 placeholder="Github Link"
  //                 className="input-links bg-zinc-500"
  //                 name="github"
  //                 onChange={handleChange}
  //                 value={profile.github}
  //                 disabled={!isEditing && !isFirstVisit}
  //               />
  //               <input
  //                 placeholder="LinkedIn Link"
  //                 className="input-links bg-zinc-500"
  //                 name="linkedin"
  //                 onChange={handleChange}
  //                 value={profile.linkedin}
  //                 disabled={!isEditing && !isFirstVisit}
  //               />
  //               <input
  //                 placeholder="Leetcode Link"
  //                 className="input-links bg-zinc-500"
  //                 onChange={handleChange}
  //                 name="leetcode"
  //                 value={profile.leetcode}
  //                 disabled={!isEditing && !isFirstVisit}
  //               />
  //             </div>
  //             <div className="space-y-5 me-20">
  //               <input
  //                 placeholder="Instagram Link"
  //                 onChange={handleChange}
  //                 className="bg-zinc-500 input-links"
  //                 name="instagram"
  //                 value={profile.instagram}
  //                 disabled={!isEditing && !isFirstVisit}
  //               />
  //               <input
  //                 placeholder="Twitter Link"
  //                 onChange={handleChange}
  //                 className="bg-zinc-500 input-links"
  //                 name="twitter"
  //                 value={profile.twitter}
  //                 disabled={!isEditing && !isFirstVisit}
  //               />
  //             </div>
  //           </div>
  //           <div>
  //             <h1 className="text-2xl text-start mt-3 mb-2">
  //               Ongoing Projects
  //             </h1>
  //             <textarea
  //               className="outline-none bg-zinc-700 w-full border-2 rounded-md"
  //               onChange={handleChange}
  //               name="projects"
  //               value={profile.projects}
  //               disabled={!isEditing && !isFirstVisit}
  //             ></textarea>
  //           </div>
  //           <h1 className="text-2xl text-start mt-3 mb-2">Domain</h1>
  //           <Select
  //             isMulti
  //             options={domainOptions}
  //             value={domainOptions.filter((option) =>
  //               profile.domain.includes(option.value)
  //             )}
  //             onChange={handleDomainChange}
  //             styles={customStyles}
  //             isDisabled={!isEditing && !isFirstVisit}
  //           />

  //           <h1 className="text-2xl text-start mt-3 mb-2">Skills</h1>
  //           <Select
  //             isMulti
  //             options={
  //               profile.domain.length > 0
  //                 ? profile.domain.flatMap(
  //                     (domain) => skillOptionsByDomain[domain] || []
  //                   )
  //                 : []
  //             }
  //             value={Object.values(skillOptionsByDomain)
  //               .flat()
  //               .filter((option) =>
  //                 Array.isArray(profile.skills)
  //                   ? profile.skills.includes(option.value)
  //                   : false
  //               )}
  //             onChange={handleSkillsChange}
  //             styles={customStyles}
  //             isDisabled={!isEditing && !isFirstVisit}
  //           />
  //         </div>
  //       </div>
  //       <div className="flex justify-center mt-5">
  //         <button
  //           type="button"
  //           className="text-center px-5 py-2 bg-green-500 rounded-lg mr-3"
  //           // onClick={() => setIsEditing(true)} // ENABLE EDIT MODE
  //           onClick={() => {
  //             setIsEditing(true);
  //             setIsFirstVisit(true);
  //           }}
  //         >
  //           Edit
  //         </button>
  //         <button
  //           type="submit"
  //           className="text-center px-5 py-2 bg-blue-500 rounded-lg"
  //           disabled={!isEditing && !isFirstVisit}
  //         >
  //           Save
  //         </button>
  //       </div>
  //     </form>
  //   </>
  // );

  return (
    <div className="min-h-screen bg-[#090c1b] text-white p-6">
      <form onSubmit={handleSave}>
        <ToastContainer />
        <div className="profile-container p-6 bg-[#0d1126] rounded-xl shadow-2xl border-2 border-[#9B30FF]">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Profile Section */}
            <div className="w-full lg:w-1/3 p-6 bg-[#0d1126] rounded-xl border border-[#9B30FF]">
              <div className="flex flex-col items-center">
                <h4 className="text-2xl font-bold text-[#E1C3FF] mb-6 text-center">
                  {studentName ? `Welcome, ${studentName}` : "Loading..."}
                </h4>
                
                {/* Profile Image */}
                <div className="relative mb-6">
                  <div className="relative overflow-hidden rounded-full border-4 border-[#9B30FF] w-44 h-44">
                    <img
                      src={
                        profile.image.startsWith("/uploads/")
                          ? `http://localhost:3002${profile.image}`
                          : `http://localhost:3002/images/default_image.jpg`
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onClick={() =>
                        (isEditing || isFirstVisit) &&
                        document.getElementById("imageUpload").click()
                      }
                      style={{
                        cursor: (isEditing || isFirstVisit) ? "pointer" : "default",
                      }}
                    />
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
                <div className="w-full space-y-4">
                  <input
                    type="email"
                    className="w-full bg-[#0d1126] border-2 border-[#9B30FF] rounded-lg p-3 text-white disabled:opacity-70"
                    value={studentEmail}
                    disabled
                  />
                  <input
                    type="text"
                    className="w-full bg-[#0d1126] border-2 border-[#9B30FF] rounded-lg p-3 text-white disabled:opacity-70"
                    value={profile.rollNo}
                    name="rollNo"
                    onChange={handleChange}
                    required
                    disabled={!isEditing && !isFirstVisit}
                  />
                  <input
                    type="text"
                    className="w-full bg-[#0d1126] border-2 border-[#9B30FF] rounded-lg p-3 text-white disabled:opacity-70"
                    placeholder="Location"
                    onChange={handleChange}
                    required
                    name="location"
                    value={profile.location}
                    disabled={!isEditing && !isFirstVisit}
                  />
                  <input
                    type="tel"
                    className="w-full bg-[#0d1126] border-2 border-[#9B30FF] rounded-lg p-3 text-white disabled:opacity-70"
                    value={studentContact}
                    disabled
                  />
                  <input
                    type="text"
                    className="w-full bg-[#0d1126] border-2 border-[#9B30FF] rounded-lg p-3 text-white disabled:opacity-70"
                    placeholder="Branch"
                    onChange={handleChange}
                    required
                    name="branch"
                    value={profile.branch}
                    disabled={!isEditing && !isFirstVisit}
                  />
                  <input
                    type="number"
                    className="w-full bg-[#0d1126] border-2 border-[#9B30FF] rounded-lg p-3 text-white disabled:opacity-70"
                    placeholder="CGPA"
                    onChange={handleChange}
                    required
                    name="CGPA"
                    value={profile.CGPA}
                    disabled={!isEditing && !isFirstVisit}
                  />
                  <select
                    value={profile.selectYear}
                    onChange={handleChange}
                    name="selectYear"
                    className="w-full bg-[#0d1126] border-2 border-[#9B30FF] rounded-lg p-3 text-white disabled:opacity-70"
                    disabled={!isEditing && !isFirstVisit}
                  >
                    <option value="">Select Year</option>
                    <option value="1st year">1st Year</option>
                    <option value="2nd year">2nd Year</option>
                    <option value="3rd year">3rd Year</option>
                    <option value="4th year">4th Year</option>
                  </select>
                </div>
              </div>
            </div>
  
            {/* Right Profile Section */}
            <div className="w-full lg:w-2/3 bg-[#0d1126] p-6 rounded-xl border-2 border-[#9B30FF]">
              <h1 className="text-2xl font-bold text-[#E1C3FF] mb-4">Write short bio</h1>
              <textarea
                className="w-full bg-[#0d1126] border-2 border-[#9B30FF] rounded-lg p-4 text-white h-40 resize-none disabled:opacity-70"
                onChange={handleChange}
                name="Bio"
                value={profile.Bio}
                required
                disabled={!isEditing && !isFirstVisit}
              ></textarea>
              
              <h1 className="text-2xl font-bold text-[#E1C3FF] mt-8 mb-4">Social media links</h1>
              <div className="bg-[#0d1126] p-6 rounded-xl border-2 border-[#9B30FF]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <input
                      placeholder="Github Link"
                      className="w-full bg-[#0d1126] border-2 border-[#9B30FF] rounded-lg p-3 text-white disabled:opacity-70"
                      name="github"
                      onChange={handleChange}
                      value={profile.github}
                      disabled={!isEditing && !isFirstVisit}
                    />
                    <input
                      placeholder="LinkedIn Link"
                      className="w-full bg-[#0d1126] border-2 border-[#9B30FF] rounded-lg p-3 text-white disabled:opacity-70"
                      name="linkedin"
                      onChange={handleChange}
                      value={profile.linkedin}
                      disabled={!isEditing && !isFirstVisit}
                    />
                    <input
                      placeholder="Leetcode Link"
                      className="w-full bg-[#0d1126] border-2 border-[#9B30FF] rounded-lg p-3 text-white disabled:opacity-70"
                      name="leetcode"
                      onChange={handleChange}
                      value={profile.leetcode}
                      disabled={!isEditing && !isFirstVisit}
                    />
                  </div>
                  <div className="space-y-4">
                    <input
                      placeholder="Instagram Link"
                      className="w-full bg-[#0d1126] border-2 border-[#9B30FF] rounded-lg p-3 text-white disabled:opacity-70"
                      name="instagram"
                      onChange={handleChange}
                      value={profile.instagram}
                      disabled={!isEditing && !isFirstVisit}
                    />
                    <input
                      placeholder="Twitter Link"
                      className="w-full bg-[#0d1126] border-2 border-[#9B30FF] rounded-lg p-3 text-white disabled:opacity-70"
                      name="twitter"
                      onChange={handleChange}
                      value={profile.twitter}
                      disabled={!isEditing && !isFirstVisit}
                    />
                  </div>
                </div>
              </div>
              
              <h1 className="text-2xl font-bold text-[#E1C3FF] mt-8 mb-4">Ongoing Projects</h1>
              <textarea
                className="w-full bg-[#0d1126] border-2 border-[#9B30FF] rounded-lg p-4 text-white h-32 resize-none disabled:opacity-70"
                onChange={handleChange}
                name="projects"
                value={profile.projects}
                disabled={!isEditing && !isFirstVisit}
              ></textarea>
              
              <h1 className="text-2xl font-bold text-[#E1C3FF] mt-8 mb-4">Domain</h1>
              <div className="mb-6">
                <Select
                  isMulti
                  options={domainOptions}
                  value={domainOptions.filter((option) =>
                    profile.domain.includes(option.value)
                  )}
                  onChange={handleDomainChange}
                  styles={customStyles}
                  isDisabled={!isEditing && !isFirstVisit}
                />
              </div>
              
              <h1 className="text-2xl font-bold text-[#E1C3FF] mt-8 mb-4">Skills</h1>
              <div className="mb-6">
                <Select
                  isMulti
                  options={
                    profile.domain.length > 0
                      ? profile.domain.flatMap(
                          (domain) => skillOptionsByDomain[domain] || []
                        )
                      : []
                  }
                  value={Object.values(skillOptionsByDomain)
                    .flat()
                    .filter((option) =>
                      Array.isArray(profile.skills)
                        ? profile.skills.includes(option.value)
                        : false
                    )}
                  onChange={handleSkillsChange}
                  styles={customStyles}
                  isDisabled={!isEditing && !isFirstVisit}
                />
              </div>
            </div>
          </div>
  
          {/* Buttons positioned at the bottom - matching your original functionality */}
          
        </div>
        <div className="flex justify-center mt-5">
            <button
              type="button"
              className="text-center px-5 py-2 bg-[#6D0BCF] rounded-lg mr-3"
              onClick={() => {
                setIsEditing(true);
                setIsFirstVisit(true);
              }}
            >
              Edit
            </button>
            <button
              type="submit"
              className="text-center px-5 py-2 bg-[#6D0BCF] rounded-lg"
              disabled={!isEditing && !isFirstVisit}
            >
              Save
            </button>
          </div>
      </form>
    </div>
  );
};

export default Profile;
