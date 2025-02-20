import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';

const communitiesData = [
  { name: 'Designers', description: 'A community for all designers.' },
  { name: 'Developers', description: 'A community for software developers.' },
  { name: 'Marketers', description: 'A community for marketing professionals.' },
  { name: 'Product Managers', description: 'A community for product managers.' },
  { name: 'Data Scientists', description: 'A community for data science enthusiasts.' },
  { name: 'Freelancers', description: 'A community for freelancers in various fields.' },
];

const initialJoinedCommunities = [
  { name: 'Designers', description: 'A community for all designers.' },
  { name: 'Product Managers', description: 'A community for product managers.' },
];

export default function Community() {
  const [searchQuery, setSearchQuery] = useState('');
  const [joinedCommunities, setJoinedCommunities] = useState(initialJoinedCommunities);
  const [unjoinedCommunities, setUnjoinedCommunities] = useState(
    communitiesData.filter((community) => !initialJoinedCommunities.some((joined) => joined.name === community.name))
  );

  // Filter communities based on the search query
  const filteredUnjoinedCommunities = unjoinedCommunities.filter((community) =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle join community
  const handleJoin = (community) => {
    setJoinedCommunities([...joinedCommunities, community]);
    setUnjoinedCommunities(unjoinedCommunities.filter((item) => item.name !== community.name));
  };

  // Handle open community (just a placeholder for actual functionality)
  const handleOpen = (community) => {
    alert(`Opening community: ${community.name}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}  // Start from below with slight opacity
      animate={{ opacity: 1, y: 0 }}   // Slide up and fade in
      exit={{ opacity: 0, y: -20 }}    // Slide out upwards while fading
      transition={{ duration: 0.6 }}   // Set duration for smooth animation
      className="w-full p-6 bg-black min-h-screen text-white"
    >
      {/* Search Filter */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for communities"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-700 rounded-full pl-10 pr-4 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-white"
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
        </div>
      </div>

      {/* Joined Communities */}
      <div className="mb-6">
        <h2 className="text-3xl font-semibold text-blue-400 mb-6">Joined Communities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {joinedCommunities.length > 0 ? (
            joinedCommunities.map((community) => (
              <motion.div
                key={community.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 text-white p-6 rounded-lg shadow-xl backdrop-blur-md bg-opacity-90 border border-gray-700 hover:border-blue-400 transition duration-300"
              >
                <h3 className="text-xl font-semibold">{community.name}</h3>
                <p className="text-sm text-gray-300">{community.description}</p>
                <div className="mt-4">
                  <button
                    className="bg-gray-500 text-white py-2 px-4 rounded mr-4 hover:bg-gray-600 transition duration-300"
                    disabled
                  >
                    Joined
                  </button>
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                    onClick={() => handleOpen(community)}
                  >
                    Open
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <p>No joined communities yet.</p>
          )}
        </div>
      </div>

      {/* Unjoined Communities */}
      <div>
        <h2 className="text-3xl font-semibold text-blue-400 mb-6">Unjoined Communities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUnjoinedCommunities.length > 0 ? (
            filteredUnjoinedCommunities.map((community) => (
              <motion.div
                key={community.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 text-white p-6 rounded-lg shadow-xl backdrop-blur-md bg-opacity-90 border border-gray-700 hover:border-blue-400 transition duration-300"
              >
                <h3 className="text-xl font-semibold">{community.name}</h3>
                <p className="text-sm text-gray-300">{community.description}</p>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600 transition duration-300"
                  onClick={() => handleJoin(community)}
                >
                  Join Now
                </button>
              </motion.div>
            ))
          ) : (
            <p>No unjoined communities found.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
