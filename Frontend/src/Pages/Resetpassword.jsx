import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Resetpassword = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  console.log(backendUrl)
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();
console.log(token)
  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
console.log(password)
console.log(token)
    try {
      await axios.post(`http://localhost:3002/api/reset-password`, {
        token,
        password,
      });
      toast.success('Password reset successful.');
      navigate('/Login');
    } catch (error) {
      toast.error('Failed to reset password. Please try again.');
    }
  };

  return (
    <>
    <ToastContainer/>
    <div className="flex flex-col form-container items-center justify-center min-h-screen gap-3">
      <h1>Reset Password</h1>
      <input
    className="input-field bg-zinc-500 p-3 text-white"
        type="password"
        placeholder="Enter new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
       className="input-field bg-zinc-500 p-3 text-white"
        type="password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleResetPassword}>Reset Password</button>
      {/* <input onClick={handleResetPassword} className="px-5 py-2 bg-blue-500 rounded-lg" value="Reset Password"/> */}
    </div>
    </>
  );
};

export default Resetpassword;