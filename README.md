# 🌤️ Weather App

## This project was built to strengthen my understanding of asynchronous JavaScript and working with third-party APIs. It allows users to search for weather information for cities around the world or retrieve weather data for their current location using the browser's Geolocation API.

## 🚀 Live Demo

🔗 **Live Site:** https://nzube606.github.io/weather-app/

---

## ✨ Features

- 🌍 Search weather by city name
- 📍 Get weather for your current location
- 🌡️ Display current temperature and weather conditions
- 💧 View humidity levels
- 🌬️ Display wind speed
- 🌅 View sunrise and sunset times
- ⏳ Loading indicator while fetching data
- ❌ Friendly error messages for invalid locations
- 📱 Responsive user interface

---

## 🛠️ Built With

- HTML5
- CSS3
- JavaScript (ES6)
- Fetch API
- Async/Await
- Geolocation API
- Visual Crossing Weather API

---

## 📂 Installation

Clone the repository

```bash
git clone https://github.com/Nzube606/weather-app.git
```

Navigate into the project

```bash
cd weather-app
```

Open `index.html` in your browser or use a local development server.

---

## 🧠 What I Learned

This project strengthened my understanding of:

- Working with REST APIs using the Fetch API
- Asynchronous programming with `async/await`
- Error handling using `try...catch`
- Processing and transforming API responses into application-friendly objects
- DOM manipulation and dynamic rendering
- Browser Geolocation API
- Managing loading states to improve user experience

One of the biggest lessons from this project was learning to separate API logic, data processing, and UI rendering into different functions instead of putting everything into a single function.

---

## 🚧 Challenges

One challenge was handling different API responses and ensuring the application didn't crash when users entered invalid locations or when requests failed.

Another challenge was designing the application so that weather data could be processed once and then displayed cleanly throughout the interface instead of repeatedly accessing deeply nested API properties.

---

## 🔐 Security Note

This application is entirely client-side, so the weather API key is exposed to the browser during requests. For production applications, API requests should be routed through a backend server where the API key can be stored securely using environment variables.

---

## 🔮 Future Improvements

- 5-day weather forecast
- Weather history
- Favorite locations
- Temperature unit toggle (°C / °F)
- Dark mode
- Backend proxy for secure API requests
- Progressive Web App (PWA) support

---

## 👨‍💻 Author

**Ilodigwe Nzubechukwu**

- GitHub: https://github.com/Nzube606
