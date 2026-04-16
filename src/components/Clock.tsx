import React, { useState } from 'react';
import { useClock } from '../hooks/useClock';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock as ClockIcon, Calendar, Hash } from 'lucide-react';
import AnalogClock from './AnalogClock';

const Clock: React.FC = () => {
  const { formattedTime, formattedDate } = useClock();
  const [is24h, setIs24h] = useState(false);
  const [isAnalog, setIsAnalog] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-6 text-center w-full"
    >
      <div className="relative mb-4 group">
        <button
          onClick={() => setIsAnalog(!isAnalog)}
          className="absolute -right-12 top-0 p-2 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          title="Toggle Analog/Digital"
        >
          {isAnalog ? <Hash size={16} /> : <ClockIcon size={16} />}
        </button>

        <AnimatePresence mode="wait">
          {isAnalog ? (
            <motion.div
              key="analog"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="py-8"
            >
              <AnalogClock />
            </motion.div>
          ) : (
            <motion.div
              key="digital"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="cursor-pointer"
              onClick={() => setIs24h(!is24h)}
            >
              <h1 className="text-fluid-huge font-bold tracking-tighter drop-shadow-lg transition-transform hover:scale-105">
                {formattedTime(is24h)}
              </h1>
              <div className="flex items-center justify-center gap-2 text-primary opacity-80">
                <ClockIcon size={16} />
                <span className="text-sm font-medium uppercase tracking-widest">
                  {is24h ? '24h' : '12h'} (PKT)
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-2 text-fluid-lg opacity-90 font-light mt-4">
        <Calendar size={20} className="text-primary" />
        <span>{formattedDate}</span>
      </div>
    </motion.div>
  );
};

export default Clock;
