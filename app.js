import { useState } from "react";
import "./styles.css";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = "fd8b1243efc032340274d0cf59047909";

  const fetchWeather = async () => {
    if (city === "") {
      alert("Please enter a city name");
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      const data = await response.json();

      if (data.cod !== 200) {
        alert("City not found");
        setLoading(false);
        return;
      }

      setWeather(data);
      setCity("");
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const getBackground = () => {
    if (!weather) return "background.jpg";
    const condition = weather.weather[0].main;

    if (condition === "Clear") return "sun.jpg";
    if (condition === "Rain") return "rain.jpg";
    if (condition === "Clouds") return "clouds.jpg";

    return "background.jpg";
  };

  return (
    <div
      className="body"
      style={{
        backgroundImage: `url(${getBackground()})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        transition: "background-image 0.5s ease",
      }}
    >
      <div className="wrapper">
        <div className="input">
          <h1>Search City</h1>

          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city..."
            onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
          />

          <button onClick={fetchWeather} disabled={loading}>
            {loading ? "Loading..." : "Search"}
          </button>
        </div>

        {loading && <p>Loading...</p>}

        {weather && (
          <div className="header">
            <h1>{weather.name}</h1>
            <p>Temperature: {Math.round(weather.main.temp)}°C</p>
            <p>Weather: {weather.weather[0].description}</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind: {Math.round(weather.wind.speed * 3.6)} km/h</p>
          </div>
        )}
      </div>
    </div>
  );
}

