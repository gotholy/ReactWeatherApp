import "./Home.css";
import { useEffect, useState } from "react";

const Home = () => {
  const [weather, setWeather] = useState(null);
  const api_key = "a1575f46509be3ef770e0d4090a465af";

  const [city, setCity] = useState("");
  const [iconURL, setIconURL] = useState("");
  const [temperatur, setTemperatur] = useState("");

  const handleButtonClick = (event) => {
    const selectedCity = event.target.value;
    setCity(selectedCity);
    console.log(city);
    console.log(selectedCity);
  };

  useEffect(() => {
    if (city) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&lang=de&units=metric`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (data.cod === "404") {
            console.error("Stadt nicht gefunden", error);
          } else {
            setWeather(data);
            console.log(data);
            const iconId = data.weather[0].icon;
            console.log(iconId);
            const iconURL = `https://openweathermap.org/img/wn/${iconId}@2x.png`;
            console.log(iconURL);
            setIconURL(iconURL);
            const temp = data.main.temp;
            console.log(temp);
            setTemperatur(temp);
          }
        })

        .catch((err) => console.error("Fehler beim Fetchen der API", err));
    }
  }, [city]);

  return (
    <>
      <button value="Hamburg" onClick={handleButtonClick}>
        Hamburg
      </button>
      <button value="Berlin" onClick={handleButtonClick}>
        Berlin
      </button>
      <button value="Köln" onClick={handleButtonClick}>
        Köln
      </button>
      <button value="Australien" onClick={handleButtonClick}>
        Australien
      </button>
      <section>
        <h1>Das Wetter ist</h1>
        <h3>
          Aktuell: {weather && weather.weather[0].description} in {city}
        </h3>
        {weather && <img src={iconURL} alt="Weather Icon" />}
        <p>mit: {weather && temperatur}°C</p>
      </section>
    </>
  );
};

export default Home;
