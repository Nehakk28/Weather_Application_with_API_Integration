// ============================================
// Weatherly App Controller
// ============================================

let currentCity = CONFIG.DEFAULT_CITY;
let currentUnit = CONFIG.DEFAULT_UNIT;

// ===============================
// Load Weather
// ===============================

async function loadWeather(city) {

    ui.showLoading();
    ui.hideError();

    try {

        // Current Weather
        const currentWeather =
            await weatherService.getCurrentWeather(city);
            console.log("City:", currentWeather.name);
            console.log("Country:", currentWeather.sys.country);
            console.log("Coordinates:", currentWeather.coord);
            console.log("Sunrise:", new Date(currentWeather.sys.sunrise * 1000));
            console.log("Sunset:", new Date(currentWeather.sys.sunset * 1000));

        // Forecast
        const forecast =
            await weatherService.getForecast(city);

        // Display Current Weather
        ui.displayCurrentWeather(currentWeather);

        // Display Forecast
        ui.displayForecast(forecast);

        // Display Hourly Forecast
        if (ui.displayHourlyForecast) {
            ui.displayHourlyForecast(forecast);
        }

        // Extra Details
        if (ui.displayExtraDetails) {
            ui.displayExtraDetails(currentWeather);
        }

        // Air Quality
        if (weatherService.getAirQuality) {

            const air =
                await weatherService.getAirQuality(
                    currentWeather.coord.lat,
                    currentWeather.coord.lon
                );
            console.log("AQI Response:", air);
            if (ui.displayAQI) {
                ui.displayAQI(air);
            }

        }

        // Save Recent Search
        storage.saveRecentSearch(city);

        // Refresh Favorites
        ui.displayFavorites();

        currentCity = city;

    }

    catch (error) {

        console.error(error);

        ui.showError(error.message);

    }

    finally {

        ui.hideLoading();

    }

}

// ===============================
// Search
// ===============================

document
.getElementById("searchBtn")
.addEventListener("click", () => {

    const city =
        document
        .getElementById("searchInput")
        .value
        .trim();

    if (city === "") {

        ui.showError("Please enter a city.");

        return;

    }

    loadWeather(city);

});

// ===============================
// Enter Key
// ===============================

document
.getElementById("searchInput")
.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        document
            .getElementById("searchBtn")
            .click();

    }

});

// ===============================
// Current Location
// ===============================

document
.getElementById("locationBtn")
.addEventListener("click", () => {

    if (!navigator.geolocation) {

        ui.showError("Geolocation not supported.");

        return;

    }

    navigator.geolocation.getCurrentPosition(

        async (position) => {

            try {

                ui.showLoading();

                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                const weather =
                    await weatherService.getWeatherByLocation(lat, lon);

                const forecast =
                    await weatherService.getForecastByLocation(lat, lon);

                ui.displayCurrentWeather(weather);
                ui.displayForecast(forecast);

                if (ui.displayHourlyForecast) {

                    ui.displayHourlyForecast(forecast);

                }

                if (ui.displayExtraDetails) {

                    ui.displayExtraDetails(weather);

                }

                if (weatherService.getAirQuality) {

                    const air =
                        await weatherService.getAirQuality(lat, lon);

                    ui.displayAQI(air);

                }

                currentCity = weather.name;

            }

            catch (error) {

                ui.showError(error.message);

            }

            finally {

                ui.hideLoading();

            }

        },

        () => {

            ui.showError("Unable to get location.");

        }

    );

});

// ===============================
// Temperature Toggle
// ===============================

document
.getElementById("unitToggle")
.addEventListener("click", () => {

    currentUnit =
        currentUnit === "metric"
            ? "imperial"
            : "metric";

    weatherService.setUnit(currentUnit);

    document
        .getElementById("unitToggle")
        .innerHTML =
        currentUnit === "metric"
            ? "°C"
            : "°F";

    loadWeather(currentCity);

});

// ===============================
// Favorite City
// ===============================

document
.getElementById("favoriteBtn")
.addEventListener("click", () => {

    storage.addFavorite(currentCity);

    ui.displayFavorites();

});


function removeFavorite(city) {

    storage.removeFavorite(city);

    ui.displayFavorites();

}
// ===============================
// Theme Toggle
// ===============================

const themeBtn = document.getElementById("themeToggle");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        storage.saveTheme("dark");

        themeBtn.innerHTML='<i class="fa-solid fa-sun"></i>';

    }else{

        storage.saveTheme("light");

        themeBtn.innerHTML='<i class="fa-solid fa-moon"></i>';

    }

});

// ===============================
// Favorite Click
// ===============================

function loadCity(city) {

    loadWeather(city);

}

// ===============================
// App Start
// ===============================

window.addEventListener("DOMContentLoaded", () => {

    loadWeather(CONFIG.DEFAULT_CITY);

});

const savedTheme = storage.getTheme();

if(savedTheme==="dark"){

    document.body.classList.add("dark");

    document.getElementById("themeToggle").innerHTML=
    '<i class="fa-solid fa-sun"></i>';

}

