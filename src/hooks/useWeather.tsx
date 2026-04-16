import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { WeatherData, WeatherState } from '../types/weather';
import { fetchWeather } from '../services/weatherService';

interface WeatherContextType extends WeatherState {
  refreshWeather: () => Promise<void>;
  setLocation: (loc: string) => void;
  toggleUnit: () => void;
  locationName: string;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

const CACHE_KEY = 'weather_data_cache';
const REFRESH_INTERVAL = 15 * 60 * 1000; // 15 minutes

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState('Lahore');
  const [state, setState] = useState<WeatherState>({
    data: null,
    loading: true,
    error: null,
    unit: 'C'
  });

  const loadWeather = useCallback(async (loc: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await fetchWeather(loc);
      setState(prev => ({ ...prev, data, loading: false }));
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
    } catch (err) {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data } = JSON.parse(cached);
        setState(prev => ({ ...prev, data, loading: false, error: 'Using offline data' }));
      } else {
        setState(prev => ({ ...prev, loading: false, error: 'Failed to fetch weather' }));
      }
    }
  }, []);

  useEffect(() => {
    loadWeather(location);
    const interval = setInterval(() => loadWeather(location), REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [location, loadWeather]);

  const refreshWeather = () => loadWeather(location);
  const toggleUnit = () => setState(prev => ({ ...prev, unit: prev.unit === 'C' ? 'F' : 'C' }));

  return (
    <WeatherContext.Provider value={{ ...state, refreshWeather, setLocation, toggleUnit, locationName: location }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) throw new Error('useWeather must be used within WeatherProvider');
  return context;
};
