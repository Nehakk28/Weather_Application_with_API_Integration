// ===============================================
// Storage Manager
// ===============================================

class Storage {

    constructor() {

        this.favoriteKey = "weather_favorites";
        this.recentKey = "weather_recent";
        this.themeKey = "weather_theme";
        this.unitKey = "weather_unit";

    }

    // ==========================================
    // Favorites
    // ==========================================

    getFavorites() {

        return JSON.parse(
            localStorage.getItem(this.favoriteKey)
        ) || [];

    }

    addFavorite(city) {

        let favorites = this.getFavorites();

        if (!favorites.includes(city)) {

            favorites.push(city);

            localStorage.setItem(
                this.favoriteKey,
                JSON.stringify(favorites)
            );

        }

    }

    removeFavorite(city) {

        let favorites = this.getFavorites();

        favorites = favorites.filter(item => item !== city);

        localStorage.setItem(
            this.favoriteKey,
            JSON.stringify(favorites)
        );

    }

    isFavorite(city) {

        return this.getFavorites().includes(city);

    }

    clearFavorites() {

        localStorage.removeItem(this.favoriteKey);

    }

    // ==========================================
    // Recent Searches
    // ==========================================

    getRecentSearches() {

        return JSON.parse(
            localStorage.getItem(this.recentKey)
        ) || [];

    }

    saveRecentSearch(city) {

        let recent = this.getRecentSearches();

        // Remove duplicate
        recent = recent.filter(item => item !== city);

        // Add newest at beginning
        recent.unshift(city);

        // Keep only latest 5 searches
        recent = recent.slice(0, 5);

        localStorage.setItem(
            this.recentKey,
            JSON.stringify(recent)
        );

    }

    clearRecentSearches() {

        localStorage.removeItem(this.recentKey);

    }

    // ==========================================
    // Theme
    // ==========================================

    saveTheme(theme) {

        localStorage.setItem(
            this.themeKey,
            theme
        );

    }

    getTheme() {

        return localStorage.getItem(
            this.themeKey
        ) || "light";

    }

    // ==========================================
    // Temperature Unit
    // ==========================================

    saveUnit(unit) {

        localStorage.setItem(
            this.unitKey,
            unit
        );

    }

    getUnit() {

        return localStorage.getItem(
            this.unitKey
        ) || "metric";

    }

    // ==========================================
    // Clear Everything
    // ==========================================

    clearAll() {

        localStorage.removeItem(this.favoriteKey);
        localStorage.removeItem(this.recentKey);
        localStorage.removeItem(this.themeKey);
        localStorage.removeItem(this.unitKey);

    }

}



// Create Global Object

const storage = new Storage();

