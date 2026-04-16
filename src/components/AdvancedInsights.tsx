import React from 'react';
import { useWeather } from '../hooks/useWeather';
import { motion } from 'framer-motion';
import { Wind, Activity, Sunrise, Sunset } from 'lucide-react';

const AdvancedInsights: React.FC = () => {
  const { data, loading } = useWeather();

  if (loading || !data) return null;

  const { air_quality } = data.current;
  const aqi = air_quality["us-epa-index"];

  const getAQIStatus = (index: number) => {
    switch (index) {
      case 1: return { label: 'Good', color: 'bg-green-500', text: 'Air quality is satisfactory.' };
      case 2: return { label: 'Moderate', color: 'bg-yellow-500', text: 'Air quality is acceptable.' };
      case 3: return { label: 'Unhealthy for Sensitive Groups', color: 'bg-orange-500', text: 'Members of sensitive groups may experience health effects.' };
      case 4: return { label: 'Unhealthy', color: 'bg-red-500', text: 'Everyone may begin to experience health effects.' };
      case 5: return { label: 'Very Unhealthy', color: 'bg-purple-500', text: 'Health alert: risk of health effects is increased for everyone.' };
      default: return { label: 'Hazardous', color: 'bg-rose-900', text: 'Health warning of emergency conditions.' };
    }
  };

  const status = getAQIStatus(aqi);

  return (
    <div className="w-full max-w-6xl mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* AQI Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-dark rounded-3xl p-6 flex flex-col justify-between"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity size={20} className="text-primary" />
            <h3 className="font-bold uppercase tracking-widest text-sm">Air Quality Index</h3>
          </div>
          <div className={`${status.color} px-3 py-1 rounded-full text-[10px] font-bold uppercase`}>
            EPA: {aqi}
          </div>
        </div>
        <div>
          <span className="text-4xl font-black mb-1 block">{status.label}</span>
          <p className="text-white/60 text-sm leading-relaxed">{status.text}</p>
        </div>
        <div className="mt-6 flex gap-4">
          <div className="flex-1">
            <span className="text-[10px] text-white/40 uppercase block mb-1">PM2.5</span>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${Math.min(air_quality.pm2_5, 100)}%` }}></div>
            </div>
          </div>
          <div className="flex-1">
            <span className="text-[10px] text-white/40 uppercase block mb-1">PM10</span>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${Math.min(air_quality.pm10, 100)}%` }}></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Wind Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-dark rounded-3xl p-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <Wind size={20} className="text-primary" />
          <h3 className="font-bold uppercase tracking-widest text-sm">Wind & Visibility</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-xs text-white/40 uppercase block">Speed</span>
            <span className="text-2xl font-bold">{data.current.wind_kph} <span className="text-sm font-normal text-white/40">km/h</span></span>
          </div>
          <div>
            <span className="text-xs text-white/40 uppercase block">Humidity</span>
            <span className="text-2xl font-bold">{data.current.humidity}<span className="text-sm font-normal text-white/40">%</span></span>
          </div>
          <div>
            <span className="text-xs text-white/40 uppercase block">Pressure</span>
            <span className="text-2xl font-bold">1012 <span className="text-sm font-normal text-white/40">hPa</span></span>
          </div>
          <div>
            <span className="text-xs text-white/40 uppercase block">UV Index</span>
            <span className="text-2xl font-bold">{data.current.uv}</span>
          </div>
        </div>
      </motion.div>

      {/* Sun Schedule */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-dark rounded-3xl p-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <Sunrise size={20} className="text-primary" />
          <h3 className="font-bold uppercase tracking-widest text-sm">Sun Schedule</h3>
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/20 rounded-xl text-yellow-500">
                <Sunrise size={20} />
              </div>
              <div>
                <span className="text-xs text-white/40 uppercase block">Sunrise</span>
                <span className="text-lg font-bold">05:34 AM</span>
              </div>
            </div>
            <span className="text-xs text-white/40">4h ago</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/20 rounded-xl text-orange-500">
                <Sunset size={20} />
              </div>
              <div>
                <span className="text-xs text-white/40 uppercase block">Sunset</span>
                <span className="text-lg font-bold">06:42 PM</span>
              </div>
            </div>
            <span className="text-xs text-white/40">in 9h</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdvancedInsights;
