import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const ResetPassword = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();


  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await axios.post(`${backendUrl}/api/reset-password`, {
        token,
        password,
      });
      toast.success("Password reset successful.");
      navigate("/Login");
    } catch (error) {
      toast.error("Failed to reset password. Please try again.");
    }
  };

   // Close the login form and navigate to the home page
   const handleClose = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center min-h-screen bg-[#090c1b] relative">

        <div className="relative bg-[#0d1126] w-[400px] p-8 rounded-[20px] border border-[#E1C3FF] text-white">
        <button
            className="absolute top-4 right-4 text-purple-400"
            onClick={handleClose} // Navigate to the home page
          >
            ✖
          </button>
          <h1 className="text-2xl font-bold text-[#E1C3FF] text-left">
            Reset Password
          </h1>

          {/* Password Input */}
          <div className="relative mt-6">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-2 pr-10 bg-transparent border-b border-[#E1C3FF] text-white outline-none focus:border-purple-500 transition placeholder-[#9B30FF]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute right-2 top-3 text-[#9B30FF] text-lg"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirm Password Input */}
          <div className="relative mt-6">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="w-full p-2 pr-10 bg-transparent border-b border-[#E1C3FF] text-white outline-none focus:border-purple-500 transition placeholder-[#9B30FF]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute right-2 top-3 text-[#9B30FF] text-lg"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Reset Password Button */}
          <button
            onClick={handleResetPassword}
            className="w-full mt-6 px-5 py-2 bg-[#6D0BCF] border-[1.5px] border-[#E1C3FF] rounded-[51.2px] text-white text-lg font-bold hover:bg-[#46008B] hover:border-[#9B30FF]"
          >
            Reset Password
          </button>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
