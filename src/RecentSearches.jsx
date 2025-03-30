// src/RecentSearches.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './RecentSearches.css';

const RecentSearches = ({ searches, onSelectCity }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="recent-searches-container">
      <motion.button
        className="recent-searches-button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Recent Searches
        <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && searches.length > 0 && (
          <motion.div
            className="recent-searches-dropdown"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {searches.map((city, index) => (
              <motion.button
                key={`${city}-${index}`}
                className="recent-search-item"
                onClick={() => {
                  onSelectCity(city);
                  setIsOpen(false);
                }}
                whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {city}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecentSearches;