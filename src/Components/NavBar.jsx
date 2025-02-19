import React, { useState } from 'react';
import { BellIcon, CogIcon, UserCircleIcon } from '@heroicons/react/outline';
import test from './test.png';
import { NavLink } from 'react-router-dom';
import { FaPlusCircle, FaPaperPlane, FaBriefcase, FaBook,FaFileAlt,FaRobot  } from 'react-icons/fa';

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="font-sans bg-[#181414] shadow-md tracking-[0.09em]">
      <div className="mx-auto px-0">
        <div className="flex justify-between items-center h-16 px-4 sm:px-7">
          <div className="flex items-center">
            <img
              src={test} // Replace with the actual path to your logo
              alt="LuckyJob Logo"
              className="h-8 w-8 mr-3" // Adjust size and margin as needed
            />
            <a href="/" className="text-xl font-bold text-white font-sans tracking-[0.15em]">
              AbleHire
            </a>
          </div>
          <div className="flex space-x-15 ml-10">
            <NavLink to="/main" className="text-white flex items-center space-x-2">
              <span>Find job</span>
              <FaBriefcase className="h-4 w-4" />
            </NavLink>
            <NavLink to="/courses" className="text-white flex items-center space-x-2">
              <span>Courses</span>
              <FaBook className="h-4 w-4" />
            </NavLink>

            <NavLink to="/jobpost" className="text-white">
              <FaPlusCircle className="h-7 w-6" />
            </NavLink>
            <NavLink to="/community" className="text-white flex items-center space-x-2">
              <span>Community</span>
              <FaPaperPlane className="h-4 w-4" />
            </NavLink>
            <NavLink to="/resume" className="text-white flex items-center space-x-2">
              <span>Resume</span>
              <FaFileAlt className="h-4 w-4" />
            </NavLink>
            <NavLink to="/chatbot" className="text-white flex items-center space-x-2">
              <span>Chatbot</span>
              <FaRobot className="h-4 w-4" />
            </NavLink>
          </div>

          {/* Right side - Icons (Profile, Settings, Notifications) */}
          <div className="flex items-center space-x-8">
            <div className="relative">
              {/* Notification Bell */}
              <button onClick={toggleDropdown} className="text-white relative">
                <BellIcon className="h-6 w-6" />
                <span className="absolute top-0 right-0 bg-red-500 text-xs text-white rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Notification Dropdown */}
              {isDropdownOpen && (
                <div className="absolute top-16 right-0 bg-black text-white rounded-lg shadow-lg w-64 p-4">
                  <div className="p-4 border-b">
                    <h4 className="font-semibold">Notifications</h4>
                  </div>
                  <div className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-100">
                    <div className="p-4 border-b cursor-pointer">
                      <p className="text-sm">You have a new message from John.</p>
                    </div>
                    <div className="p-4 border-b cursor-pointer">
                      <p className="text-sm">Your profile was viewed by a recruiter.</p>
                    </div>
                    <div className="p-4 border-b  cursor-pointer">
                      <p className="text-sm">You have a new job recommendation.</p>
                    </div>
                  </div>
                  <div className="p-4 text-center text-sm text-gray-500">
                    <button onClick={() => setIsDropdownOpen(false)} className="text-blue-500">
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>

            <NavLink to="/settings" className="text-white">
              <CogIcon className="h-6 w-6" />
            </NavLink>
            <NavLink to="/profile" className="text-white">
              <UserCircleIcon className="h-6 w-6" />
            </NavLink>
          </div>
        </div>
      </div>
      {/* White faded separator line */}
      <div className="border-b-[1px] border-b-white/30"></div>
    </nav>
  );
};

export default NavBar;
