import { useState } from 'react';
import { motion } from 'framer-motion';

const Card = ({ date, company, title, tags, rate, location, description }) => {
    const [showDescription, setShowDescription] = useState(false);

    const toggleDescription = () => {
        setShowDescription(!showDescription);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
        >
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-105">
                <div className="bg-gray-700 p-2 rounded-full text-gray-300 text-sm mb-4 w-max">
                    {date}
                </div>
                <div className="bg-[#1a202c] p-4 rounded-lg">
                    <h2 className="text-xl font-semibold text-blue-400 mb-2">{company}</h2>
                    <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {tags.map(tag => (
                            <span key={tag} className="text-gray-300 py-1 px-3 rounded-full text-sm border border-gray-500">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div className="text-lg font-semibold text-white mb-2">₹ {rate}/hr</div>
                    <div className="text-gray-500 mb-4">{location}</div>
                </div>
                <button 
                    onClick={toggleDescription} 
                    className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600 transition duration-200"
                >
                    {showDescription ? 'Hide Details' : 'Details'}
                </button>
                {showDescription && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-700 p-4 mt-4 rounded-lg text-gray-300"
                    >
                        {description}
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default Card;
