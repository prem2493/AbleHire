import React from 'react';
import { motion } from 'framer-motion';
import test from './test.png';
import { NavLink } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 py-4 shadow-md w-full">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center">
            <img src={test} alt="HireMe logo" className="mr-2" width="40" height="40" />
            <span className="text-xl font-bold text-white font-sans tracking-[0.15em]">AbleHire</span>
          </div>
          <div className="space-x-7">
            <NavLink to='/login' className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">Login</NavLink>
            <NavLink to='/signup' className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">Sign Up</NavLink>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 text-center flex-1 flex flex-col items-center mt-30">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }} 
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Hiring based on Ability, not Disability  
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.2 }} 
          className="text-gray-400 mb-8"
        >
          Search and find your dream job now easier than ever, you can simply browse and find a job
        </motion.p>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ duration: 0.5, delay: 0.4 }} 
          className="flex justify-center items-center mb-12 w-full max-w-xl"
        >
          <input type="text" className="w-full px-6 py-3 border border-gray-700 bg-gray-800 text-white rounded-l-full focus:outline-none" placeholder="Search for a Job..." />
          <NavLink to='/login' className="bg-blue-500 text-white px-8 py-3 rounded-r-full hover:bg-blue-600">Search</NavLink>
        </motion.div>
      </main>

      {/* Footer (Sticks to Bottom) */}
      <footer className="bg-gray-800 text-white text-center p-4">
        &copy; 2025 AbleHire | All Rights Reserved
      </footer>
    </div>
  );
}
