
import React, { useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom';
import axios from "axios"

import {assets,url} from '../assets/assets'

const ViewMoreDetails = () => {
const location = useLocation();
const  id = location?.state?.studentID || localStorage.getItem('userId') || "defaultID"           
localStorage.setItem('userId', id);                                                                                                                                                                                                                                     
console.log(id);
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentContact, setStudentContact] = useState('');
  const [image,setImage]=useState(false)
  const [profile,setProfile]=useState({
    Bio:"",
    github: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    leetcode: "",
    projects:  "",
    skills: "",
    domain:"",
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
      // setProfile(prevProfile => ({
      //   ...prevProfile,
      //   name: response.data.name
      // }));
      
    } 
    catch (error) {
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
    }
  }
    useEffect(() => {
      fetchStudentName();
      fetchProfileInfo(); // Always fetch profile info
    }, [id]);
  return (
    <>
      <form>
     <div className='profile-container  p-5 bg-zinc-700 flex'>
 
        <div className=' left-profile  p-3 mt-10'>
        <h4 className="student-name">
        {studentName ? `Welcome ${studentName}` : "Loading..."}

  </h4>
   {/* <input type="file" accept='image/*' id="image" hidden /> 
 <label htmlFor="image">
                         <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="Uploaded Profile" /> 
                         <img src={typeof image === 'string' ? assets.upload_area: image && URL.createObjectURL(image)} alt="Uploaded Profile" />
          
                    </label> */}
  <div className='flex flex-col gap-3'>
  <input type="email"    className="input-links bg-zinc-500" value={studentEmail}  placeholder="kiit mail" />

  <input  className="input-links  bg-zinc-500" type="text"  placeholder='location' required name="location" value={profile.location} />
  <input type="tel" className="input-links  bg-zinc-500" value={studentContact} placeholder="Contact" />
    


        <input type="text" className="input-links  bg-zinc-500" placeholder='branch' required name="branch" value={profile.branch}/>
        <input type="text" className="input-links  bg-zinc-500" placeholder='selectYear' required name="selectYear" value={profile.selectYear} />
  </div>
        </div>
        <div className='bg-zinc-500  border-2 rounded-md outline-none w-full right-profile-info p-5'>
            <h1 className='text-3xl text-start mb-3' >write short bio</h1>
            <textarea className='outline- bg-zinc-700 w-full border-2 rounded-md' name="Bio" value={profile.Bio} required id=""></textarea>
            <h1 className='text-2xl text-start mt-3  mb-2'>Social media links</h1>

            <div className='border-blue-300 flex flex-row  bg-zinc-700 p-5 border-2 rounded-md outline-none'>
              
<div className='space-y-5 ml-20'>
<input placeholder='Github Link' className="input-links  bg-zinc-500"  name="github" value={profile.github} />
            <input placeholder=" Linkedin Link" className="input-links  bg-zinc-500" name="linkedin" value={profile.linkedin} />
            <input placeholder=" leetcode Link" className="input-links  bg-zinc-500" name="leetcode" value={profile.leetcode}/>  
</div>

           <div className='space-y-5 me-20'>
           <input placeholder="Instagram Link" className="bg-zinc-500 input-links"  name="instagram"  value={profile.instagram} />
           <input placeholder="Twitter Link" className="bg-zinc-500 input-links"  name="twitter"  value={profile.twitter}/>
           </div>
            </div>

            <div>
                <h1 className='text-2xl text-start mt-3  mb-2'>Ongoing Projects</h1>
                <textarea  className='outline-none bg-zinc-700 w-full border-2 rounded-md' name="projects" value={profile.projects} id=""></textarea>
            </div>
    
            <h1 className='text-2xl text-start mt-3  mb-2'>Skills</h1>
            <div>
                <textarea className='bg-zinc-600 outline-none w-full border-2 rounded-md' name="skills" value={profile.skills}  required id=""></textarea>
            </div>

            <h1 className='text-2xl text-start mt-3  mb-2'>Domain</h1>
            <div>
                <textarea   className='bg-zinc-600 outline-none w-full border-2 rounded-md' name="domain" value={profile.domain}  required id=""></textarea>
            </div>

        </div>
     </div>
     
      </form>
    </>
  )
}

export default ViewMoreDetails