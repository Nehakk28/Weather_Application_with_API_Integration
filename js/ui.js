// ==========================================
// UI Class
// ==========================================

class UI {

    constructor() {

        this.cityName = document.getElementById("cityName");
        this.dateTime = document.getElementById("dateTime");

        this.temperature = document.getElementById("temperature");
        this.description = document.getElementById("description");
        this.weatherIcon = document.getElementById("weatherIcon");

        this.feelsLike = document.getElementById("feelsLike");
        this.humidity = document.getElementById("humidity");
        this.wind = document.getElementById("wind");
        this.pressure = document.getElementById("pressure");

        this.forecast = document.getElementById("forecast");
        this.hourlyForecast = document.getElementById("hourlyForecast");

        this.sunrise = document.getElementById("sunrise");
        this.sunset = document.getElementById("sunset");

        this.aqiValue = document.getElementById("aqiValue");
        this.aqiStatus = document.getElementById("aqiStatus");

        this.loading = document.getElementById("loading");
        this.error = document.getElementById("error");

        this.favorites = document.getElementById("favorites");
        this.recentCities = document.getElementById("recentCities");

    }

    // =====================================
    // Loading
    // =====================================

    showLoading() {

        this.loading.classList.remove("hidden");

    }

    hideLoading() {

        this.loading.classList.add("hidden");

    }

    // =====================================
    // Error
    // =====================================

    showError(message) {

        this.error.innerHTML = message;

        this.error.classList.remove("hidden");

        setTimeout(() => {

            this.error.classList.add("hidden");

        }, 3000);

    }

    hideError() {

        this.error.classList.add("hidden");

    }

    // =====================================
    // Current Weather
    // =====================================

    displayCurrentWeather(data) {

        this.cityName.innerHTML =
            `${data.name}, ${data.sys.country}`;

        this.dateTime.innerHTML =
            new Date().toLocaleString();

        this.temperature.innerHTML =
            Math.round(data.main.temp);

        this.description.innerHTML =
            data.weather[0].description;

        this.weatherIcon.src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

        this.feelsLike.innerHTML =
            Math.round(data.main.feels_like) + "°";

        this.humidity.innerHTML =
            data.main.humidity + "%";

        this.wind.innerHTML =
            data.wind.speed + " km/h";

        this.pressure.innerHTML =
            data.main.pressure + " hPa";

    }

    // =====================================
    // Forecast
    // =====================================

    displayForecast(data) {

        this.forecast.innerHTML = "";

        const dailyForecast =
            data.list.filter(item =>
                item.dt_txt.includes("12:00:00")
            );

        dailyForecast.forEach(day => {

            const html = `

            <div class="forecast-item">

                <h4>

                    ${new Date(day.dt * 1000)
                        .toLocaleDateString("en-US", {
                            weekday: "short"
                        })}

                </h4>

                <img
                    src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png">

                <p>

                    ${day.weather[0].main}

                </p>

                <h3>

                    ${Math.round(day.main.temp)}°

                </h3>

            </div>

            `;

            this.forecast.innerHTML += html;

        });

    }

    // =====================================
    // Hourly Forecast
    // =====================================

    displayHourlyForecast(data) {

        this.hourlyForecast.innerHTML = "";

        const hours = data.list.slice(0, 8);

        hours.forEach(hour => {

            this.hourlyForecast.innerHTML += `

            <div class="hour-item">

                <p>

                    ${new Date(hour.dt * 1000)
                        .toLocaleTimeString([], {

                            hour: "numeric"

                        })}

                </p>

                <img
                    src="https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png">

                <h4>

                    ${Math.round(hour.main.temp)}°

                </h4>

            </div>

            `;

        });

    }

    // =====================================
    // Sunrise Sunset
    // =====================================

    displayExtraDetails(data) {

        this.sunrise.innerHTML =
            new Date(data.sys.sunrise * 1000)
                .toLocaleTimeString([], {

                    hour: "2-digit",
                    minute: "2-digit"

                });

        this.sunset.innerHTML =
            new Date(data.sys.sunset * 1000)
                .toLocaleTimeString([], {

                    hour: "2-digit",
                    minute: "2-digit"

                });

    }

    // =====================================
    // AQI
    // =====================================

    displayAQI(data) {

        const aqi =
            data.list[0].main.aqi;

        const quality = {

            1: "Good",
            2: "Fair",
            3: "Moderate",
            4: "Poor",
            5: "Very Poor"

        };

        this.aqiValue.innerHTML = aqi;

        this.aqiStatus.innerHTML =
            quality[aqi];

    }

    // =====================================
    // Favorites
    // =====================================

   displayFavorites() {

    if (!this.favorites) return;

    this.favorites.innerHTML = "";

    const favorites = storage.getFavorites();

    favorites.forEach(city => {

        this.favorites.innerHTML += `

        <div class="favorite-city">

            <span onclick="loadCity('${city}')">
                ⭐ ${city}
            </span>

            <button
                class="remove-favorite"
                onclick="removeFavorite('${city}')">

                <i class="fa-solid fa-trash"></i>

            </button>

        </div>

        `;

    });

}

    // =====================================
    // Recent Searches
    // =====================================

    displayRecentSearches() {

        if (!this.recentCities) return;

        this.recentCities.innerHTML = "";

        const recent =
            storage.getRecentSearches();

        recent.forEach(city => {

            this.recentCities.innerHTML += `

            <div
                class="favorite-city"
                onclick="loadCity('${city}')">

                📍 ${city}

            </div>

            `;

        });

    }

}

const ui = new UI();