<template>
  <div class="app-wrapper">
    <HeaderBar />

    <SearchBar :disabled="isLoading" @search="handleCitySearch" />
    
    <RefreshButton :disabled="isLoading" @refresh="refreshWeather" />

    <CityTabs :cities="cities" :selectedCity="selectedCity" @select-city="selectCity" />

    <HourlyForecast v-if="weatherData && weatherData.hourly" :hourlyData="weatherData.hourly" :city="selectedCity" />

    <DailyForecast v-if="weatherData && weatherData.daily" :dailyData="weatherData.daily" :city="selectedCity" />

    <LastUpdated v-if="lastUpdated" :timestamp="lastUpdated" />
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar.vue';
import CityTabs from './components/CityTabs.vue';
import SearchBar from './components/SearchBar.vue';
import HourlyForecast from './components/HourlyForecast.vue';
import DailyForecast from './components/DailyForecast.vue';
import LastUpdated from './components/LastUpdated.vue';
import RefreshButton from './components/RefreshButton.vue';

import { getForecastByCoordinates } from './services/weatherService.js';
import { loadCityList, searchCity } from './services/cityService.js';

export default {
  name: 'App',
  components: {
    HeaderBar,
    CityTabs,
    SearchBar,
    HourlyForecast,
    DailyForecast,
    LastUpdated,
    RefreshButton
  },
  data() {
    return {
      cities: ['Rio de Janeiro', 'Beijing', 'Los Angeles'],
      selectedCity: 'Rio de Janeiro',
      weatherData: null,
      cityList: [],
      isLoading: false,
      lastUpdated: ''
    };
  },
  async mounted() {
    await this.loadCityList();
    this.loadWeather();
  },
  methods: {
    async loadCityList() {
      try {
        this.cityList = await loadCityList();
      } catch (err) {
        console.error('Failed to load city list:', err);
      }
    },

    async handleCitySearch(query) {
      const result = searchCity(this.cityList, query);
      if (!result) {
        alert('City not found');
        return;
      }
      this.selectedCity = `${result.city_name}, ${result.country_code}`;
      await this.loadWeatherByCoordinates(result.lat, result.lon);
    },

    async loadWeather() {
      this.isLoading = true;

      const cityCoords = {
        'Rio de Janeiro': { lat: -22.9068, lon: -43.1729 },
        'Beijing': { lat: 39.9042, lon: 116.4074 },
        'Los Angeles': { lat: 34.0522, lon: -118.2437 },
      };

      const coords = cityCoords[this.selectedCity];
      if (!coords) {
        console.warn('No coordinates found for city:', this.selectedCity);
        this.isLoading = false;
        return;
      }

      try {
        const forecast = await getForecastByCoordinates(coords.lat, coords.lon);
        this.weatherData = forecast;
        this.lastUpdated = new Date().toLocaleString();
      } catch (err) {
        console.error('Weather fetch failed:', err);
      } finally {
        this.isLoading = false;
      }
    },

    async loadWeatherByCoordinates(lat, lon) {
      this.isLoading = true;
      try {
        const forecast = await getForecastByCoordinates(lat, lon);
        this.weatherData = forecast;
        this.lastUpdated = new Date().toLocaleString();
      } catch (err) {
        console.error('Weather fetch failed:', err);
      } finally {
        this.isLoading = false;
      }
    },

    selectCity(city) {
      this.selectedCity = city;
      this.loadWeather();
    },

    refreshWeather() {
      this.loadWeather();
    }
  }
};
</script>

<style scoped>
.app-wrapper {
  max-width: 450px;
  margin: 0 auto;
  padding: 12px;
  font-size: 16px;
  background-color: #ffffff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
