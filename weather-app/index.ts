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









/*
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

const API_KEY: string = "6136553f6d10208c22ba776b9706177f";
const BASE_URL: string = "https://api.openweathermap.org/data/2.5/weather";

const cityInput = document.getElementById("cityInput") as HTMLInputElement;
const searchBtn = document.getElementById("searchBtn") as HTMLButtonElement;
const weatherResult = document.getElementById("weatherResult") as HTMLDivElement;

async function fetchWeather(city: string): Promise<void> {
    try {
        weatherResult.innerHTML = "Loading...";

        const url: string = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found!");
        }

        const data: WeatherData = await response.json();
        displayWeather(data);

    } catch (error) {
        if (error instanceof Error) {
            weatherResult.innerHTML = `<p class="error">❌ ${error.message}</p>`;
        }
    }
}

function displayWeather(data: WeatherData): void {
    const { name, main, weather, wind, sys } = data;
    const iconUrl: string = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    weatherResult.innerHTML = `
        <img src="${iconUrl}" alt="${weather[0].description}" />
        <p class="temp">${Math.round(main.temp)}°C</p>
        <p>${name}, ${sys.country}</p>
        <p>${weather[0].description}</p>
        <p>💧 Humidity: ${main.humidity}%</p>
        <p>🌬 Wind: ${wind.speed} m/s</p>
        <p>🤔 Feels like: ${Math.round(main.feels_like)}°C</p>
    `;
}

searchBtn.addEventListener("click", () => {
    const city: string = cityInput.value.trim();
    if (city === "") {
        weatherResult.innerHTML = `<p class="error">❌ Please enter a city!</p>`;
        return;
    }
    fetchWeather(city);
});

cityInput.addEventListener("keypress", (event: KeyboardEvent) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});
*/