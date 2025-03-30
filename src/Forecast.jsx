import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Forecast.css";

const API_KEY = "2a03172025e93f32e5e3b141bd0f1aef";

const Forecast = ({ city }) => {
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    if (!city) return;

    const fetchForecast = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();

        if (data.cod === "200") {
          setForecastData(data);
        } else {
          alert(`Forecast Error: ${data.message}`);
        }
      } catch (error) {
        console.error("Error fetching forecast:", error);
      }
    };

    fetchForecast();
  }, [city]);

  return (
    <motion.div
      className="forecast-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2>5-Day Forecast for {city}</h2>
      {forecastData ? (
        <div className="forecast-grid">
          {forecastData.list
            .filter((_, index) => index % 8 === 0)
            .map((item, index) => (
              <motion.div
                key={index}
                className="forecast-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <p className="forecast-date">{new Date(item.dt_txt).toDateString()}</p>
                <img 
                  className="weather-icon"
                  src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt={item.weather[0].description}
                />
                <p className="forecast-temp">🌡️ {Math.round(item.main.temp)}°C</p>
                <p className="forecast-description">{item.weather[0].description}</p>
                <div className="forecast-details">
                  <span>💧 {item.main.humidity}%</span>
                  <span>🌪️ {Math.round(item.wind.speed * 3.6)} km/h</span>
                </div>
              </motion.div>
            ))}
        </div>
      ) : (
        <p className="loading-text">Loading forecast...</p>
      )}
    </motion.div>
  );
};

export default Forecast;