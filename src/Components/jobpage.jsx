import React, { useEffect, useState } from "react";
import Card from "./card";
import { motion } from "framer-motion";
import { database } from "./firebase";
import { ref, onValue } from "firebase/database";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa"; // Voice icons

export default function JobPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isListening, setIsListening] = useState(false); // Voice state
  let recognition = null;

  // Filters state
  const [filters, setFilters] = useState({
    designRole: "all",
    location: "all",
    experience: "all",
    perMonth: "all",
    salaryRange: { min: 150, max: 500 },
  });

  useEffect(() => {
    const jobsRef = ref(database, "jobs");
    onValue(jobsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setJobs(Object.values(data));
      }
      setLoading(false);
    });
  }, []);

  // Function to handle voice commands
  const toggleVoiceRecognition = () => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert("Voice recognition not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
      console.log("Voice command:", transcript);

      if (transcript.includes("show all jobs")) {
        setFilters({
          designRole: "all",
          location: "all",
          experience: "all",
          perMonth: "all",
          salaryRange: { min: 150, max: 500 },
        });
        console.log("Filters reset: Showing all jobs");
      } else {
        // Assume the voice input is trying to filter by job title
        setFilters((prevFilters) => ({
          ...prevFilters,
          designRole: transcript, // Set designRole to the spoken text
        }));
        console.log("Filtering jobs by title:", transcript);
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      setIsListening(false); // Stop listening after processing
    };

    if (!isListening) {
      recognition.start();
      setIsListening(true);
    } else {
      recognition.stop();
      setIsListening(false);
    }
  };

  // Filter jobs based on selected filters
  const filteredJobs = jobs.filter((job) => {
    return (
      (filters.designRole === "all" ||
        (job.jobTitle && job.jobTitle.toLowerCase().includes(filters.designRole.toLowerCase()))) &&
      (filters.location === "all" || job.location === filters.location) &&
      (filters.experience === "all" || job.experience === filters.experience) &&
      (filters.perMonth === "all" || job.type === filters.perMonth) &&
      job.salary >= filters.salaryRange.min &&
      job.salary <= filters.salaryRange.max
    );
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 1 }}
      className="bg-black min-h-screen text-white p-4"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-blue-400">Recommended Jobs</h1>
        {/* Voice Recognition Button */}
        <button
          onClick={toggleVoiceRecognition}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
            isListening ? "bg-red-600 text-white" : "bg-gray-800 text-gray-300"
          } hover:bg-gray-700`}
        >
          {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
          {isListening ? "Stop Listening" : "Start Voice Search"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <p className="text-gray-400">Loading jobs...</p>
        ) : filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <Card
              key={index}
              date={new Date(job.createdAt).toDateString()}
              company={job.companyName}
              title={job.jobTitle}
              tags={job.tags.split(",")}
              rate={job.salary}
              location={job.location}
              description={job.description}
            />
          ))
        ) : (
          <p className="text-gray-400">No jobs available based on selected filters.</p>
        )}
      </div>
    </motion.div>
  );
}
