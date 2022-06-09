// day and time
let now = new Date();

let dateTime = document.querySelector("#date-time");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
hours = hours <= 9 ? "0" + hours : hours;
let minutes = now.getMinutes();
minutes = minutes > 9 ? minutes : "0" + minutes;

dateTime.innerHTML = `${day}, ${hours}:${minutes}`;

//weather api

function showWeather(response) {
  document.querySelector("#city");
  city.innerHTML = response.data.name;
  document.querySelector("#temp");
  temp.innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
}

function searchCity(city) {
  let apiKey = "95f4246d3ed416a00b60d11bef81aa4f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

// search engine
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

// geolocation
function searchLocation(position) {
  let apiKey = "95f4246d3ed416a00b60d11bef81aa4f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//
let form = document.querySelector("#search-engine");
form.addEventListener("submit", search);

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", getCurrentLocation);

searchCity("Tompkinsville");
