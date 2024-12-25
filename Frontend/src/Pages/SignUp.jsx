import React, { useState } from "react"; // Correctly import useState here
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [name, setName] = useState(""); // Move the hooks inside the component
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
     console.log("jzsdfhb")
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
    }
  };

  return (
    <>
    <ToastContainer />
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="border-2 bg-zinc-700 rounded-md p-5 border-blue-300">
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
