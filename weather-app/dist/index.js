"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_KEY = "6136553f6d10208c22ba776b9706177f";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");
function fetchWeather(city) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            weatherResult.innerHTML = "Loading...";
            const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error("City not found!");
            }
            const data = yield response.json();
            displayWeather(data);
        }
        catch (error) {
            if (error instanceof Error) {
                weatherResult.innerHTML = `<p class="error">❌ ${error.message}</p>`;
            }
        }
    });
}
function displayWeather(data) {
    const { name, main, weather, wind } = data;
    const description = weather[0].description;
    const icon = weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    weatherResult.innerHTML = `
        <img src="${iconUrl}" alt="${description}" />
        <p class="temp">${Math.round(main.temp)}°C</p>
        <p>${name}</p>
        <p>${description}</p>
        <p>💧 Humidity: ${main.humidity}%</p>
        <p>🌬 Wind: ${wind.speed} m/s</p>
        <p>🤔 Feels like: ${Math.round(main.feels_like)}°C</p>
    `;
}
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city === "") {
        weatherResult.innerHTML = `<p class="error">❌ Please enter a city!</p>`;
        return;
    }
    fetchWeather(city);
});
cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});
