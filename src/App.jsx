import React from "react";
import { motion } from "framer-motion";
import { ThemeProvider } from "./ThemeContext";
import ThemeToggle from "./ThemeToggle";
import CurrentLocationWeather from "./CurrentLocationWeather";
import SearchedCityWeather from "./SearchedCityWeather";
import "./App.css";

const App = () => {
  return (
    <ThemeProvider>
      <motion.div
        className="app-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ThemeToggle />
        <div className="content-wrapper">
          <motion.h1 
            className="app-title"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="weather-icon">🌤️</span>
            Weather Dashboard
          </motion.h1>
          <motion.div 
            className="weather-grid"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <CurrentLocationWeather />
            <SearchedCityWeather />
          </motion.div>
        </div>
      </motion.div>
    </ThemeProvider>
  );
};

export default App;