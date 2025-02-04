import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../Components/Button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-10">
      {/* Hero Section */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-bold text-center mt-10"
      >
        Welcome to Our Platform
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-4 text-lg text-gray-300 text-center max-w-2xl"
      >
        A platform to connect students and teachers seamlessly, enabling
        ranking, project tracking, and collaboration.
      </motion.p>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-10 mt-16">
        {[
          { title: "Search Teachers", desc: "Find teachers easily.", link: "/search" },
          { title: "View Rankings", desc: "Check teacher rankings.", link: "/rankings" },
          { title: "Manage Projects", desc: "Track student projects.", link: "/projects" },
        ].map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-800 p-6 rounded-xl shadow-lg text-center cursor-pointer hover:bg-gray-700 transition"
            onClick={() => navigate(feature.link)}
          >
            <h2 className="text-2xl font-semibold">{feature.title}</h2>
            <p className="text-gray-400 mt-2">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Call-to-Action */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-16"
      >
        <Button className="bg-blue-600 hover:bg-blue-500 px-6 py-3 text-lg" onClick={() => navigate("/dashboard")}>
          Get Started
        </Button>
        {/* <button className="bg-blue-600 hover:bg-blue-500 px-6 py-3 text-lg">Get Started</button> */}

      </motion.div>
    </div>
  );
};

export default Home;
