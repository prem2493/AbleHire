import React, { useState } from "react";
import { motion } from "framer-motion";
import test from "./test.png";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./firebase"; // Import Firebase authentication

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: fullName });
      navigate("/profile"); // Redirect after successful registration
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <img src={test} alt="AbleHire logo" className="mr-2" width="40" height="40" />
          <span className="text-xl font-bold">AbleHire</span>
        </div>
        <div>
          <NavLink to="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
            Login
          </NavLink>
        </div>
      </nav>

      {/* Register Form */}
      <div className="flex items-center justify-center min-h-[80vh] mt-5">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-center mb-6">Create an Account</h2>
          <p className="text-gray-400 text-center mb-6">Join us to start your journey</p>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <label className="block text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold"
            >
              Sign Up
            </motion.button>
          </form>
          <p className="text-center text-gray-400 mt-6">
            Already have an account?{" "}
            <NavLink to="/login" className="text-blue-400 hover:underline">
              Login
            </NavLink>
          </p>
        </motion.div>
      </div>
    </div>
  );
}