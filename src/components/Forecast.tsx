import React from 'react';
import { useWeather } from '../hooks/useWeather';
import { motion } from 'framer-motion';
import { Calendar, Clock, Umbrella } from 'lucide-react';

const Forecast: React.FC = () => {
  const { data, loading } = useWeather();

  if (loading || !data) return null;

  const hourly = data.forecast.forecastday[0].hour.filter((_, i) => i % 2 === 0); // Show every 2 hours
  const daily = data.forecast.forecastday;

  return (
    <div className="w-full max-w-6xl mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Hourly Forecast */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-dark rounded-3xl p-6 md:p-8"
      >
        <div className="flex items-center gap-2 mb-6">
          <Clock size={20} className="text-primary" />
          <h3 className="text-xl font-bold uppercase tracking-widest">Next 24 Hours</h3>
        </div>

        <div className="flex overflow-x-auto gap-6 pb-4 no-scrollbar snap-x">
          {hourly.map((h, i) => (
            <div key={i} className="flex flex-col items-center min-w-[80px] snap-center">
              <span className="text-sm text-white/40 mb-2">{h.time.split(' ')[1]}</span>
              <img src={h.condition.icon} alt={h.condition.text} className="w-12 h-12 mb-2" />
              <span className="text-xl font-bold">{Math.round(h.temp_c)}°</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 7-Day Forecast */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-dark rounded-3xl p-6 md:p-8"
      >
        <div className="flex items-center gap-2 mb-6">
          <Calendar size={20} className="text-primary" />
          <h3 className="text-xl font-bold uppercase tracking-widest">7-Day Forecast</h3>
        </div>

        <div className="flex flex-col gap-4">
          {daily.map((d, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <span className="w-24 font-medium">
                {i === 0 ? 'Today' : new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' })}
              </span>
              <div className="flex items-center gap-2 w-32">
                <img src={d.day.condition.icon} alt={d.day.condition.text} className="w-8 h-8" />
                <span className="text-xs text-white/60 truncate">{d.day.condition.text}</span>
              </div>
              <div className="flex items-center gap-4">
                {d.day.daily_chance_of_rain > 0 && (
                  <div className="flex items-center gap-1 text-blue-400 text-xs">
                    <Umbrella size={12} />
                    {d.day.daily_chance_of_rain}%
                  </div>
                )}
                <div className="flex gap-2 min-w-[60px] justify-end">
                  <span className="font-bold">{Math.round(d.day.maxtemp_c)}°</span>
                  <span className="text-white/40">{Math.round(d.day.mintemp_c)}°</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Forecast;
