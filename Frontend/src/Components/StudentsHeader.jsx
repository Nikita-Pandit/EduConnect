import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("studentId") || localStorage.getItem("teacherId");
  const [image, setImage] = useState("/images/default_image.jpg");
  const [flag, setFlag] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      if (localStorage.getItem("studentId")) {
        localStorage.removeItem("studentId");
      } else localStorage.removeItem("teacherId");
      localStorage.removeItem("token");
      navigate("/SignUp");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let response
        if(localStorage.getItem("teacherId")){
           response = await axios.get(`http://localhost:3002/api/teacherProfile/${userId}`)
        }
        else{
           response = await axios.get(
            `http://localhost:3002/api/Profile/${userId}`
          );
        }
        if (response.data.moreInfo.image) {
          setImage(`http://localhost:3002${response.data.moreInfo.image}`);
          setFlag(true);
        }
        
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    if (userId) {
      fetchProfile();
    }
    const handleProfileUpdate = () => {
      fetchProfile();
    };

    window.addEventListener("profileUpdated", handleProfileUpdate);

    return () => {
      window.removeEventListener("profileUpdated", handleProfileUpdate);
    };
  }, [userId]);

  return (
    <>
      <div className="mb-3">
        <div className="nav">
          <div>ABC</div>
          <div>
            <ul className=" flex gap-4 items-end">
              <li>
                <Link to="/">Home</Link>
              </li>
              {userId ? (
                <>
                  {localStorage.getItem("studentId") ? (
                    <li>
                      <Link to="/Profile">Profile</Link>
                    </li>
                  ) : (
                    <li>
                      <Link to="/TeacherProfile">Profile</Link>
                    </li>
                  )}
                  <li>
                    <Link to="/Projects">Projects</Link>
                  </li>
                  <li>
                    <Link to="/ResearchDoubts">Research Doubts</Link>
                  </li>
                  <li>
                    <Link to="/TeacherDashboard">Teacher Dashboard</Link>
                  </li>
                </>
              ) : (
                <>
                  <li
                    className="text-gray-500 cursor-not-allowed"
                    title="Login required"
                  >
                    Profile
                  </li>
                  <li
                    className="text-gray-500 cursor-not-allowed"
                    title="Login required"
                  >
                    Projects
                  </li>
                  <li
                    className="text-gray-500 cursor-not-allowed"
                    title="Login required"
                  >
                    Research Doubts
                  </li>
                  <li
                    className="text-gray-500 cursor-not-allowed"
                    title="Login required"
                  >
                    Teacher Dashboard
                  </li>
                </>
              )}
              {userId ? (
                flag ? (
                  <div className="relative">
                    <img
                      className="w-10 h-10 rounded-full object-contain"
                      src={image}
                      onClick={() => setIsDropdownOpen((prev) => !prev)}
                    />
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg">
                        <ul>
                          <li
                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-red-500"
                            onClick={handleLogout}
                          >
                            Log out
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      className="w-10 h-10 rounded-full object-contain"
                      src={image}
                      onClick={() => setIsDropdownOpen((prev) => !prev)}
                    />
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg">
                        <ul>
                          <li
                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-red-500"
                            onClick={handleLogout}
                          >
                            Log out
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                )
              ) : (
                <li>
                  <Link to="/SignUp">Sign Up</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentHeader;
