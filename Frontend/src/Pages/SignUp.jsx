import React, { useState,useEffect } from "react"; // Correctly import useState here
import { Link ,useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const location=useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    // Extract token from query params
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
  
    if (id) {
      console.log('Id received from URL:', id);
      localStorage.setItem("userId",id)
      navigate("/Profile");

      // Handle the token (e.g., validate or display to the user)
    }
  }, [location,navigate]);
  const [name, setName] = useState(""); // Move the hooks inside the component
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);   //added loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);   //show loading spinner when the request starts
    try {
      const response = await axios.post("http://localhost:3002/api/SignUp", {
        name,
        email,
        contact,
        password,
      });
      console.log(response)
      toast.success('Verification email sent! Please check your inbox.', {
        style: { color: "#ff5722" } 
      })
    } 
    catch (error) {
      console.error("Error Sending verification email ", error);
    }finally{
      setLoading(false);   //hide loading spinner when the request ends
    }
  };

  return (
    <>
    <ToastContainer />
    {loading && (
           <div className="loading-container flex justify-center items-center mt-50 relative inset-0 z-50  bg-opacity-50 ">
           <div className="spinner-border animate-spin border-4 border-red-500 rounded-full w-8 h-8"></div>
           <p className="ml-3 text-white">Sending verification mail. Please wait...</p>
         </div>
          )}
      <div className='flex form-container items-center justify-center'>
        <div className={`border-2 bg-zinc-700 rounded-md p-5 border-blue-300 ${loading ? 'filter blur-sm' : ''}`}>
        <form
          onSubmit={handleSubmit}
          action=""
          className="form flex  items-center justify-center flex-col space-y-4"
        >
          <h1 className="text-3xl">Sign Up</h1>
          <input
            className="input-field bg-zinc-500 p-3 "
            required
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name...."
          ></input>
          <input
            className="input-field bg-zinc-500 p-3 "
            required
            type="email"
            name="email"
            placeholder="Enter your kiit email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            className="input-field bg-zinc-500 p-3 "
            required
            type="tel"
            name="contact"
            placeholder="Enter your contact......"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          ></input>
          <input
            className="input-field bg-zinc-500 p-3 "
            required
            type="password"
            name="password"
            placeholder="Enter your password....."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <span className="flex flex-row gap-2">
            <input type="checkbox" required />
            <p className="input-p">
              I agree to the Terms and Conditions and Privacy Policy
            </p>
          </span>
          <input
            className="px-5 py-2 bg-blue-500 rounded-lg  "
            type="submit"
            value="Sign up"
          />
        </form>
        <p className="text-center mt-5">
          Already have an account?
          <span className="text-blue-500">
            <Link to="/Login">&nbsp;Login</Link>
          </span>
        </p>
      </div>
    </div>
    </>
  );
};

export default SignUp;
