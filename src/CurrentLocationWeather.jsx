import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CurrentLocationForecast from "./CurrentLocationForecast";
import RefreshButton from "./RefreshButton";
import "./Forecast.css";

const API_KEY = "2a03172025e93f32e5e3b141bd0f1aef";

const CurrentLocationWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [coords, setCoords] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchWeather = async (position) => {
    try {
      const { latitude, longitude } = position.coords;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
    setLoading(false);
    setRefreshing(false);
  };

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      });
    });
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const position = await getCurrentLocation();
      await fetchWeather(position);
    } catch (error) {
      console.error("Error refreshing weather:", error);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      getCurrentLocation()
        .then((position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ latitude, longitude });
          return fetchWeather(position);
        })
        .catch((error) => {
          console.error("Error getting location:", error);
          setLoading(false);
        });
    } else {
      alert("Geolocation not supported");
      setLoading(false);
    }
  }, []);

  return (
    <motion.div 
      className="weather-container"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="weather-header">
        <h2>Current Location Weather</h2>
        {weather && <RefreshButton onRefresh={handleRefresh} isLoading={refreshing} />}
      </div>
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
        ) : (
          <motion.p
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Weather data unavailable.
          </motion.p>
        )}
      </AnimatePresence>
      {coords && <CurrentLocationForecast latitude={coords.latitude} longitude={coords.longitude} />}
    </motion.div>
  );
};

export default CurrentLocationWeather;