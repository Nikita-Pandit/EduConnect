// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { ChevronDown } from "lucide-react";
// import {
//   FaUser,
//   FaEnvelope,
//   FaPhone,
//   FaEye,
//   FaEyeSlash,
//   FaTimes, // Close (X) Icon
// } from "react-icons/fa";

// const SignUp = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [contact, setContact] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");

//   const [showPassword, setShowPassword] = useState(false);



//       const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3002';

//   const handleSubmit = async (e) => {
//     e.preventDefault();
 
//     console.log("ball");
//     try {
//       await axios.post(`${backendUrl}/api/SignUp?role=${role}`, {
//         name,
//         email,
//         contact,
//         password,
//         role,
//       });
//           toast.success("user registered successfully.", {
//         style: { color: "#0000FF" },
//       });
//     } catch (error) {
//       toast.error("registration failed...", {
//         style: { color: "#FF0000" },
//       });
//     } 
  
//   };

 
//    const handleClose = () => {
//     navigate("/"); // Navigate to the home page
//   };

//   return (
//     <>
//       <ToastContainer />
    

//       <div className="flex items-center justify-center min-h-screen bg-[#091024]">
//         <div
//           className={
//             `relative bg-[#0d1126] w-[400px] p-8 rounded-[20px] border border-[#E1C3FF] text-white
          
//           `}
//         >
       
//           <button
//             className="absolute top-4 right-4 text-purple-400"
//             onClick={handleClose}
//           >
//             ✖
//           </button>

//           <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
//             <h1 className="text-2xl font-bold text-[#E1C3FF] text-left">
//               Register
//             </h1>

       
//             <div className="relative">
//               <input
//                 type="text"
//                 className="w-full p-2 pr-8 bg-transparent border-b border-[#E1C3FF] text-white outline-none focus:border-purple-500 transition placeholder-[#9B30FF]"
//                 onChange={(e) => setName(e.target.value)}
//                 value={name}
//                 placeholder="Name"
//                 autoComplete="name"
//               />
//               <FaUser className="absolute right-2 top-3 text-[#6D0BCF]" />
//             </div>

//             {/* Email Input */}
//             <div className="relative">
//               <input
//                 type="email"
//                 className="w-full p-2 pr-8 bg-transparent border-b border-[#E1C3FF] text-white outline-none focus:border-purple-500 transition placeholder-[#9B30FF]"
//                 onChange={(e) => setEmail(e.target.value)}
//                 value={email}
//                 placeholder="Email"
//                 autoComplete="email"
//               />
//               <FaEnvelope className="absolute right-2 top-3 text-[#6D0BCF]" />
//             </div>

//             {/* Contact Input */}
//             <div className="relative">
//               <input
//                 type="tel"
//                 className="w-full p-2 pr-8 bg-transparent border-b border-[#E1C3FF] text-white outline-none focus:border-purple-500 transition placeholder-[#9B30FF]"
//                 onChange={(e) => setContact(e.target.value)}
//                 value={contact}
//                 placeholder="Contact"
//                 autoComplete="tel"
//               />
//               <FaPhone className="absolute right-2 top-3 text-[#6D0BCF]" />
//             </div>

//             {/* Password Input */}
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 className="w-full p-2 pr-8 bg-transparent border-b border-[#E1C3FF] text-white outline-none focus:border-purple-500 transition placeholder-[#9B30FF]"
//                 onChange={(e) => setPassword(e.target.value)}
//                 value={password}
//                 placeholder="Password"
//                 autoComplete="current-password"
//               />
//               <button
//                 type="button"
//                 className="absolute right-2 top-3 text-[#9B30FF] text-lg"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>

//             {/* Role Selection */}
//             <div className="relative">
          
           

//               {/* Role Selection */}
// <div className="relative">


