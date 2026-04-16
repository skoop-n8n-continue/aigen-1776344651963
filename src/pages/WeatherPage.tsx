import React, { useState } from 'react';
import { useWeather } from '../hooks/useWeather';
import Clock from '../components/Clock';
import WeatherCard from '../components/WeatherCard';
import Forecast from '../components/Forecast';
import AdvancedInsights from '../components/AdvancedInsights';
import VoiceAssistant from '../components/VoiceAssistant';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Moon, Sun, RefreshCw } from 'lucide-react';

interface WeatherPageProps {
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

const WeatherPage: React.FC<WeatherPageProps> = ({ isDarkMode, setIsDarkMode }) => {
  const { data, loading, error, refreshWeather, setLocation, locationName } = useWeather();
  const [searchInput, setSearchInput] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setLocation(searchInput);
      setSearchInput('');
      setShowSearch(false);
    }
  };

  const getBackgroundClass = () => {
    if (!data) return 'bg-gradient-to-br from-dark to-slate-900';
    const condition = data.current.condition.text.toLowerCase();
    if (condition.includes('rain')) return 'bg-gradient-to-br from-slate-700 to-slate-900';
    if (condition.includes('cloud')) return 'bg-gradient-to-br from-blue-900 to-slate-900';
    if (condition.includes('clear') || condition.includes('sunny')) {
      return isDarkMode ? 'bg-gradient-to-br from-indigo-950 to-dark' : 'bg-gradient-to-br from-blue-400 to-blue-600';
    }
    return 'bg-gradient-to-br from-dark to-slate-900';
  };

  return (
    <div className={`min-h-screen w-full relative overflow-x-hidden ${getBackgroundClass()} transition-all duration-1000 p-4 md:p-8 lg:p-12 flex flex-col items-center`}>
      {/* Background Animation Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Header Controls */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
            <MapPin size={18} className="text-primary" />
            <span className="font-bold tracking-wide uppercase text-sm">{locationName}</span>
          </div>
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
          >
            <Search size={20} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={refreshWeather}
            className={`p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors ${loading ? 'animate-spin' : ''}`}
          >
            <RefreshCw size={20} />
          </button>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
          >
            {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-blue-400" />}
          </button>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-0 right-0 z-20 flex justify-center px-4"
          >
            <form onSubmit={handleSearch} className="w-full max-w-md relative">
              <input
                autoFocus
                type="text"
                placeholder="Search city (e.g. Islamabad, Karachi)..."
                className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-colors pr-14"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-primary rounded-xl">
                <Search size={18} color="white" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      {error && (
        <div className="mb-4 bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-2 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* Main Content Area */}
      <main className="w-full flex flex-col items-center gap-12 relative z-10 pb-20">
        <Clock />
        <WeatherCard />
        <AdvancedInsights />
        <Forecast />
      </main>

      <VoiceAssistant />

      {/* Footer / Location Info */}
      <footer className="w-full max-w-6xl mt-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-xs">
        <p>© 2026 Skoop Weather Agent • Optimized for Lahore, Pakistan</p>
        <div className="flex gap-6">
          <span>Updates every 15m</span>
          <span>Data provided by WeatherAPI</span>
        </div>
      </footer>
    </div>
  );
};

export default WeatherPage;
