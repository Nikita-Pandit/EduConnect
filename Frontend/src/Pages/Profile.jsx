import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select"; // Install via npm install react-select
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
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
    CGPA: "",
  });

  const fetchStudentName = async () => {
    try {
      console.log("id in profile", id);
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
    console.log("first");
    try {
      const response = await axios.post(
        `http://localhost:3002/api/Profile/${id}`,
        profile
      );
      toast.success("Profile info saved in the database successfully.", {
        style: { color: "#ff5722" },
      });
      setIsEditing(false);
      setIsFirstVisit(false);
      // Emit custom event
      const event = new Event("profileUpdated");
      window.dispatchEvent(event); // Dispatch the event globally
      setIsEditing(false); // Exit edit mode after saving
      navigate("/StudentDashboard");
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
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#0d1126",
      borderColor: state.isFocused ? "#9B30FF" : "#9B30FF",
      boxShadow: state.isFocused ? "0 0 0 1px #9B30FF" : "none",
      "&:hover": {
        borderColor: "#9B30FF",
        boxShadow: "0 0 10px rgba(155, 48, 255, 0.2)",
      },
      minHeight: "40px",
      borderRadius: "6px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#6D0BCF"
        : state.isFocused
        ? "#3D306F"
        : "#0B142C",
      color: state.isSelected ? "white" : "#E1C3FF",
      "&:active": {
        backgroundColor: "#46008B",
      },
      padding: "8px 12px",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#0B142C",
      border: "1px solid #9B30FF",
      borderRadius: "6px",
      boxShadow: "0 4px 6px rgba(155, 48, 255, 0.2)",
      zIndex: 9999,
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#3D306F",
      borderRadius: "4px",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "white",
      padding: "2px 6px",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#E1C3FF",
      ":hover": {
        backgroundColor: "#46008B",
        color: "white",
      },
    }),
    input: (provided) => ({
      ...provided,
      color: "white",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#E1C3FF",
      opacity: 0.7,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#E1C3FF",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: "#9B30FF",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#9B30FF",
      "&:hover": {
        color: "#B24AFF",
      },
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: "#9B30FF",
      "&:hover": {
        color: "#B24AFF",
      },
    }),
  };

  return (
    <div className="min-h-screen bg-[#091024] text-white p-6 w-full mt-10">
      <form onSubmit={handleSave} className="max-w-6xl mx-auto">
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
                  {/* Clickable container - moved onClick here */}
                  <div
                    className="relative overflow-hidden rounded-full border-4 border-[#9B30FF] w-36 h-36 shadow-lg shadow-[#9B30FF]/30 hover:shadow-[#9B30FF]/50 transition-all duration-300 group"
                    onClick={() => {
                      if (isEditing || isFirstVisit) {
                        document.getElementById("imageUpload").click();
                      }
                    }}
                    style={{
                      cursor: isEditing || isFirstVisit ? "pointer" : "default",
                    }}
                  >
                    {/* Image - removed onClick from here */}
                    <img
                      src={
                        profile.image.startsWith("/uploads/")
                          ? `http://localhost:3002${profile.image}`
                          : `http://localhost:3002/images/default_image.jpg`
                      }
                      alt="Profile"
                      className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-300"
                    />

                    {/* Edit overlay */}
                    {(isEditing || isFirstVisit) && (
                      <div className="absolute inset-0 bg-[#3D306F] bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all duration-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* File input - removed disabled prop */}
                  <input
                    type="file"
                    id="imageUpload"
                    className="hidden"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </div>

                {/* Personal Information */}
                <div className="w-full space-y-3">
                  <div>
                    <label className="text-sm text-[#E1C3FF] hover:text-[#3D306F] transition-colors duration-300">
                      KIIT Mail
                    </label>
                    <input
                      type="email"
                      className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-2 text-sm text-white disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:bg-[#3D306F]/20 transition-all duration-300"
                      value={studentEmail}
                      placeholder="KIIT mail"
                      disabled
                    />
                  </div>

                  <div>
                    <label className="text-sm text-[#E1C3FF] hover:text-[#3D306F] transition-colors duration-300">
                      Roll Number
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-2 text-sm text-white disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:bg-[#3D306F]/20 transition-all duration-300"
                      placeholder="KIIT Roll Number"
                      name="rollNo"
                      onChange={handleChange}
                      required
                      value={profile.rollNo}
                      disabled={!isEditing && !isFirstVisit}
                    />
                  </div>

                  <div>
                    <label className="text-sm text-[#E1C3FF] hover:text-[#3D306F] transition-colors duration-300">
                      Location
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-2 text-sm text-white disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:bg-[#3D306F]/20 transition-all duration-300"
                      placeholder="Location"
                      onChange={handleChange}
                      required
                      name="location"
                      value={profile.location}
                      disabled={!isEditing && !isFirstVisit}
                    />
                  </div>

                  <div>
                    <label className="text-sm text-[#E1C3FF] hover:text-[#3D306F] transition-colors duration-300">
                      Contact
                    </label>
                    <input
                      type="tel"
                      className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-2 text-sm text-white disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:bg-[#3D306F]/20 transition-all duration-300"
                      value={studentContact}
                      placeholder="Contact"
                      disabled
                    />
                  </div>

                  <div>
                    <label className="text-sm text-[#E1C3FF] hover:text-[#3D306F] transition-colors duration-300">
                      Branch
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-2 text-sm text-white disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:bg-[#3D306F]/20 transition-all duration-300"
                      placeholder="Branch"
                      onChange={handleChange}
                      required
                      name="branch"
                      value={profile.branch}
                      disabled={!isEditing && !isFirstVisit}
                    />
                  </div>

                  <div>
                    <label className="text-sm text-[#E1C3FF] hover:text-[#3D306F] transition-colors duration-300">
                      CGPA
                    </label>
                    <input
                      type="number"
                      className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-2 text-sm text-white disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:bg-[#3D306F]/20 transition-all duration-300"
                      placeholder="CGPA"
                      onChange={handleChange}
                      required
                      name="CGPA"
                      value={profile.CGPA}
                      disabled={!isEditing && !isFirstVisit}
                    />
                  </div>

                  <div>
                    <label className="text-sm text-[#E1C3FF] hover:text-[#3D306F] transition-colors duration-300">
                      Year
                    </label>
                    <select
                      value={profile.selectYear}
                      onChange={handleChange}
                      name="selectYear"
                      id="year"
                      required
                      className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-2 text-sm text-white disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:bg-[#3D306F]/20 transition-all duration-300"
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
            </div>

            {/* Right Profile Section */}
            <div className="w-full md:w-2/3 bg-[#0B142C] p-5 rounded-xl shadow-lg shadow-[#9B30FF]/20 hover:shadow-[#9B30FF]/40 transition-all duration-300">
              <div className="space-y-4">
                <div>
                  <h1 className="text-xl font-bold text-[#E1C3FF] mb-2 hover:text-[#3D306F] transition-colors duration-300">
                    Bio
                  </h1>
                  <textarea
                    className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-3 text-sm text-white h-32 resize-none disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:bg-[#3D306F]/20 transition-all duration-300"
                    onChange={handleChange}
                    name="Bio"
                    value={profile.Bio}
                    required
                    disabled={!isEditing && !isFirstVisit}
                  ></textarea>
                </div>

                <div>
                  <h1 className="text-xl font-bold text-[#E1C3FF] mb-2 hover:text-[#3D306F] transition-colors duration-300">
                    Social Links
                  </h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <input
                        placeholder="GitHub"
                        className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-2 text-sm text-white disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:bg-[#3D306F]/20 transition-all duration-300"
                        name="github"
                        onChange={handleChange}
                        value={profile.github}
                        disabled={!isEditing && !isFirstVisit}
                      />
                      <input
                        placeholder="LinkedIn"
                        className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-2 text-sm text-white disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:bg-[#3D306F]/20 transition-all duration-300"
                        name="linkedin"
                        onChange={handleChange}
                        value={profile.linkedin}
                        disabled={!isEditing && !isFirstVisit}
                      />
                      <input
                        placeholder="Leetcode"
                        className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-2 text-sm text-white disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:bg-[#3D306F]/20 transition-all duration-300"
                        onChange={handleChange}
                        name="leetcode"
                        value={profile.leetcode}
                        disabled={!isEditing && !isFirstVisit}
                      />
                    </div>
                    <div className="space-y-3">
                      <input
                        placeholder="Instagram"
                        className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-2 text-sm text-white disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:bg-[#3D306F]/20 transition-all duration-300"
                        onChange={handleChange}
                        name="instagram"
                        value={profile.instagram}
                        disabled={!isEditing && !isFirstVisit}
                      />
                      <input
                        placeholder="Twitter"
                        className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-2 text-sm text-white disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:bg-[#3D306F]/20 transition-all duration-300"
                        onChange={handleChange}
                        name="twitter"
                        value={profile.twitter}
                        disabled={!isEditing && !isFirstVisit}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h1 className="text-xl font-bold text-[#E1C3FF] mb-2 hover:text-[#3D306F] transition-colors duration-300">
                    Ongoing Projects
                  </h1>
                  <textarea
                    className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-3 text-sm text-white h-32 resize-none disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:bg-[#3D306F]/20 transition-all duration-300"
                    onChange={handleChange}
                    name="projects"
                    value={profile.projects}
                    disabled={!isEditing && !isFirstVisit}
                  ></textarea>
                </div>

                <div>
                  <h1 className="text-xl font-bold text-[#E1C3FF] mb-2 hover:text-[#3D306F] transition-colors duration-300">
                    Domain
                  </h1>
                  <Select
                    isMulti
                    options={domainOptions}
                    value={domainOptions.filter((option) =>
                      profile.domain.includes(option.value)
                    )}
                    onChange={handleDomainChange}
                    styles={customStyles}
                    isDisabled={!isEditing && !isFirstVisit}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </div>

                <div>
                  <h1 className="text-xl font-bold text-[#E1C3FF] mb-2 hover:text-[#3D306F] transition-colors duration-300">
                    Skills
                  </h1>
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
                    className="basic-multi-select"
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
            className="px-5 py-2 bg-[#6D0BCF] hover:bg-[#3D306F] text-white rounded text-sm shadow-lg hover:shadow-[#3D306F]/50 transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-1"
            onClick={() => {
              setIsEditing(true);
              setIsFirstVisit(true);
            }}
          >
            <span>Edit Profile</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-[#6D0BCF] hover:bg-[#3D306F] text-white rounded text-sm shadow-lg hover:shadow-[#3D306F]/50 transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-1 disabled:opacity-50 disabled:hover:bg-[#6D0BCF] disabled:hover:shadow-none disabled:transform-none"
            disabled={!isEditing && !isFirstVisit}
          >
            <span>Save Changes</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