//   <select
//                 className="w-full p-2 pr-8 bg-transparent border-b border-[#E1C3FF] text-white outline-none focus:border-purple-500 transition placeholder-[#9B30FF]"
//                 value={role}
//                 onChange={(e) => setRole(e.target.value)}
//                 required
//                 style={{ color: "#9B30FF" }}
//               >
//                 <option
//                   value=""
//                   disabled
//                   style={{ backgroundColor: "#091024", color: "#E1C3FF" }}
//                 >
//                   Select Role
//                 </option>
//                 <option
//                   value="student"
//                   style={{ backgroundColor: "#090c1b", color: "#E1C3FF" }}
//                   className="hover:bg-[#12254B] hover:text-white"
//                 >
//                   Student
//                 </option>
//                 <option
//                   value="teacher"
//                   style={{ backgroundColor: "#090c1b", color: "#E1C3FF" }}
//                   className="hover:bg-[#12254B] hover:text-white"
//                 >
//                   Teacher
//                 </option>
//               </select> 

//   <FaUser className="absolute right-2 top-3 text-[#6D0BCF]" />
// </div>

//               <FaUser className="absolute right-2 top-3 text-[#6D0BCF]" />
//             </div>

//             {/* Terms and Conditions */}
//             <div className="flex items-center text-sm">
//               <input
//                 type="checkbox"
//                 required
//                 className="mr-2 w-4 h-4 accent-[#9B30FF]"
//               />
//               <p className="ml-2 text-white">
//                 I agree to the Terms and Conditions and Privacy Policy
//               </p>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full px-5 py-2 bg-[#6D0BCF] border-[1.5px] border-[#E1C3FF] rounded-[51.2px] text-white text-lg font-bold self-start hover:bg-[#46008B] hover:border-[#9B30FF]"
            
//           >
//             Register
            
//             </button>
//           </form>
//           <p className="text-center text-sm mt-4 text-white">
//             Already have an account?{" "}
//             <Link to="/Login" className="text-white font-bold">
//               Login
//             </Link>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SignUp;







// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   FaUser,
//   FaEnvelope,
//   FaPhone,
//   FaEye,
//   FaEyeSlash,
// } from "react-icons/fa";
// import { ChevronDown } from "lucide-react";

// const SignUp = () => {
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [contact, setContact] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
// console.log(backendUrl);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log("Mello Mello");
//       await axios.post(`${backendUrl}/api/SignUp?role=${role}`, {
//         name,
//         email,
//         contact,
//         password,
//         role,
//       });
//       toast.success("User registered successfully.", {
//         style: { color: "#0000FF" },
//       });
//     } catch (error) {
//       toast.error("Registration failed...", {
//         style: { color: "#FF0000" },
//       });
//     }
//   };

//   const handleClose = () => {
//     navigate("/");
//   };

//   return (
//     <>
//       <ToastContainer />
//       <div className="flex items-center justify-center min-h-screen bg-[#091024]">
//         <div className="relative bg-[#0d1126] w-[400px] p-8 rounded-[20px] border border-[#E1C3FF] text-white">
//           <button
//             className="absolute top-4 right-4 text-purple-400"
//             onClick={handleClose}
//           >
//             ✖
//           </button>

//           <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
//             <h1 className="text-2xl font-bold text-[#E1C3FF] text-left">
//               Register
//             </h1>

//             {/* Name Input */}
//             <div className="relative">
//               <input
//                 type="text"
//                 className="w-full p-2 pr-8 bg-transparent border-b border-[#E1C3FF] text-white outline-none focus:border-purple-500 transition placeholder-[#9B30FF]"
//                 onChange={(e) => setName(e.target.value)}
//                 value={name}
//                 placeholder="Name"
//                 autoComplete="name"
//               />
//               <FaUser className="absolute right-2 top-3 text-[#6D0BCF]" />
//             </div>

//             {/* Email Input */}
//             <div className="relative">
//               <input
//                 type="email"
//                 className="w-full p-2 pr-8 bg-transparent border-b border-[#E1C3FF] text-white outline-none focus:border-purple-500 transition placeholder-[#9B30FF]"
//                 onChange={(e) => setEmail(e.target.value)}
//                 value={email}
//                 placeholder="Email"
//                 autoComplete="email"
//               />
//               <FaEnvelope className="absolute right-2 top-3 text-[#6D0BCF]" />
//             </div>

