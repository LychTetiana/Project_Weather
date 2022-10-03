
function formatDate(date) {
  
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let currentDay = days[date.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let currentMonth = months[date.getMonth()];
  let currentdate = date.getDate();

  return `${currentDay}, ${currentMonth} ${currentdate}`;
}

let now = new Date();
let dateElement = document.querySelector("#date-today");
dateElement.innerHTML = formatDate(now);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}


function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
let noww = new Date();
let timeElement = document.querySelector("#time");
timeElement.innerHTML = formatTime(noww);

function search(event) {
  event.preventDefault();

  let city = document.querySelector("#city-input");
  let span = document.querySelector("#city");
  span.innerHTML = `${city.value}`;
  searchCity(city.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

//Cel to Fahr
function celChange(event) {
  event.preventDefault();
  cel.classList.add("active");
  fah.classList.remove("active");
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = Math.round(celsiusCurrent);
}

function fahrtChange(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temperature");
  cel.classList.remove("active");
  fah.classList.add("active");
  let fahrenheitForm = (celsiusCurrent * 9 / 5) + 32;
  currentTemp.innerHTML = Math.round(fahrenheitForm);
}
let celsiusCurrent = null;

let cel = document.querySelector("#celsius-link");
let fah = document.querySelector("#fahrenheit-link");
cel.addEventListener("click", celChange);
fah.addEventListener("click", fahrtChange);

//HW_W5

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentTemp);
}

function showWeather(response) {
  let h1 = document.querySelector("h1");
  let temperature = Math.round(response.data.main.temp);
  h1.innerHTML = `${response.data.name} ${temperature}°`;
  celsiusCurrent = response.data.main.temp;
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

navigator.geolocation.getCurrentPosition(retrievePosition);

//Current Position

function currentTemp(current) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${current.data.name}`;
  let temp = Math.round(current.data.main.temp);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${temp}`;
}

function currentCity(current) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = current.coords.latitude;
  let lon = current.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(currentTemp);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(currentCity);
}

let button = document.querySelector("#currentid");
button.addEventListener("click", getCurrentPosition);

// Week 7

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureCurrent = document.querySelector("#temperature");
  let cityCurrent = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionCurrent = document.querySelector("#description");
  let iconCurrent = document.querySelector("#icon");
  let dateElement = document.querySelector("#date-today"); 

  celsiusCurrent = response.data.main.temp;

  temperatureCurrent.innerHTML = Math.round(response.data.main.temp);
  cityCurrent.innerHTML = response.data.name;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionCurrent.innerHTML = response.data.weather[0].description;
  iconCurrent.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  dateElement.innerHTML = formatDate(new Date(response.data.dt * 1000));
  iconCurrent.setAttribute("alt", response.data.weather[0].description);
  
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);

  getForecast(response.data.coord);
}

let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
let city = "Lviv";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

navigator.geolocation.getCurrentPosition(retrievePosition);


function nowLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

//Week 8

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col bg-white border rounded shadow-sm">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
