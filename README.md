# 🌦️ Weatherly - Weather Dashboard

A modern, responsive weather dashboard built using **HTML, CSS, and JavaScript**. The application fetches real-time weather information from the **OpenWeatherMap API** and displays current weather, forecasts, air quality, sunrise/sunset, and more in an elegant dashboard interface.

## Features

-  Search weather by city
-  Get weather using current location
-  Current temperature and weather conditions
-  5-Day weather forecast
-  Hourly weather forecast
-  Humidity
-  Wind Speed
-  Atmospheric Pressure
-  Sunrise & Sunset timings
-  Air Quality Index (AQI)
-  Add/Remove Favorite Cities
-  Dark / Light Mode
-  Weather Map Integration
-  Fully Responsive Design
-  Local Storage Support
-  Error Handling & Loading Animation

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- OpenWeatherMap API
- OpenWeather Air Pollution API
- Geolocation API
- Local Storage
- Font Awesome

## 📂 Project Structure

```
Weatherly/
│
├── css/
│   ├── style.css
│   ├── responsive.css
│   └── weather-icons.css
│
├── js/
│   ├── app.js
│   ├── config.js
│   ├── storage.js
│   ├── ui.js
│   └── weatherService.js
│
├── index.html
├── README.md
└── .gitignore
```


##  Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Nehakk28/Weather_Application_with_API_Integration.git
```

### 2️⃣ Open the Project

Open the project folder in **Visual Studio Code**.

### 3️⃣ Get an API Key

Create a free account on OpenWeatherMap and generate an API key.

https://openweathermap.org/api

### 4️⃣ Configure the API Key

Open:

```
js/config.js
```

Replace:

```javascript
API_KEY: "YOUR_OPENWEATHER_API_KEY"
```

with

```javascript
API_KEY: "YOUR_API_KEY"
```

### 5️⃣ Run the Project

Open **index.html** using Live Server or any local server.


## APIs Used

### Current Weather

```
https://api.openweathermap.org/data/2.5/weather
```

### 5-Day Forecast

```
https://api.openweathermap.org/data/2.5/forecast
```

### Air Pollution

```
https://api.openweathermap.org/data/2.5/air_pollution
```

### Geocoding API

```
https://api.openweathermap.org/geo/1.0/direct
```

## Future Enhancements

- Weather Alerts
- Search Autocomplete
- Weather Background Animations
- Multiple Theme Colors
- Weather Notifications
- Weather Charts
- Voice Search
- Multi-language Support
- 
## 📱 Responsive Design

The application is optimized for:

- Desktop
- Laptop
- Tablet
- Mobile Devices


## ⭐ If you like this project

Give this repository a ⭐ on GitHub.