//             {/* Contact Input */}
//             <div className="relative">
//               <input
//                 type="tel"
//                 className="w-full p-2 pr-8 bg-transparent border-b border-[#E1C3FF] text-white outline-none focus:border-purple-500 transition placeholder-[#9B30FF]"
//                 onChange={(e) => setContact(e.target.value)}
//                 value={contact}
//                 placeholder="Contact"
//                 autoComplete="tel"
//               />
//               <FaPhone className="absolute right-2 top-3 text-[#6D0BCF]" />
//             </div>

//             {/* Password Input */}
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 className="w-full p-2 pr-8 bg-transparent border-b border-[#E1C3FF] text-white outline-none focus:border-purple-500 transition placeholder-[#9B30FF]"
//                 onChange={(e) => setPassword(e.target.value)}
//                 value={password}
//                 placeholder="Password"
//                 autoComplete="current-password"
//               />
//               <button
//                 type="button"
//                 className="absolute right-2 top-3 text-[#9B30FF] text-lg"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>

//             {/* Custom Role Dropdown */}
//             <div className="relative">
//               <div
//                 className="flex items-center justify-between p-2 border-b border-[#E1C3FF] cursor-pointer bg-transparent"
//                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//               >
//                 <span
//                   className={`${
//                     role ? "text-[#E1C3FF]" : "text-[#9B30FF]"
//                   } select-none`}
//                 >
//                   {role ? role.charAt(0).toUpperCase() + role.slice(1) : "Select Role"}
//                 </span>
//                 <ChevronDown
//                   size={18}
//                   className={`transition-transform ${
//                     isDropdownOpen ? "rotate-180" : ""
//                   } text-[#6D0BCF]`}
//                 />
//               </div>
//               {isDropdownOpen && (
//                 <div className="absolute left-0 w-full mt-1 border border-[#E1C3FF] rounded bg-[#0d1126] z-10">
//                   {["student", "teacher"].map((r) => (
//                     <div
//                       key={r}
//                       className="p-2 hover:bg-[#12254B] cursor-pointer text-[#E1C3FF]"
//                       onClick={() => {
//                         setRole(r);
//                         setIsDropdownOpen(false);
//                       }}
//                     >
//                       {r.charAt(0).toUpperCase() + r.slice(1)}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Terms and Conditions */}
//             <div className="flex items-center text-sm">
//               <input
//                 type="checkbox"
//                 required
//                 className="mr-2 w-4 h-4 accent-[#9B30FF]"
//               />
//               <p className="ml-2 text-white">
//                 I agree to the Terms and Conditions and Privacy Policy
//               </p>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full px-5 py-2 bg-[#6D0BCF] border-[1.5px] border-[#E1C3FF] rounded-[51.2px] text-white text-lg font-bold self-start hover:bg-[#46008B] hover:border-[#9B30FF]"
//             >
//               Register
//             </button>
//           </form>

//           <p className="text-center text-sm mt-4 text-white">
//             Already have an account?{" "}
//             <Link to="/Login" className="text-white font-bold">
//               Login
//             </Link>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SignUp;








// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { ChevronDown } from "lucide-react";
// import {
//   FaUser,
//   FaEnvelope,
//   FaPhone,
//   FaEye,
//   FaEyeSlash,
//   FaTimes, // Close (X) Icon
// } from "react-icons/fa";

// const SignUp = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [contact, setContact] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");

//   const [showPassword, setShowPassword] = useState(false);



//       const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3002';

//   const handleSubmit = async (e) => {
//     e.preventDefault();
 
//     console.log("ball");
//     try {
//       await axios.post(`${backendUrl}/api/SignUp?role=${role}`, {
//         name,
//         email,
//         contact,
//         password,
//         role,
//       });
//           toast.success("user registered successfully.", {
//         style: { color: "#0000FF" },
//       });
//     } catch (error) {
//       toast.error("registration failed...", {
//         style: { color: "#FF0000" },
//       });
//     } 
  
//   };

 
//    const handleClose = () => {
//     navigate("/"); // Navigate to the home page
//   };

//   return (
//     <>
//       <ToastContainer />
    

//       <div className="flex items-center justify-center min-h-screen bg-[#091024]">
//         <div
//           className={
//             `relative bg-[#0d1126] w-[400px] p-8 rounded-[20px] border border-[#E1C3FF] text-white
          
