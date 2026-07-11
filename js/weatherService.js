// ===============================================
// Weather Service
// OpenWeatherMap API
// ===============================================

class WeatherService {

    constructor() {

        this.apiKey = CONFIG.API_KEY;

        this.baseUrl = CONFIG.BASE_URL;

        this.geoUrl = CONFIG.GEO_URL;

        this.unit = CONFIG.DEFAULT_UNIT;

    }

    // ===============================================
    // Change Temperature Unit
    // ===============================================

    setUnit(unit) {

        this.unit = unit;

    }

    // ===============================================
    // Current Weather
    // ===============================================

    async getCurrentWeather(city) {

        const url =
            `${this.baseUrl}/weather?q=${city}&appid=${this.apiKey}&units=${this.unit}`;

        const response = await fetch(url);

        if (!response.ok) {

            throw new Error("City not found");

        }

        return await response.json();

    }

    // ===============================================
    // 5 Day Forecast
    // ===============================================

    async getForecast(city) {

        const url =
            `${this.baseUrl}/forecast?q=${city}&appid=${this.apiKey}&units=${this.unit}`;

        const response = await fetch(url);

        if (!response.ok) {

            throw new Error("Forecast unavailable");

        }

        return await response.json();

    }

    // ===============================================
    // Current Location Weather
    // ===============================================

    async getWeatherByLocation(lat, lon) {

        const url =
            `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=${this.unit}`;

        const response = await fetch(url);

        if (!response.ok) {

            throw new Error("Unable to fetch location weather");

        }

        return await response.json();

    }

    // ===============================================
    // Forecast By Location
    // ===============================================

    async getForecastByLocation(lat, lon) {

        const url =
            `${this.baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=${this.unit}`;

        const response = await fetch(url);

        if (!response.ok) {

            throw new Error("Unable to fetch forecast");

        }

        return await response.json();

    }

    // ===============================================
    // Air Quality
    // ===============================================

    async getAirQuality(lat, lon) {

        const url =
            `${this.baseUrl}/air_pollution?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;

        const response = await fetch(url);

        if (!response.ok) {

            throw new Error("Unable to fetch AQI");

        }

        return await response.json();

    }

    // ===============================================
    // Search Suggestions
    // ===============================================

    async searchCities(city) {

        const url =
            `${this.geoUrl}/direct?q=${city}&limit=5&appid=${this.apiKey}`;

        const response = await fetch(url);

        if (!response.ok) {

            return [];

        }

        return await response.json();

    }

    // ===============================================
    // Reverse Geocoding
    // ===============================================

    async reverseGeocode(lat, lon) {

        const url =
            `${this.geoUrl}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${this.apiKey}`;

        const response = await fetch(url);

        if (!response.ok) {

            throw new Error("Unable to reverse geocode");

        }

        return await response.json();

    }

    // ===============================================
    // Weather Icon URL
    // ===============================================

    getIcon(icon) {

        return `https://openweathermap.org/img/wn/${icon}@4x.png`;

    }

    // ===============================================
    // Convert Celsius ↔ Fahrenheit
    // ===============================================

    convertTemperature(temp) {

        if (this.unit === "metric") {

            return `${Math.round(temp)}°C`;

        }

        return `${Math.round(temp)}°F`;

    }

}

const weatherService = new WeatherService();