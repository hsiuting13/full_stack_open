import axios from "axios";
const Information = ({ data, value, handleMoreClick, selectedCountry }) => {
  const filterCountries = data.filter((c) =>
    c.name.common.toLowerCase().includes(value.toLowerCase())
  );
  // https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={API key}
  console.log(filterCountries.capitalInfo);
  const numberOfCountry = filterCountries.length;
  if (value === "") {
    return null;
  }
  if (numberOfCountry > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (numberOfCountry > 1) {
    return (
      <div>
        {filterCountries.map((c, index) => (
          <div key={index}>
            <p>
              {c.name.common}
              <button onClick={() => handleMoreClick(c)}>
                {selectedCountry === c ? "Hide" : "Show"}
              </button>
            </p>
            <div>
              {selectedCountry === c && (
                <div>
                  <h1>{c.name.common}</h1>
                  <div>
                    <p>capital {c.capital}</p>
                    <p>area {c.area}</p>
                  </div>
                  <h2>languages:</h2>
                  <ul>
                    {Object.keys(c.languages).map((key, index) => (
                      <li key={index}>{c.languages[key]}</li>
                    ))}
                  </ul>
                  <div>
                    <img src={c.flags.png} alt={c.flags.alt} />
                  </div>
                  <h2>Weather in {c.capital}</h2>

                  <div>
                    <div>temperature {c.weather.main.temp} Celcius</div>
                    <img
                      src={`https://openweathermap.org/img/wn/${c.weather.weather[0].icon}@2x.png`}
                      alt={c.weather.weather[0].description}
                    />
                    <div>wind{c.weather.wind.speed} m/s</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {filterCountries.map((c, index) => (
        <div key={index}>
          <h1>{c.name.common}</h1>
          <div>
            <p>capital {c.capital}</p>
            <p>area {c.area}</p>
          </div>
          <h2>languages:</h2>

          <ul>
            {Object.keys(c.languages).map((key, index) => (
              <li key={index}>{c.languages[key]}</li>
            ))}
          </ul>
          <div>
            <img src={c.flags.png} alt={c.flags.alt} />
          </div>
          <h1>Weather in {c.capital}</h1>

          <div>
            <div>temperature {c.weather.main.temp} Celcius</div>
            <img
              src={`https://openweathermap.org/img/wn/${c.weather.weather[0].icon}@2x.png`}
              alt={c.weather.weather[0].description}
            />
            <div>wind {c.weather.wind.speed} m/s</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Information;
