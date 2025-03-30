import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Forecast from "./Forecast";
import RefreshButton from "./RefreshButton";
import "./Forecast.css";

const API_KEY = "2a03172025e93f32e5e3b141bd0f1aef";

const SearchedCityWeather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [searchedCity, setSearchedCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem("recentSearches");
    return saved ? JSON.parse(saved) : [];
  });
  const [showRecentSearches, setShowRecentSearches] = useState(false);

  // Save recent searches to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  const addToRecentSearches = (cityName) => {
    setRecentSearches(prev => {
      const filtered = prev.filter(item => item.toLowerCase() !== cityName.toLowerCase());
      return [cityName, ...filtered].slice(0, 5); // Keep only the last 5 searches
    });
  };

  const fetchWeatherByCity = async (cityName = city) => {
    if (!cityName.trim()) {
      alert("Please enter a city name");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();

      if (data.cod === 200) {
        setWeather(data);
        setSearchedCity(cityName);
        addToRecentSearches(cityName);
        setCity("");
        setShowRecentSearches(false);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    if (!searchedCity) return;
    setRefreshing(true);
    await fetchWeatherByCity(searchedCity);
  };

  return (
    <motion.div
      className="weather-container"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="weather-header">
        <h2>Search City Weather</h2>
        <div className="header-controls">
          {weather && <RefreshButton onRefresh={handleRefresh} isLoading={refreshing} />}
          {recentSearches.length > 0 && (
            <motion.button
              className="recent-searches-button"
              onClick={() => setShowRecentSearches(!showRecentSearches)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Recent Searches
              <span className={`arrow ${showRecentSearches ? 'open' : ''}`}>▼</span>
            </motion.button>
          )}
        </div>
      </div>
      
      <motion.div 
        className="search-container"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && fetchWeatherByCity()}
        />
        <motion.button
          onClick={() => fetchWeatherByCity()}
          disabled={loading || refreshing}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Search
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {showRecentSearches && (
          <motion.div
            className="recent-searches-dropdown"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {recentSearches.map((searchedCity, index) => (
              <motion.button
                key={index}
                className="recent-search-item"
                onClick={() => fetchWeatherByCity(searchedCity)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
              >
                {searchedCity}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="loading-text"
          >
            Loading...
          </motion.div>
        ) : weather ? (
          <motion.div
            key="weather"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3>{weather.name}, {weather.sys.country}</h3>
            <div className="weather-info">
              <motion.div
                className="weather-detail"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <img 
                  className="weather-icon"
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                />
                <p>{weather.weather[0].description}</p>
              </motion.div>
              <motion.div
                className="weather-detail"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span>🌡️ Temperature:</span>
                <span>{Math.round(weather.main.temp)}°C</span>
              </motion.div>
              <motion.div
                className="weather-detail"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span>💧 Humidity:</span>
                <span>{weather.main.humidity}%</span>
              </motion.div>
              <motion.div
                className="weather-detail"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <span>🌪️ Wind Speed:</span>
                <span>{Math.round(weather.wind.speed * 3.6)} km/h</span>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {searchedCity && !refreshing && <Forecast city={searchedCity} />}
    </motion.div>
  );
};

export default SearchedCityWeather;