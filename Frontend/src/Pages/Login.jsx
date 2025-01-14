// import React, {useState} from 'react'
// import axios from "axios"
// import { Link,useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// const Login = () => {
//   const[email,setEmail]=useState("")
//   const[password,setPassword]=useState("")
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const navigate = useNavigate()
//   const isEmailValid = email.includes('@');
//   const isPasswordValid = password.length >= 4;
//   const isFormValid = isEmailValid && isPasswordValid;
// // Access the backend URL from the environment variable
// const backendUrl = import.meta.env.VITE_BACKEND_URL;
//   const handleSubmit=async (e)=>{
//     console.log("handlesubmit")
// e.preventDefault()
//     try {
//     const response = await axios.post('http://localhost:3002/api/Login',{email,password});
//     console.log(response.data.user)
//     if(response.data.userMoreDetails){
//       const id=response.data.userMoreDetails.studentID
//     }
//     const id=response.data.user._id
//     console.log(id)
//     console.log(Login)
//     if(response.data.token){
//       if (rememberMe) {
//         localStorage.setItem('token', response.data.token);
//       } else {
//         sessionStorage.setItem('token', response.data.token);
//       }
//       toast.success('Login Successful');
//       setTimeout(()=>{
//   //navigate('/Home');
//   // navigate("/Profile", { state: { id } });
//     navigate("/Profile", { state: { id } });
//       },7000)
//     }
//     // console.log(response.data.userMoreDetails)
//     // console.log(response.data.message)
//     // if(response.data.message==="Login Successful"){
//     //   navigate("/Home")
//     // }
//     else{
//       toast.error('Invalid credentials. Please try again.');
//     }
//   }
//   catch (error) {
//     if (error.response?.status === 401) {
//       toast.error('Invalid credentials. Please try again.');
//     } else {
//       toast.error('An error occurred. Please try again later.');
//     }
//   } finally {
//     setLoading(false);
//   }
//   }
//   const handleForgotPassword = async () => {
//     if (!isEmailValid) {
//       toast.error('Please enter a valid email to reset your password.');
//       return;
//     }
//     console.log(email)
//     try {
//       const response= await axios.post(`${backendUrl}/api/forgot-password`, { email });
//       toast.success('Password reset link sent to your email.');
//       console.log(response.data)

//     } catch (error) {
//       toast.error('Failed to send password reset link. Please try again later.');
//     }
//   };

//   // const handleSocialLogin = (provider) => {
//   //   // Simulating a social login
//   //   window.location.href = `${backendUrl}/api/auth/${provider}`;
//   // };
  
//   return (
//     <>
//   <ToastContainer />
//       <div className="flex form-container items-center justify-center min-h-screen">
//         <div className="border-2 bg-zinc-700 rounded-md p-5 border-blue-300">
//           <form
//             onSubmit={handleSubmit}
//             className="form p-5 flex items-center justify-center flex-col space-y-4"
//           >
//             <h1 className="text-3xl text-white">Log in</h1>
//             <input
//               className="input-field bg-zinc-500 p-3 text-white"
//               type="email"
//               name="email"
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//             />
//             {!isEmailValid && email && (
//               <small className="text-red-500">Please enter a valid email.</small>
//             )}
//             <div className="relative w-full">
//               <input
//                 className="input-field bg-zinc-500 p-3 text-white w-full"
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-3 text-white"
//               >
//                 {showPassword ? 'Hide' : 'Show'}
//               </button>
//             </div>
//             {!isPasswordValid && password && (
//               <small className="text-red-500">Password must be at least 6 characters long.</small>
//             )}
//             <label className="text-white">
//               <input
//                 type="checkbox"
//                 className="mr-2"
//                 checked={rememberMe}
//                 onChange={() => setRememberMe(!rememberMe)}
//               />
//               Remember Me
//             </label>
//             <button
//               type="submit"
//               className="px-5 py-2 bg-blue-500 rounded-lg text-white"
//               disabled={!isFormValid || loading}
//             >
//               {loading ? 'Logging in...' : 'Login'}
//             </button>
//             <button
//               type="button"
//               onClick={handleForgotPassword}
//               className="text-blue-500 underline mt-2"
//             >
//               Forgot password?
//             </button>
//           </form>
//           {/* <p className="text-center mt-5 text-white">
//             Or log in using:
//             <br />
//             <button
//               onClick={() => handleSocialLogin('google')}
//               className="bg-red-500 px-4 py-2 rounded-lg text-white mt-2"
//             >
//               Google
//             </button>
//             &nbsp;
//             <button
//               onClick={() => handleSocialLogin('facebook')}
//               className="bg-blue-600 px-4 py-2 rounded-lg text-white mt-2"
//             >
//               Facebook
//             </button> */}
//           {/* </p> */}
//           <p className="text-center mt-5 text-white">
//             Don't have an account?
//             <span className="text-blue-500">
//               <Link to="/SignUp">&nbsp;SignUp</Link>
//             </span>
//           </p>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Login

import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const isEmailValid = email.includes("@");
  const isPasswordValid = password.length >= 4;
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3002/api/Login", {
        email,
        password,
      });

      if (response.data.userMoreDetails) {
        const id = response.data.userMoreDetails.studentID;

        // if (response.data.token) {
        //   if (rememberMe) {
        //     localStorage.setItem("token", response.data.token);
        //   } else {
        //     sessionStorage.setItem("token", response.data.token);
        //   }

          toast.success("Login Successful");
          setTimeout(() => {
            navigate("/Profile", { state: { id } });
          }, 7000);
        // } else {
        //   toast.error("Invalid credentials. Please try again.");
        }
      // } else {
      //   toast.error("Invalid credentials. Please try again.");
      // }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Invalid credentials. Please try again.");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <>
      <ToastContainer />
      <div className="flex form-container items-center justify-center min-h-screen">
        <div className="border-2 bg-zinc-700 rounded-md p-5 border-blue-300">
          <form
            onSubmit={handleSubmit}
            className="form p-5 flex items-center justify-center flex-col space-y-4"
          >
            <h1 className="text-3xl text-white">Log in</h1>
            <input
              className="input-field bg-zinc-500 p-3 text-white"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              value={email}
            />
            {!isEmailValid && email && (
              <small className="text-red-500">Please enter a valid email.</small>
            )}
            <div className="relative w-full">
              <input
                className="input-field bg-zinc-500 p-3 text-white w-full"
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                value={password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-white"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {!isPasswordValid && password && (
              <small className="text-red-500">
                Password must be at least 4 characters long.
              </small>
            )}
            <label className="text-white">
              <input
                type="checkbox"
                className="mr-2"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember Me
            </label>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-500 rounded-lg text-white"
              disabled={!isFormValid || loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-blue-500 underline mt-2"
            >
              Forgot password?
            </button>
          </form>
          <p className="text-center mt-5 text-white">
            Don't have an account?
            <span className="text-blue-500">
              <Link to="/SignUp">&nbsp;SignUp</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
