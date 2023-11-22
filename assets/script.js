const cityEl = document.querySelector(".cityEl");
const Api_key = "f431220ce83bb4b153921b771e24d877";
const searchButton = document.querySelector(".button");
const weathercards = document.querySelector(".weathercard");
const currentweather = document.querySelector(".weather");

const createWeatherCard = (cityName, weatheritem, index) => {
    if (index === 0) {
        return `
        <div class="weather">
            <h2>City: ${cityName}</h2>
            <img src="https://openweathermap.org/img/wn/${weatheritem.weather[0].icon}@2x.png" alt="weathericon">
            <h4>Temperature: ${weatheritem.main.temp}°F</h4>
            <h4>Wind: ${weatheritem.wind.speed}mph</h4>
            <h4>Humidity: ${weatheritem.main.humidity}%</h4>
        </div>`;
    } else {
        return ` <li class="containers">
        <h3>(${weatheritem.dt_txt.split(" ")[0]})</h3>
        <img src="https://openweathermap.org/img/wn/${weatheritem.weather[0].icon}@2x.png" alt="weathericon">
        <h4>Temperature: ${weatheritem.main.temp}°F</h4>
        <h4>Wind: ${weatheritem.wind.speed}mph</h4>
        <h4>Humidity: ${weatheritem.main.humidity}%</h4>
        <img src="" alt="" class="weather-icon">
        </li>`;
    }
};

const resetWeather = () => {
    weathercards.innerHTML = "";
    currentweather.innerHTML = ""; 
};

const weatherdetails = (cityName, lat, lon) => {
    resetWeather();

    const weatherapi = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${Api_key}`;
    fetch(weatherapi)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);

            const forecastdays = [];
            const fiveDayForecast = data.list.filter((forecast) => {
                const forecastdate = new Date(forecast.dt_txt).getDate();
                if (!forecastdays.includes(forecastdate)) {
                    forecastdays.push(forecastdate);
                    return true;
                }
                return false;
            });

            console.log(fiveDayForecast);
            fiveDayForecast.forEach((weatheritem, index) => {
                if (index === 0) {
                    currentweather.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatheritem, index));
                } else {
                    weathercards.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatheritem, index));
                }
            });
        });
};

const CityCoordinates = () => {
    const cityName = cityEl.value.trim();
    if (!cityName) return;

    console.log(cityName);

    const geocodeapi = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${Api_key}`;

    fetch(geocodeapi)
        .then((res) => res.json())
        .then((data) => {
            const { name, lat, lon } = data[0];
            weatherdetails(name, lat, lon);
        });
};

searchButton.addEventListener("click", CityCoordinates);