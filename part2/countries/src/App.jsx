import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import CountryInformation from "./components/CountryInformation";

function App() {
  const [filterCountryText, setFilterCountryText] = useState("");
  const [data, setData] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const api_key = import.meta.env.VITE_SOME_KEY;
  console.log("api_key", api_key);
  useEffect(() => {
    console.log("effect run, country is now", data);
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        // the data for all of the country
        const countryData = response.data;

        const countriesWithLatLng = countryData.filter((c) =>
          c.capitalInfo?.hasOwnProperty("latlng")
        );
        // Fetch weather data for each country
        const weatherRequests = countriesWithLatLng.map((c) => {
          const lat = c.capitalInfo.latlng[0];
          const lon = c.capitalInfo.latlng[1];
          return axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
          );
        });

        // wait for all weather requests to complete
        Promise.all(weatherRequests).then((weatherResponses) => {
          const updatedData = countryData.map((country) => {
            if (country.capitalInfo?.hasOwnProperty("latlng")) {
              const weatherData = weatherResponses.find((response) =>
                response.config.url.includes(
                  `lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}`
                )
              );

              return {
                ...country,
                weather: weatherData.data,
              };
            }
            return country;
          });
          setData(updatedData);
        });
      });
  }, []);
  if (!data) {
    return null;
  }
  function handleMoreClick(country) {
    // changing the click from hide to show, and vice versa
    setShowMore(!showMore);

    if (selectedCountry === country) {
      // Deselect the countryjj
      setSelectedCountry(null);
    } else {
      // Select a different country
      setSelectedCountry(country);
    }
  }

  return (
    <div>
      <SearchBar
        filterCountryText={filterCountryText}
        onFilterCountryTextChange={setFilterCountryText}
      />

      <CountryInformation
        data={data}
        value={filterCountryText}
        handleMoreClick={handleMoreClick}
        showMore={showMore}
        selectedCountry={selectedCountry}
        api_key={api_key}
      />
    </div>
  );
}

export default App;