//           `}
//         >
       
//           <button
//             className="absolute top-4 right-4 text-purple-400"
//             onClick={handleClose}
//           >
//             ✖
//           </button>

//           <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
//             <h1 className="text-2xl font-bold text-[#E1C3FF] text-left">
//               Register
//             </h1>

       
//             <div className="relative">
//               <input
//                 type="text"
//                 className="w-full p-2 pr-8 bg-transparent border-b border-[#E1C3FF] text-white outline-none focus:border-purple-500 transition placeholder-[#9B30FF]"
//                 onChange={(e) => setName(e.target.value)}
//                 value={name}
//                 placeholder="Name"
//                 autoComplete="name"
//               />
//               <FaUser className="absolute right-2 top-3 text-[#6D0BCF]" />
//             </div>

//             {/* Email Input */}
//             <div className="relative">
//               <input
//                 type="email"
//                 className="w-full p-2 pr-8 bg-transparent border-b border-[#E1C3FF] text-white outline-none focus:border-purple-500 transition placeholder-[#9B30FF]"
//                 onChange={(e) => setEmail(e.target.value)}
//                 value={email}
//                 placeholder="Email"
//                 autoComplete="email"
//               />
//               <FaEnvelope className="absolute right-2 top-3 text-[#6D0BCF]" />
//             </div>

//             {/* Contact Input */}
//             <div className="relative">
//               <input
//                 type="tel"
//                 className="w-full p-2 pr-8 bg-transparent border-b border-[#E1C3FF] text-white outline-none focus:border-purple-500 transition placeholder-[#9B30FF]"
//                 onChange={(e) => setContact(e.target.value)}
//                 value={contact}
//                 placeholder="Contact"
//                 autoComplete="tel"
//               />
//               <FaPhone className="absolute right-2 top-3 text-[#6D0BCF]" />
//             </div>

//             {/* Password Input */}
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 className="w-full p-2 pr-8 bg-transparent border-b border-[#E1C3FF] text-white outline-none focus:border-purple-500 transition placeholder-[#9B30FF]"
//                 onChange={(e) => setPassword(e.target.value)}
//                 value={password}
//                 placeholder="Password"
//                 autoComplete="current-password"
//               />
//               <button
//                 type="button"
//                 className="absolute right-2 top-3 text-[#9B30FF] text-lg"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>

//             {/* Role Selection */}
//             <div className="relative">
          
           

//               {/* Role Selection */}
// <div className="relative">


//   <select
//                 className="w-full p-2 pr-8 bg-transparent border-b border-[#E1C3FF] text-white outline-none focus:border-purple-500 transition placeholder-[#9B30FF]"
//                 value={role}
//                 onChange={(e) => setRole(e.target.value)}
//                 required
//                 style={{ color: "#9B30FF" }}
//               >
//                 <option
//                   value=""
//                   disabled
//                   style={{ backgroundColor: "#091024", color: "#E1C3FF" }}
//                 >
//                   Select Role
//                 </option>
//                 <option
//                   value="student"
//                   style={{ backgroundColor: "#090c1b", color: "#E1C3FF" }}
//                   className="hover:bg-[#12254B] hover:text-white"
//                 >
//                   Student
//                 </option>
//                 <option
//                   value="teacher"
//                   style={{ backgroundColor: "#090c1b", color: "#E1C3FF" }}
//                   className="hover:bg-[#12254B] hover:text-white"
//                 >
//                   Teacher
//                 </option>
//               </select> 

//   <FaUser className="absolute right-2 top-3 text-[#6D0BCF]" />
// </div>

//               <FaUser className="absolute right-2 top-3 text-[#6D0BCF]" />
//             </div>

//             {/* Terms and Conditions */}
//             <div className="flex items-center text-sm">
//               <input
//                 type="checkbox"
//                 required
//                 className="mr-2 w-4 h-4 accent-[#9B30FF]"
//               />
//               <p className="ml-2 text-white">
//                 I agree to the Terms and Conditions and Privacy Policy
//               </p>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full px-5 py-2 bg-[#6D0BCF] border-[1.5px] border-[#E1C3FF] rounded-[51.2px] text-white text-lg font-bold self-start hover:bg-[#46008B] hover:border-[#9B30FF]"
            
