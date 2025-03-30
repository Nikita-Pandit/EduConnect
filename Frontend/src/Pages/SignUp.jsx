//student teacher
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // Default role
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Extract token from query params
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const role = queryParams.get('role');

    if (id) {
      console.log('Id received from URL:', id);
      // localStorage.setItem(role);
      console.log(role)
      if(role==="student"){
        console.log("student role")
        localStorage.setItem("studentId",id);
        navigate("/Profile");
      }
     else {
      console.log("teacher role")
      localStorage.setItem("teacherId",id);
      navigate("/TeacherProfile");
    }
    }
  }, [navigate, location]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("handleSubmit");

    try {
      const response = await axios.post(`http://localhost:3002/api/SignUp?role=${role}`, { 
        name, 
        email, 
        contact, 
        password, 
        role 
      });

      toast.success('Verification email sent! Please check your inbox.', {
        style: { color: "#0000FF" },
      });
    } catch (error) {
      console.error('Error sending verification email:', error);
      toast.error('Failed to send verification email.', {
        style: { color: "#FF0000" },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />

      {loading && (
        <div className="loading-container flex justify-center items-center mt-50 relative inset-0 z-50 bg-opacity-50">
          <div className="spinner-border animate-spin border-4 border-red-500 rounded-full w-8 h-8"></div>
          <p className="ml-3 text-white">Sending verification mail. Please wait...</p>
        </div>
      )}

      <div className='flex form-container items-center justify-center'>
        {/* <div className={`border-2 bg-#091024 rounded-md p-5 border-blue-300 ${loading ? 'filter blur-sm' : ''}`}> */}
        <div
  className={`border-2 rounded-md p-5 border-blue-300 ${loading ? 'filter blur-sm' : ''}`}
  style={{ backgroundColor: "#091024" }}
>

          <form onSubmit={handleSubmit} className='form flex items-center justify-center flex-col space-y-4'>
            <h1 className='text-3xl'>Sign Up</h1>
            <input 
              className="input-field bg-zinc-500 p-3" 
              type="text" 
              required 
              name="name" 
              onChange={(e) => setName(e.target.value)} 
              placeholder='Enter Name' 
            />
            <input 
              className="input-field bg-zinc-500 p-3" 
              type="email" 
              name="email" 
              required 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder='Enter Email' 
            />
            <input 
              className="input-field bg-zinc-500 p-3" 
              type="tel" 
              name="contact" 
              required 
              onChange={(e) => setContact(e.target.value)} 
              placeholder='Enter Contact' 
            />
            <input 
              className="input-field bg-zinc-500 p-3" 
              type="password" 
              name="password" 
              required 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter Password" 
            />
            
            {/* Role Selection */}
            <select 
              className="input-field bg-zinc-500 p-3" 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              required
              name='role'
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>

            <span className='flex flex-row gap-2'>
              <input type="checkbox" required />
              <p className='input-p'>I agree to the Terms and Conditions and Privacy Policy</p>
            </span>
            <input className="px-5 py-2 bg-blue-500 rounded-lg" type="submit" value="Sign up" />
          </form>

          <p className='text-center mt-5'>
            Already have an account?<span className='text-blue-500'><Link to="/Login">&nbsp;Login</Link></span>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;