import React, { useState } from 'react';
import { FaBook, FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { ref,set } from 'firebase/database';
import { database } from './firebase';

const recommendedCourses = [
  {
    title: "Web Development Bootcamp",
    description: "Learn full-stack web development with HTML, CSS, JavaScript, and Node.js.",
    link: "/courses/web-development",
  },
  {
    title: "Data Science with Python",
    description: "Master data analysis, machine learning, and AI with Python.",
    link: "/courses/data-science",
  },
  {
    title: "UX/UI Design for Beginners",
    description: "Explore user experience and interface design principles.",
    link: "/courses/ux-ui-design",
  },
  {
    title: "Mobile App Development with Flutter",
    description: "Create beautiful and fast apps for iOS and Android using Flutter.",
    link: "/courses/flutter-development",
  },
  {
    title: "Cybersecurity Fundamentals",
    description: "Understand network security, ethical hacking, and cyber threats.",
    link: "/courses/cybersecurity",
  },
  {
    title: "Cloud Computing with AWS",
    description: "Learn AWS services, cloud infrastructure, and serverless applications.",
    link: "/courses/cloud-computing",
  },
  {
    title: "Java Programming Masterclass",
    description: "Build strong Java programming skills for software development.",
    link: "/courses/java-programming",
  },
  {
    title: "Machine Learning with TensorFlow",
    description: "Develop AI models and deep learning applications using TensorFlow.",
    link: "/courses/machine-learning",
  },
  {
    title: "React.js for Beginners",
    description: "Create interactive front-end applications using React.js.",
    link: "/courses/react",
  },
  {
    title: "Python for Automation",
    description: "Automate repetitive tasks with Python scripting.",
    link: "/courses/python-automation",
  },
  {
    title: "Blockchain and Cryptocurrency",
    description: "Understand blockchain technology and build decentralized apps.",
    link: "/courses/blockchain",
  },
  {
    title: "Game Development with Unity",
    description: "Learn to create 2D and 3D games using Unity and C#.",
    link: "/courses/game-development",
  },
  {
    title: "Artificial Intelligence for Beginners",
    description: "Introduction to AI concepts, NLP, and computer vision.",
    link: "/courses/ai",
  },
  {
    title: "SQL and Database Management",
    description: "Master relational databases and SQL queries for data management.",
    link: "/courses/sql-databases",
  },
  {
    title: "C++ Programming Basics",
    description: "Learn C++ programming for system-level applications.",
    link: "/courses/cpp-programming",
  },
  {
    title: "DevOps and CI/CD Pipelines",
    description: "Implement DevOps practices and automate deployments.",
    link: "/courses/devops",
  },
  {
    title: "Digital Marketing and SEO",
    description: "Boost online presence with digital marketing strategies.",
    link: "/courses/digital-marketing",
  },
  {
    title: "Networking and System Administration",
    description: "Configure and manage computer networks efficiently.",
    link: "/courses/networking",
  },
  {
    title: "Android App Development with Kotlin",
    description: "Build modern Android apps using Kotlin and Jetpack.",
    link: "/courses/android-kotlin",
  },
  {
    title: "iOS Development with Swift",
    description: "Develop feature-rich iOS applications using Swift and Xcode.",
    link: "/courses/ios-development",
  },
];


export default function CoursesTab() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = recommendedCourses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

// Sample job cards array (replace with your actual 50 job cards)

// Function to upload jobs fast
const uploadJobs = async () => {
  try {
    const jobsRef = ref(database, "courses/");
    const jobsObject = {}; // Convert array to an object for fast insertion

    recommendedCourses.forEach((course, index) => {
      jobsObject[`job_${index + 1}`] = course;
    });

    await set(jobsRef, jobsObject);
    console.log("Jobs uploaded successfully!");
  } catch (error) {
    console.error("Error uploading jobs:", error);
  }
};

// Call function to upload
uploadJobs();
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
        <h2 className="text-3xl font-semibold text-blue-400">Recommended Courses</h2>
        <FaBook className="h-6 w-6 text-blue-500" />
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-700 bg-gray-800 text-white rounded-full pl-10 pr-4 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 p-6 rounded-lg shadow-xl backdrop-blur-md bg-opacity-90 border border-gray-700 hover:border-blue-400 transition duration-300"
          >
            <h3 className="text-xl font-semibold text-blue-300">{course.title}</h3>
            <p className="text-sm text-gray-300 mb-4">{course.description}</p>
            <a
              href={course.link}
              className="bg-blue-500 hover:bg-blue-600 transition-all text-white py-2 px-4 rounded-full inline-block"
            >
              View Course
            </a>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