//           >
//             Register
            
//             </button>
//           </form>
//           <p className="text-center text-sm mt-4 text-white">
//             Already have an account?{" "}
//             <Link to="/Login" className="text-white font-bold">
//               Login
//             </Link>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SignUp;







import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { ChevronDown } from "lucide-react";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Hello mello");
      await axios.post(`${backendUrl}/api/SignUp?role=${role}`, {
        name,
        email,
        contact,
        password,
        role,
      });
      toast.success("User registered successfully.", {
        style: { color: "#0000FF" },
      });
    } catch (error) {
      toast.error("Registration failed...", {
        style: { color: "#FF0000" },
      });
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center min-h-screen bg-[#091024]">
        <div className="relative bg-[#0d1126] w-[400px] p-8 rounded-[20px] border border-[#E1C3FF] text-white">
          <button
            className="absolute top-4 right-4 text-purple-400"
            onClick={handleClose}
          >
            ✖
          </button>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            <h1 className="text-2xl font-bold text-[#E1C3FF] text-left">
              Register
            </h1>

            {/* Name Input */}
            <div className="relative">
              <input
                type="text"
                className="w-full p-2 pr-8 bg-transparent border-b border-[#E1C3FF] text-white outline-none focus:border-purple-500 transition placeholder-[#9B30FF]"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Name"
                autoComplete="name"
              />
              <FaUser className="absolute right-2 top-3 text-[#6D0BCF]" />
            </div>

            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                className="w-full p-2 pr-8 bg-transparent border-b border-[#E1C3FF] text-white outline-none focus:border-purple-500 transition placeholder-[#9B30FF]"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Email"
                autoComplete="email"
              />
              <FaEnvelope className="absolute right-2 top-3 text-[#6D0BCF]" />
            </div>

            {/* Contact Input */}
            <div className="relative">
              <input
                type="tel"
                className="w-full p-2 pr-8 bg-transparent border-b border-[#E1C3FF] text-white outline-none focus:border-purple-500 transition placeholder-[#9B30FF]"
                onChange={(e) => setContact(e.target.value)}
                value={contact}
                placeholder="Contact"
                autoComplete="tel"
              />
              <FaPhone className="absolute right-2 top-3 text-[#6D0BCF]" />
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-2 pr-8 bg-transparent border-b border-[#E1C3FF] text-white outline-none focus:border-purple-500 transition placeholder-[#9B30FF]"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute right-2 top-3 text-[#9B30FF] text-lg"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Custom Role Dropdown */}
            <div className="relative">
              <div
                className="flex items-center justify-between p-2 border-b border-[#E1C3FF] cursor-pointer bg-transparent"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span
                  className={`${
                    role ? "text-[#E1C3FF]" : "text-[#9B30FF]"
                  } select-none`}
                >
                  {role ? role.charAt(0).toUpperCase() + role.slice(1) : "Select Role"}
                </span>
                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  } text-[#6D0BCF]`}
                />
              </div>
              {isDropdownOpen && (
                <div className="absolute left-0 w-full mt-1 border border-[#E1C3FF] rounded bg-[#0d1126] z-10">
                  {["student", "teacher"].map((r) => (
                    <div
                      key={r}
                      className="p-2 hover:bg-[#12254B] cursor-pointer text-[#E1C3FF]"
                      onClick={() => {
                        setRole(r);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {r.charAt(0).toUpperCase() + r.slice(1)}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center text-sm">
              <input
                type="checkbox"
                required
                className="mr-2 w-4 h-4 accent-[#9B30FF]"
              />
              <p className="ml-2 text-white">
                I agree to the Terms and Conditions and Privacy Policy
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-5 py-2 bg-[#6D0BCF] border-[1.5px] border-[#E1C3FF] rounded-[51.2px] text-white text-lg font-bold self-start hover:bg-[#46008B] hover:border-[#9B30FF]"
            >
              Register
            </button>
          </form>

          <p className="text-center text-sm mt-4 text-white">
            Already have an account?{" "}
            <Link to="/Login" className="text-white font-bold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;