import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { useNavigate } from "react-router-dom";


const TeacherProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const navigate = useNavigate();

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
       { value: "Deep Learning", label: "Deep Learning" },
           { value: "Data Mining", label: "Data Mining" },
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
    Google_Scholar:"",
    domain: "",
    location: "",
    image: "/images/default_image.jpg",
    rank: {},
  });

  const fetchTeacherName = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/teacher/${teacherId}`
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
        `${backendUrl}/api/teacherProfile/${teacherId}`
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
        `${backendUrl}/api/teacherProfile/${teacherId}`,
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
      navigate("/TeacherDashboard");
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
        `${backendUrl}/api/teacherProfile/${teacherId}/uploadImage`,
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
  <div className="min-h-screen bg-[#091024] text-white p-6  w-full">
    <form onSubmit={handleSave} className="max-w-6xl mt-10 mx-auto">
      <ToastContainer />
      <div className="profile-container w-full h-full p-8 bg-[#0d1126] rounded-xl  shadow-lg shadow-[#9B30FF]/20 hover:shadow-[#9B30FF]/30 transition-all duration-300">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Profile Section */}
          <div className="w-full md:w-1/3 p-5 bg-[#0B142C] rounded-xl shadow-md shadow-[#9B30FF]/10 hover:shadow-[#9B30FF]/20 transition-all duration-300">
            <div className="flex flex-col items-center">
              <h4 className="text-xl font-bold text-[#E1C3FF] mb-4 text-center hover:text-[#3D306F] transition-colors duration-300">
                {teacherName ? `Welcome, ${teacherName}` : "Loading..."}
              </h4>
{/* Profile Image Section */}
<div className="relative mb-4">
  <div 
    className="relative overflow-hidden rounded-full border-4 border-[#9B30FF] w-36 h-36 shadow-lg shadow-[#9B30FF]/20 hover:shadow-[#9B30FF]/40 transition-all duration-300 group"
    onClick={() => {
      if (isEditing || isFirstVisit) {
        document.getElementById("imageUpload").click();
      }
    }}
    style={{
      cursor: (isEditing || isFirstVisit) ? "pointer" : "default",
    }}
  >
    <img
      src={
        profile.image.startsWith("/uploads/")
          ? `${backendUrl}${profile.image}`
          : `${backendUrl}/images/default_image.jpg`
      }
      alt="Profile"
      className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-300"
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
    accept="image/*"
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
                      placeholder="Google Scholar"
                      className="w-full bg-[#0d1126] border border-[#9B30FF] rounded p-2 text-sm text-white disabled:opacity-70 shadow-sm shadow-[#9B30FF]/10 hover:border-[#3D306F] hover:bg-[#3D306F]/20 transition-all duration-300"
                      name="Google_Scholar"
                      onChange={handleChange}
                      value={profile.Google_Scholar}
                      disabled={!isEditing && !isFirstVisit}
                    />
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