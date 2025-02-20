import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUpload, FaEdit } from 'react-icons/fa';

const resumeData = {
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  phone: '123-456-7890',
  education: [
    { degree: 'Bachelor of Computer Science', institution: 'XYZ University', year: '2021' },
    { degree: 'High School', institution: 'ABC High School', year: '2017' }
  ],
  experience: [
    { company: 'Tech Corp', role: 'Software Engineer', year: '2022 - Present' },
    { company: 'Dev Solutions', role: 'Intern', year: '2021 - 2022' }
  ],
  hobbies: ['Coding', 'Reading', 'Gaming', 'Traveling']
};

export default function Resume() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(resumeData);
  const [resume, setResume] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="w-full p-6 bg-black min-h-screen text-white"
    >
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <h2 className="text-3xl font-semibold text-blue-400">Resume</h2>
        <FaEdit className="h-6 w-6 text-blue-500" />
      </div>

      {/* File Upload Section */}
      <div className="mb-6">
        <div className="relative mb-4">
          <input
            type="file"
            accept=".pdf, .docx"
            onChange={handleFileUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded-full w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* <FaUpload className="absolute left-3 top-2.5 text-gray-400" /> */}
        </div>
        {resume && <p className="mt-2 text-green-500">File uploaded: {resume.name}</p>}
      </div>

      {/* Editable / Viewable Resume */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {isEditing ? (
          // Editable Form
          <>
            {/* Personal Information */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700"
            >
              <h3 className="text-xl font-semibold">Full Name</h3>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 mt-2 border rounded-md"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700"
            >
              <h3 className="text-xl font-semibold">Email</h3>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 mt-2 border rounded-md"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700"
            >
              <h3 className="text-xl font-semibold">Phone</h3>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-2 mt-2 border rounded-md"
              />
            </motion.div>
          </>
        ) : (
          // View Mode
          <>
            {/* Personal Information */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700"
            >
              <h3 className="text-xl font-semibold">Full Name</h3>
              <p>{formData.name}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700"
            >
              <h3 className="text-xl font-semibold">Email</h3>
              <p>{formData.email}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700"
            >
              <h3 className="text-xl font-semibold">Phone</h3>
              <p>{formData.phone}</p>
            </motion.div>
          </>
        )}

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 col-span-2"
        >
          <h3 className="text-xl font-semibold">Education</h3>
          {formData.education.map((edu, index) => (
            <div key={index} className="mt-4">
              <h4 className="text-lg font-semibold">{edu.degree}</h4>
              <p className="text-sm text-gray-400">{edu.institution} ({edu.year})</p>
            </div>
          ))}
        </motion.div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 col-span-2"
        >
          <h3 className="text-xl font-semibold">Experience</h3>
          {formData.experience.map((exp, index) => (
            <div key={index} className="mt-4">
              <h4 className="text-lg font-semibold">{exp.role} - {exp.company}</h4>
              <p className="text-sm text-gray-400">{exp.year}</p>
            </div>
          ))}
        </motion.div>

        {/* Hobbies Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 col-span-2"
        >
          <h3 className="text-xl font-semibold">Hobbies</h3>
          <ul className="list-disc pl-6">
            {formData.hobbies.map((hobby, index) => (
              <li key={index} className="text-sm text-gray-300">{hobby}</li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Toggle Edit Button */}
      <div className="mt-6 text-center">
        <button
          onClick={toggleEdit}
          className="bg-blue-500 hover:bg-blue-600 transition-all text-white py-2 px-4 rounded-full"
        >
          {isEditing ? 'Save Changes' : 'Edit Resume'}
        </button>
      </div>
    </motion.div>
  );
}
