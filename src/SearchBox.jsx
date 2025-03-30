import React, { useState } from "react";
import "./SearchBox.css";

const SearchBox = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent page reload
    if (city.trim() === "") {
      alert("Please enter a city name");
      return;
    }
    onSearch(city); // Call parent function
    setCity(""); // Clear input after search
  };

  return (
    <form className="search-box" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBox;
