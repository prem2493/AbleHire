import React, { useState } from "react";
import { motion } from "framer-motion";
import { database } from "./firebase";
import { ref, push, set } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";

export default function JobPostingPage() {
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [tags, setTags] = useState("");
  const [disability, setDisability] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      companyName,
      jobTitle,
      description,
      employmentType,
      location,
      salary,
      tags,
      disability,
      createdAt: new Date().toISOString(),
    };

    try {
      if (!database) throw new Error("Firebase database is not initialized");

      const newJobRef = push(ref(database, "jobs"));
      await set(newJobRef, jobData);
      alert("Job added successfully!");
      console.log("Job added successfully!");

      // Clear form fields
      setCompanyName("");
      setJobTitle("");
      setDescription("");
      setEmploymentType("");
      setLocation("");
      setSalary("");
      setTags("");
      setDisability("");
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="w-full p-6 bg-black min-h-screen text-white"
    >
      <h2 className="text-3xl font-semibold mb-6 text-blue-400">Post a Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter company name"
            className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg p-3 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Job Title</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Enter job title"
            className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg p-3 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Job Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter job description"
            className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg p-3 text-sm"
            rows="5"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Employment Type</label>
          <select
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
            className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg p-3 text-sm"
            required
          >
            <option value="">Select employment type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Freelance">Freelance</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter job location"
            className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg p-3 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Salary</label>
          <input
            type="text"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="Enter salary details"
            className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg p-3 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Skills Required (comma separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter skills required"
            className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg p-3 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Disability Considerations</label>
          <textarea
            value={disability}
            onChange={(e) => setDisability(e.target.value)}
            placeholder="Describe any disability accommodations"
            className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg p-3 text-sm"
            rows="3"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold text-sm transition-all"
          >
            Post Job
          </button>
        </div>
      </form>
    </motion.div>
  );
}
