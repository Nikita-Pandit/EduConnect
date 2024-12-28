import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { assets, url } from '../assets/assets';

const Profile = () => {
  console.log('hello profile');
  const location = useLocation();
  const id = location?.state?.id || localStorage.getItem('userId') || 'defaultID';

  localStorage.setItem('userId', id);
  console.log(id);

  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentContact, setStudentContact] = useState('');
  const [image, setImage] = useState('');
  const [profile, setProfile] = useState({
    Bio: '',
    github: '',
    instagram: '',
    linkedin: '',
    twitter: '',
    leetcode: '',
    projects: '',
    skills: '',
    domain:'',
    location: '',
    branch: '',
    selectYear: '',
  });

  const fetchStudentName = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/api/student/${id}`);
      setStudentName(response.data.name);
      setStudentEmail(response.data.email);
      setStudentContact(response.data.contact);
      console.log(studentEmail); // Update student name from API response
    } catch (error) {
      console.error('Error fetching student name:', error);
    }
  };

  const fetchProfileInfo=async()=>{
    console.log("profile section")
    try{
      const response=await axios.get(`http://localhost:3002/api/Profile/${id}`)
      console.log(response.data.moreInfo)
      setProfile(response.data.moreInfo);   
     setProfile(prevProfile => ({
      ...prevProfile,
      ...response.data.moreInfo 
    }));   
    }
    catch (error) {
      console.error("Error in fetching profile info:", error);
      //  toast.error("Failed to fetch profile info",{
      //   style: { color: "#ff5722" } 
      // });
    }
  }
  useEffect(() => {
    fetchStudentName();
    fetchProfileInfo();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!image) {
      // toast.error('Image not selected');
      return null;
    }
    const formData = new FormData();
    Object.keys(profile).forEach((key) => {
      formData.append(key, profile[key]);
    });

    formData.append('image', image);
    try {
      const response = await axios.post(`http://localhost:3002/api/Profile/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
       
      });
      console.log(response)
      // toast.success('profile info saved in the database successfully.', {
      // style: { color: '#ff5722' };
    } catch (error) {
      console.error('Error saving profile info in the database:', error);
      // toast.error('Failed to save profile info in the database', {
      //   style: { color: '#ff5722' },
      // });
    }
  };

  return (
    <>
      <form onSubmit={handleSave}>
        <div className="profile-container p-5 bg-zinc-700 flex">
          <div className="left-profile p-3 mt-10">
            <h4 className="student-name">
              {studentName ? `Welcome ${studentName}` : 'Loading...'}
            </h4>

            <input
              type="file"
              accept="image/*"
              id="image"
              hidden
              onChange={(e) => setImage(e.target.files[0])} // Fixed image state
            />
            <label htmlFor="image">
              <img
                src={!image ? assets.upload_area : URL.createObjectURL(image)}
                alt="Uploaded Profile"
              />
            </label>

            <div className="flex flex-col gap-3">
              <input
                type="email"
                className="input-links bg-zinc-500"
                placeholder="kiit mail"
                value={studentEmail}
                readOnly
              />
              <input
                className="input-links bg-zinc-500"
                type="text"
                placeholder="location"
                required
                name="location"
                value={profile.location}
                onChange={handleChange}
              />
              <input
                type="tel"
                className="input-links bg-zinc-500"
                placeholder="Contact"
                value={studentContact}
                readOnly
              />
              <input
                type="text"
                className="input-links bg-zinc-500"
                placeholder="branch"
                required
                name="branch"
                value={profile.branch}
                onChange={handleChange}
              />
              <input
                type="text"
                className="input-links bg-zinc-500"
                placeholder="selectYear"
                required
                name="selectYear"
                value={profile.selectYear}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="bg-zinc-500 border-2 rounded-md outline-none w-full right-profile-info p-5">
            <h1 className="text-3xl text-start mb-3">write short bio</h1>
            <textarea
              className="outline bg-zinc-700 w-full border-2 rounded-md"
              name="Bio"
              required
              value={profile.Bio}
              onChange={handleChange}
            ></textarea>
            <h1 className="text-2xl text-start mt-3 mb-2">Social media links</h1>

            <div className="border-blue-300 flex flex-row bg-zinc-700 p-5 border-2 rounded-md outline-none">
              <div className="space-y-5 ml-20">
                <input
                  placeholder="Github Link"
                  className="input-links bg-zinc-500"
                  name="github"
                  value={profile.github}
                  onChange={handleChange}
                />
                <input
                  placeholder="Linkedin Link"
                  className="input-links bg-zinc-500"
                  name="linkedin"
                  value={profile.linkedin}
                  onChange={handleChange}
                />
                <input
                  placeholder="Leetcode Link"
                  className="input-links bg-zinc-500"
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
              <h1 className="text-2xl text-start mt-3 mb-2">Ongoing Projects</h1>
              <textarea
                className="outline-none bg-zinc-700 w-full border-2 rounded-md"
                name="projects"
                value={profile.projects}
                onChange={handleChange}
              ></textarea>
            </div>

            <h1 className="text-2xl text-start mt-3 mb-2">Skills</h1>
            <div>
              <textarea
                className="bg-zinc-600 outline-none w-full border-2 rounded-md"
                name="skills"
                required
                value={profile.skills}
                onChange={handleChange}
              ></textarea>
            </div>
            <h1 className='text-2xl text-start mt-3  mb-2'>Domain</h1>
            <div>
                <textarea  onChange={handleChange} className='bg-zinc-600 outline-none w-full border-2 rounded-md' name="domain" value={profile.domain}  required id=""></textarea>
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
