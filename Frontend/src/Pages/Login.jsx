import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    try {
      const response = await axios.post('http://localhost:3002/api/login', { email, password });
      console.log(response);
      console.log("Login successful", response.data);

      // Navigate to home if login is successful
      if (response.data === "Login successful") {
        navigate("/Home"); // Ensure "/home" is defined in your routes
      }
    } catch (error) {
      console.error("Login unsuccessful", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="border-2 bg-zinc-700 rounded-md p-5 border-blue-300">
        <form
          onSubmit={handleSubmit}
          className="form flex items-center justify-center flex-col space-y-4"
        >
          <h1 className="text-3xl">Login</h1>
          <input
            className="input-field bg-zinc-500 p-3"
            required
            type="email"
            name="email"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input-field bg-zinc-500 p-3"
            required
            type="password"
            name="password"
            placeholder="Enter your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="px-5 py-2 bg-blue-500 rounded-lg"
            type="submit"
            value="Login"
          />
        </form>
        <p className="text-center mt-5">
          Do not have an account?
          <span className="text-blue-500">
            <Link to="/SignUp">&nbsp;SignUp</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
