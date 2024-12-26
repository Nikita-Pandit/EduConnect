
import React, { useEffect , useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from "axios"

const Profile = () => {
    console.log("hello profile")
    const location = useLocation();
   const  id = location?.state?.id || localStorage.getItem('userId') || "defaultID"
         
    localStorage.setItem('userId', id);                                                                                                                                                                                                                                     
    console.log(id);

    const [studentName, setStudentName] = useState('');
    const [studentEmail, setStudentEmail] = useState('');
    const [studentContact, setStudentContact] = useState('');
    const [profile,setProfile]=useState({
      Bio:"",
      github: "",
      instagram: "",
      linkedin: "",
      twitter: "",
      leetcode: "",
      projects:  "",
      skills: "",
      location:"",
      branch:"",
      selectYear:"",
    })
  
    const fetchStudentName = async () => {
        try {
          const response = await axios.get(`http://localhost:3002/api/student/${id}`);
          setStudentName(response.data.name);
          setStudentEmail(response.data.email);
          setStudentContact(response.data.contact);
          console.log(studentEmail) // Update student name from API response
        } catch (error) {
          console.error('Error fetching student name:', error);
        }
      };
    useEffect(() => {
        fetchStudentName();
        // fetchProfileInfo(); // Always fetch profile info
      }, [id]);

      const handleChange=(e)=>{
        const { name, value } = e.target;
        setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
      }
      const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:3002/api/Profile',profile );
          console.log(response.data);

        }catch(error){
          console.error("Error saving profile info in the database:", error);
        }
      }
      
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="profile-container  p-5 bg-zinc-700 flex">
          <div className=" left-profile  p-3 mt-10">
            <h4 className="student-name"> {studentName ? `Welcome ${studentName}` : "Loading..."}</h4>

            <div className="flex flex-col gap-3">
              <input
                type="email"
                className="input-links bg-zinc-500"
                placeholder="kiit mail"
                value = {studentEmail}
              />
              <input
                className="input-links  bg-zinc-500"
                type="text"
                placeholder="location"
                required
                name="location"
                value={profile.location}
                onChange={handleChange}
              />
              <input
                type="tel"
                className="input-links  bg-zinc-500"
                placeholder="Contact"
                value={studentContact}
              />

              <input
                type="text"
                className="input-links  bg-zinc-500"
                placeholder="branch"
                required
                name="branch"
                value={profile.branch}
                onChange={handleChange}
              />
              <input
                type="text"
                className="input-links  bg-zinc-500"
                placeholder="selectYear"
                required
                name="selectYear"
                value={profile.selectYear}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="bg-zinc-500  border-2 rounded-md outline-none w-full right-profile-info p-5">
            <h1 className="text-3xl text-start mb-3">write short bio</h1>
            <textarea
              className="outline- bg-zinc-700 w-full border-2 rounded-md"
              name="Bio"
              required
              id=""
              value={profile.Bio}
              onChange={handleChange}
            ></textarea>
            <h1 className="text-2xl text-start mt-3  mb-2">
              Social media links
            </h1>

            <div className="border-blue-300 flex flex-row  bg-zinc-700 p-5 border-2 rounded-md outline-none">
              <div className="space-y-5 ml-20">
                <input
                  placeholder="Github Link"
                  className="input-links  bg-zinc-500"
                  name="github"
                  value={profile.github}
                  onChange={handleChange}
                />
                <input
                  placeholder=" Linkedin Link"
                  className="input-links  bg-zinc-500"
                  name="linkedin"
                  value={profile.linkedin}
                  onChange={handleChange}
                />
                <input
                  placeholder=" leetcode Link"
                  className="input-links  bg-zinc-500"
                  name="leetcode"
                  value={profile.leetcode}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-5 me-20">
                <input
                  placeholder="Instagram Link"
                  className="bg-zinc-500 input-links"
                  name="instagram"
                  value={profile.instagram}
                  onChange={handleChange}
                />
                <input
                  placeholder="Twitter Link"
                  className="bg-zinc-500 input-links"
                  name="twitter"
                  value={profile.twitter}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <h1 className="text-2xl text-start mt-3  mb-2">
                Ongoing Projects
              </h1>
              <textarea
                className="outline-none bg-zinc-700 w-full border-2 rounded-md"
                name="projects"
                id=""
                onChange={handleChange}
              ></textarea>
            </div>

            <h1 className="text-2xl text-start mt-3  mb-2">Skills</h1>
            <div>
              <textarea
                className="bg-zinc-600 outline-none w-full border-2 rounded-md"
                name="skills"
                required
                id=""
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <button
            type="submit"
            className="text-center px-5 py-2 bg-blue-500 rounded-lg"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default Profile;
