// WeatherInfo.jsx
import React from "react";
import "./WeatherInfo.css";

const WeatherInfo = ({ weatherData }) => {
  if (!weatherData) {
    return <div className="weather-info">Search for a city to see the weather details.</div>;
  }

  return (
    <div className="weather-info">
      <h2>{weatherData.name}, {weatherData.sys.country}</h2>
      <h3>{weatherData.weather[0].description}</h3>
      <h1>{Math.round(weatherData.main.temp)}°C</h1>
      <div className="weather-details">
        <p>Humidity: {weatherData.main.humidity}%</p>
        <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        <p>Pressure: {weatherData.main.pressure} hPa</p>
      </div>
    </div>
  );
};

export default WeatherInfo;
