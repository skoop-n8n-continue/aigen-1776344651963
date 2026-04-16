import axios from 'axios';
import { WeatherData } from '../types/weather';

const BASE_URL = 'https://api.weatherapi.com/v1';
const API_KEY = 'YOUR_API_KEY'; // Replace with real key

export const fetchWeather = async (location: string): Promise<WeatherData> => {
  try {
    // If API key is placeholder, return mock data
    if (API_KEY === 'YOUR_API_KEY') {
      return getMockData(location);
    }

    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: location,
        days: 7,
        aqi: 'yes',
        alerts: 'yes'
      }
    });
    return response.data;
  } catch (error) {
    console.warn('Weather API failed, using mock data', error);
    return getMockData(location);
  }
};

const getMockData = (location: string): WeatherData => {
  // Mock data for Lahore
  return {
    location: {
      name: location,
      region: "Punjab",
      country: "Pakistan",
      localtime: new Date().toISOString()
    },
    current: {
      temp_c: 34,
      temp_f: 93.2,
      condition: {
        text: "Partly cloudy",
        icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
        code: 1003
      },
      wind_kph: 15,
      humidity: 45,
      feelslike_c: 36,
      uv: 8,
      air_quality: {
        "us-epa-index": 3,
        pm2_5: 45.2,
        pm10: 82.1
      }
    },
    forecast: {
      forecastday: Array.from({ length: 7 }).map((_, i) => ({
        date: new Date(Date.now() + i * 86400000).toISOString().split('T')[0],
        day: {
          maxtemp_c: 35 + Math.random() * 5,
          mintemp_c: 25 + Math.random() * 3,
          daily_chance_of_rain: Math.floor(Math.random() * 20),
          condition: {
            text: i % 2 === 0 ? "Sunny" : "Partly cloudy",
            icon: i % 2 === 0 ? "//cdn.weatherapi.com/weather/64x64/day/113.png" : "//cdn.weatherapi.com/weather/64x64/day/116.png"
          }
        },
        hour: Array.from({ length: 24 }).map((_, j) => ({
          time: `2026-04-16 ${j.toString().padStart(2, '0')}:00`,
          temp_c: 28 + Math.sin(j / 4) * 7,
          condition: {
            text: "Clear",
            icon: "//cdn.weatherapi.com/weather/64x64/night/113.png"
          }
        }))
      }))
    }
  };
};
