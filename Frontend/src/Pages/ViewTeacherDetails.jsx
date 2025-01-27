import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ViewTeacherDetails = () => {
  const location = useLocation();
  const viewTeacherId =
    location?.state?.teacherID ||
    localStorage.getItem("teacherId") ||
    "defaultID";
  // localStorage.setItem("teacherId", viewTeacherId);
  console.log("view more details teacher: ", viewTeacherId);

  const [teacherName, setTeacherName] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherContact, setTeacherContact] = useState("");
  const [isRanked, setIsRanked] = useState(false);
  // const [teacherRank, setTeacherRank] = useState(0);

  const [profile, setProfile] = useState({
    name: "",
    Bio: "",
    github: "",
    linkedin: "",
    twitter: "",
    domain: "",
    location: "",
    rank: {},
  });

  const [showModal, setShowModal] = useState(false);

  const fetchTeacherName = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3002/api/teacher/${viewTeacherId}`
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
        `http://localhost:3002/api/teacherProfile/${viewTeacherId}`
      );
      setProfile((prevProfile) => ({
        ...prevProfile,
        ...response.data.moreInfo,
      }));
    } catch (error) {
      console.error("Error in fetching profile info:", error);
    }
  };

  useEffect(() => {
    fetchTeacherName();
    fetchTeacherProfileInfo();
  }, [viewTeacherId]);

  // const saveRank = async () => {
  //   const response=axios.post(
  //     `http://localhost:3002/api/teacherRank/${teacherRank,localStorage.getItem("studentId")}`,
  //     profile
  //   );
  // }
  const saveRank = async (rank) => {
    try {
      const response = await axios.post(
        `http://localhost:3002/api/teacherRank`,
        {
          teacherRank: rank,
          studentId: localStorage.getItem("studentId"),
          viewTeacherId
        }
      );
      console.log("Rank saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving rank:", error);
    }
  };

  return (
    <>
      <form>
        <div className="profile-container p-5 bg-zinc-700 flex">
          <div className="left-profile p-3 mt-10">
            <h4 className="student-name">
              {teacherName ? `Welcome ${teacherName}` : "Loading..."}
            </h4>
            <div>
              <img src={`http://localhost:3002${profile.image}`} alt="" />
            </div>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                className="input-links bg-zinc-500"
                value={teacherEmail}
                placeholder="kiit mail"
              />
              <input
                className="input-links bg-zinc-500"
                type="text"
                placeholder="location"
                required
                name="location"
                value={profile.location}
              />
              <input
                type="tel"
                className="input-links bg-zinc-500"
                value={teacherContact}
                placeholder="Contact"
              />
            </div>
          </div>
          <div className="bg-zinc-500 border-2 rounded-md outline-none w-full right-profile-info p-5">
            <h1 className="text-3xl text-start mb-3">Write short bio</h1>
            <textarea
              className="outline-none bg-zinc-700 w-full border-2 rounded-md"
              name="Bio"
              value={profile.Bio}
              required
              id=""
            ></textarea>
            <h1 className="text-2xl text-start mt-3 mb-2">
              Social media links
            </h1>

            <div className="border-blue-300 flex flex-row bg-zinc-700 p-5 border-2 rounded-md outline-none">
              <div className="space-y-5 ml-20">
                <input
                  placeholder="Github Link"
                  className="input-links bg-zinc-500"
                  name="github"
                  value={profile.github}
                />
                <input
                  placeholder="LinkedIn Link"
                  className="input-links bg-zinc-500"
                  name="linkedin"
                  value={profile.linkedin}
                />
              </div>

              <div className="space-y-5 me-20">
                <input
                  placeholder="Twitter Link"
                  className="bg-zinc-500 input-links"
                  name="twitter"
                  value={profile.twitter}
                />
              </div>
            </div>
            <h1 className="text-2xl text-start mt-3 mb-2">Domain</h1>
            <div>
              <textarea
                className="bg-zinc-600 outline-none w-full border-2 rounded-md"
                name="domain"
                value={profile.domain}
                required
                id=""
              ></textarea>
            </div>

            {/* Rank this Teacher Button */}
            <div className="mt-5 flex justify-center">
              {isRanked?
               (<div>response.data.teacher.rank.studentId</div>):
                (<button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setShowModal(true)}
              >
                Rank this Teacher
              </button>)}
             
            </div>
          </div>
        </div>
      </form>

      {/* Modal for Ranking */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Rank this Teacher</h2>
            <div className="flex gap-3">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center hover:bg-blue-500 hover:text-white"
                  // onClick={() => {
                  //   console.log(`Rank given: ${num}`);
                  //   setShowModal(false);
                  //   setTeacherRank(num);
                  //   saveRank();
                  // }}
                  onClick={async () => {
                    try {
                      await saveRank(num);
                      setShowModal(false);
                    } catch (error) {
                      console.error("Error in ranking:", error);
                    }
                  }}
                >
                  {num}
                </button>
              ))}
            </div>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewTeacherDetails;
