

import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa"; // Icons

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  // Form validation logic
  const isEmailValid = email.trim() !== "";
  const isPasswordValid = password.trim() !== "";
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
        const response = await axios.post("http://localhost:3002/api/Login", { email, password });
        
      toast.success("Login Successful");

      const userDetails = response.data.userMoreDetails;
      if (userDetails.studentID) {
        localStorage.setItem("studentId", userDetails.studentID);
        setTimeout(() => navigate("/StudentDashboard", { state: { id: userDetails.studentID } }), 2000);
      } else {
        localStorage.setItem("teacherId", userDetails.teacherID);
        setTimeout(() => navigate("/TeacherDashboard", { state: { id: userDetails.teacherID } }), 2000);
      }
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Forgot Password Functionality
  const handleForgotPassword = async () => {
    if (!isEmailValid) {
      toast.error("Please enter a valid email to reset your password.");
      return;
    }

    try {
      await axios.post("http://localhost:3002/api/forgot-password", { email });
      toast.success("Password reset link sent to your email.");
    } catch (error) {
      toast.error("Failed to send password reset link. Please try again later.");
    }
  };

  // Close the login form and navigate to the home page
  const handleClose = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center min-h-screen bg-[#091024]">
        <div className="relative bg-[#0d1126] w-[400px] p-8 rounded-[20px] border border-[#E1C3FF] text-white">
          <button
            className="absolute top-4 right-4 text-purple-400"

            onClick={handleClose} // Navigate to the home page
          >
            ✖
          </button>
          <h1 className="text-2xl font-bold text-[#E1C3FF] text-left">LOGIN</h1>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-6 mt-6">
            
            {/* Email Input */}
            <div className="relative">
              <FaEnvelope className="absolute right-3 top-3 text-[#9B30FF] text-lg" />
              <input
                type="email"
                className="w-full p-2 pl-2 bg-transparent border-b border-[#E1C3FF] text-white outline-none focus:border-purple-500 transition placeholder-[#9B30FF]"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="  Email"
                autoComplete="email"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <button
                type="button"
                className="absolute right-3 top-3 text-[#9B30FF] text-lg"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-2 pl-2 bg-transparent border-b border-[#E1C3FF] text-white outline-none focus:border-purple-500 transition placeholder-[#9B30FF]"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="  Password"
                autoComplete="current-password"
              />
            </div>

            {/* Forgot Password & Remember Me */}
            <div className="flex justify-between text-sm">
              <button type="button" className="text-white no-underline" onClick={handleForgotPassword}>
                Forgot Password?
              </button>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 w-4 h-4 accent-[#9B30FF]"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Remember Me
              </label>
            </div>

            {/* Login Button with Loading State */}
            <button
              type="submit"
              className="w-full px-5 py-2 bg-[#6D0BCF] border-[1.5px] border-[#E1C3FF] rounded-[51.2px] text-white text-lg font-bold self-start hover:bg-[#46008B] hover:border-[#9B30FF]"

              disabled={!isFormValid || loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center text-sm mt-4">
            Do not have an account? <Link to="/SignUp" className="text-white no-underline font-bold ">Register</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
