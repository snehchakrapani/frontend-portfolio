interface WeatherData {
    name: string;
    main: {
        temp: number;
        humidity: number;
        feels_like: number;
    };
    weather: {
        description: string;
        icon: string;
    }[];
    wind: {
        speed: number;
    };
    sys: {
        country: string;
    };
}

const API_KEY = "6136553f6d10208c22ba776b9706177f";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const cityInput = document.getElementById("cityInput") as HTMLInputElement;
const searchBtn = document.getElementById("searchBtn") as HTMLButtonElement;
const weatherResult = document.getElementById("weatherResult") as HTMLDivElement;

async function fetchWeather(city: string) {
    weatherResult.innerHTML = "Loading...";

    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data: WeatherData = await response.json();

    if (!response.ok) {
        weatherResult.innerHTML = "City not found!";
        return;
    }

    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherResult.innerHTML = `
        <img src="${icon}" />
        <h2>${data.name}, ${data.sys.country}</h2>
        <h1>${Math.round(data.main.temp)}°C</h1>
        <p>${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind: ${data.wind.speed} m/s</p>
        <p>Feels like: ${Math.round(data.main.feels_like)}°C</p>
    `;
}

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city === "") {
        weatherResult.innerHTML = "Please enter a city!";
        return;
    }
    fetchWeather(city);
});

cityInput.addEventListener("keypress", (event: KeyboardEvent) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});









