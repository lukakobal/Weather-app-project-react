import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org{fd8b1243efc032340274d0cf59047909}`
        );
        const data = await response.json();
        setWeather(data);
        setLoading(false);
      } catch (error) {
        console.error("Napaka pri pridobivanju podatkov:", error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="wrapper">
      <div className="input">
        <h1 className="city">Search</h1>

        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city..."
        />
      </div>

      <div className="header">
        <h1 className="city">London</h1>
        <p className="temperature">60°F</p>
        <p className="condition">Cloudy</p>
      </div>
      <div className="weather-details">
        <div>
          <p>Humidity</p>
          <p> 60%</p>
        </div>
        <div>
          <p>Wind Speed</p>
          <p>7 mph</p>
        </div>
      </div>
      <div className="forecast">
        <h2 className="forecast-header">5-Day Forecast</h2>
        <div className="forecast-days">
          <div className="forecast-day">
            <p>Monday</p>
            <p>Cloudy</p>
            <p>12°F</p>
          </div>
          <div className="forecast-day">
            <p>Monday</p>
            <p>Cloudy</p>
            <p>12°F</p>
          </div>
        </div>
      </div>
    </div>
  );
}
