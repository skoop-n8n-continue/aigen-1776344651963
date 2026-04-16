import React from 'react';
import { useWeather } from '../hooks/useWeather';
import { motion } from 'framer-motion';
import { Wind, Droplets, Sun, Thermometer, Info } from 'lucide-react';

const WeatherCard: React.FC = () => {
  const { data, loading, unit, toggleUnit } = useWeather();

  if (loading || !data) {
    return (
      <div className="w-full max-w-4xl glass-dark rounded-3xl p-8 animate-pulse h-64">
        <div className="h-full flex flex-col justify-between">
          <div className="h-8 bg-white/10 rounded w-1/3"></div>
          <div className="flex gap-4">
            <div className="h-20 bg-white/10 rounded w-20"></div>
            <div className="h-20 bg-white/10 rounded flex-1"></div>
          </div>
        </div>
      </div>
    );
  }

  const { current } = data;

  const getSmartMessage = (temp: number) => {
    if (temp > 35) return "Stay hydrated, it's scorching outside!";
    if (temp > 30) return "It's quite warm today.";
    if (temp < 20) return "A bit chilly, grab a light jacket.";
    return "Weather is pleasant today!";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-4xl glass-dark rounded-3xl p-6 md:p-10 shadow-2xl"
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-3xl font-bold">{data.location.name}</h2>
            <div className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full uppercase tracking-tighter">Live</div>
          </div>
          <p className="text-white/60 text-lg mb-6">{current.condition.text}</p>

          <div className="flex items-center gap-4 cursor-pointer" onClick={toggleUnit}>
            <span className="text-7xl md:text-8xl font-black tracking-tighter">
              {unit === 'C' ? current.temp_c : current.temp_f}°
            </span>
            <div className="flex flex-col text-2xl font-bold opacity-40">
              <span className={unit === 'C' ? 'text-white opacity-100' : ''}>C</span>
              <span className={unit === 'F' ? 'text-white opacity-100' : ''}>F</span>
            </div>
          </div>
          <p className="mt-2 text-white/40 flex items-center gap-1">
            <Thermometer size={14} />
            Feels like {unit === 'C' ? current.feelslike_c : Math.round(current.temp_f * 1.1)}°
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          <WeatherDetail icon={<Wind className="text-primary" />} label="Wind" value={`${current.wind_kph} km/h`} />
          <WeatherDetail icon={<Droplets className="text-blue-400" />} label="Humidity" value={`${current.humidity}%`} />
          <WeatherDetail icon={<Sun className="text-yellow-400" />} label="UV Index" value={current.uv} />
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-white/10 flex items-start gap-3">
        <div className="p-2 bg-primary/10 rounded-xl">
          <Info className="text-primary" size={20} />
        </div>
        <div>
          <h4 className="font-semibold text-primary">Insight</h4>
          <p className="text-white/70 italic">"{getSmartMessage(current.temp_c)}"</p>
        </div>
      </div>
    </motion.div>
  );
};

const WeatherDetail: React.FC<{ icon: React.ReactNode; label: string; value: string | number }> = ({ icon, label, value }) => (
  <div className="flex flex-col items-center text-center">
    <div className="mb-2 p-3 glass rounded-2xl">{icon}</div>
    <span className="text-xs uppercase tracking-widest text-white/40 mb-1">{label}</span>
    <span className="text-xl font-bold">{value}</span>
  </div>
);

export default WeatherCard;
