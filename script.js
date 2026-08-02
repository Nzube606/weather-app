const mainBody = document.getElementById("main-body");
mainBody.style.backgroundColor = "rgba(229, 253, 250, 0.5)";
const leftSection = document.getElementById("left-conditions");
const rightSection = document.getElementById("right-conditions");
const h1 = document.querySelector("h1");
const loadingElement = document.querySelector(".loading");

async function fetchWeather(location) {
  // Fetch weather data for a specific location
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=K5X72JJ2BMJ945ZBCXCN4SGFR`,
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json(); // return the JSON response from the API
}
function processWeatherData(data) {
  // Process the raw weather data and extract relevant information
  const weatherInfo = {
    location: data.address,
    temperature: data.currentConditions.temp,
    condition: data.currentConditions.conditions,
    icon: data.currentConditions.icon,
    feelslike: data.currentConditions.feelslike,
    description: data.description,
    timezone: data.timezone,
    date: data.days[0].datetime,
    humidity: data.currentConditions.humidity,
  };
  return weatherInfo;
}
function clearWeatherDisplay() {
  leftSection.textContent = "";
  rightSection.textContent = "";
}
async function displayWeather(location) {
  clearWeatherDisplay(); // Clear previous weather data before displaying new data
  // Main function to fetch and display weather information for a given location
  loadingElement.classList.remove("hidden"); // Show loading indicator while fetching data
  try {
    const rawData = await fetchWeather(location);
    const weatherInfo = processWeatherData(rawData);

    clearWeatherDisplay();

    const locationElement = document.createElement("div");
    locationElement.classList.add("location-element");
    locationElement.textContent = weatherInfo.location;
    locationElement.title = weatherInfo.timezone;
    leftSection.appendChild(locationElement);

    const dateElement = document.createElement("p");
    dateElement.classList.add("date-element");
    const date = new Date(weatherInfo.date);
    const formattedDate = date.toLocaleString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    dateElement.textContent = formattedDate;
    leftSection.appendChild(dateElement);

    const weatherIcon = document.createElement("img");
    weatherIcon.height = 120;
    weatherIcon.width = 120;
    const icon = weatherInfo.icon.toLowerCase();
    weatherIcon.onerror = () => {
      weatherIcon.src = "./icons/cloudy-day.svg"; // fallback icon
    };
    weatherIcon.src = `./icons/${icon}.svg`;
    weatherIcon.alt = weatherInfo.condition;
    weatherIcon.classList.add("weather-icon");
    leftSection.appendChild(weatherIcon);

    const conditionElement = document.createElement("div");
    conditionElement.textContent = weatherInfo.condition;
    conditionElement.classList.add("condition-element");
    leftSection.appendChild(conditionElement);

    const tempElement = document.createElement("div");
    tempElement.textContent = `${weatherInfo.temperature}°`;
    tempElement.classList.add("temp-element");
    tempElement.title = "Temperature";
    rightSection.appendChild(tempElement);

    const humidityAndFeelsLikeElement = document.createElement("div");
    rightSection.appendChild(humidityAndFeelsLikeElement);

    const feelsLikeElement = document.createElement("span");
    feelsLikeElement.textContent = `${weatherInfo.feelslike}° `;
    feelsLikeElement.title = "Feels Like";
    feelsLikeElement.classList.add("feelslike-element");
    humidityAndFeelsLikeElement.appendChild(feelsLikeElement);

    const humidityElement = document.createElement("span");
    humidityElement.textContent = `| ${weatherInfo.humidity}%`;
    humidityElement.title = "Humidity";
    humidityElement.classList.add("humidity-element");
    humidityAndFeelsLikeElement.appendChild(humidityElement);

    const descriptionElement = document.createElement("div");
    descriptionElement.textContent = weatherInfo.description;
    descriptionElement.classList.add("description-element");
    rightSection.appendChild(descriptionElement);
  } catch (error) {
    console.error("Error fetching or processing weather data:", error);
    leftSection.textContent = "Unable to fetch weather data. Please try again.";
    rightSection.textContent = "";
  } finally {
    loadingElement.classList.add("hidden");
  }
}

const searchInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-button");
const currentLocationBtn = document.getElementById("current-location-btn");

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const location = searchInput.value;
  displayWeather(location);
});
currentLocationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    // Check if geolocation is supported
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const response = await fetch(
          // Use reverse geocoding to get the city name from coordinates
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
        );
        const data = await response.json();

        const city =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          data.address.county;
        displayWeather(city);
        searchInput.value = city; // Update the search input with the detected city name
      },
      (error) => {
        console.error("Error getting current location:", error);
        alert(
          "Location access denied. Please allow location access and try again.",
        );
      },
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
});
