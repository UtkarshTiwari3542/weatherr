import React from 'react';
import { motion } from 'framer-motion';
import './RefreshButton.css';

const RefreshButton = ({ onRefresh, isLoading }) => {
  return (
    <motion.button 
      className={`refresh-button ${isLoading ? 'spinning' : ''}`} 
      onClick={onRefresh}
      disabled={isLoading}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg 
        className="refresh-icon" 
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
      </svg>
      {isLoading ? 'Refreshing...' : 'Refresh'}
    </motion.button>
  );
};

export default RefreshButton;