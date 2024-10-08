const API_KEY = "4e72e2a909f8e2a7414d674c7b6a03b4";
const API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const searchContainer = document.querySelector(".search-container");
const searchInput = document.querySelector(".search-request");
const searchButton = document.querySelector(".search-button");
const forecastBlock = document.querySelector(".forecast-container");
const weatherPicture = document.querySelector(".weather-picture");
const currentLocation = document.querySelector(".location-icon");
const errorBlock = document.querySelector(".error-container");

async function checkWeather(city) {
  let response;
  try {
    response = await fetch(API_URL + city + `&appid=${API_KEY}`);
    if (!response.ok) {
      throw new Error(`${response.status} — ${response.statusText}`);
    }
  } catch (err) {
    console.log("Поймали ошибку! Вот она: ", err.message);
    errorBlock.classList.remove("hidden");

    searchContainer.classList.add("hidden");
  }
  const data = await response.json();
  console.log(data);
  displayWeather(data);
}
const isSunnyWeather = (data) => {
  if (
    data.weather[0].description === "clear sky" ||
    data.weather[0].description === "few clouds" ||
    data.weather[0].description === "scattered clouds"
  ) {
    forecastBlock.style.background = "#87CEEB";
  } else {
    forecastBlock.style.background = "#A5A5A5";
  }
};
const displayWeather = (data) => {
  forecastBlock.classList.remove("hidden");
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".description-text").innerHTML =
    data.weather[0].description;
  document.querySelector(".temperature-value").innerHTML =
    Math.round(data.main.temp) + "&#8451";
  document.querySelector(".humidity-value").innerHTML =
    data.main.humidity + "%";
  document.querySelector(".wind-value").innerHTML = data.wind.speed + " km/h";
  document.querySelector(".pressure-value").innerHTML =
    data.main.pressure + " mbar";
  const iconCode = data.weather[0].icon;
  const iconUrl = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";
  weatherPicture.setAttribute("src", iconUrl);
  isSunnyWeather(data);
};

const removeWeather = () => {
  document.querySelector(".city").innerHTML = "";
  document.querySelector(".description-text").innerHTML = "";
  document.querySelector(".temperature-value").innerHTML = "";
  document.querySelector(".humidity-value").innerHTML = "";
  document.querySelector(".wind-value").innerHTML = "";
  document.querySelector(".pressure-value").innerHTML = "";
  const iconUrl = "";
  weatherPicture.setAttribute("src", iconUrl);
};

searchButton.addEventListener("click", () => {
  searchContainer.classList.add("hidden");
  checkWeather(searchInput.value);
  searchInput.value = "";
});

searchInput.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    checkWeather(searchInput.value);
    searchContainer.classList.add("hidden");
    searchInput.value = "";
  }
});

currentLocation.addEventListener("click", () => {
  removeWeather();
  forecastBlock.classList.add("hidden");
  searchContainer.classList.remove("hidden");
});
