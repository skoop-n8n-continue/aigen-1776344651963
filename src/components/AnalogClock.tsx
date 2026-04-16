import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AnalogClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondDegrees = (seconds / 60) * 360;
  const minuteDegrees = ((minutes + seconds / 60) / 60) * 360;
  const hourDegrees = ((hours % 12 + minutes / 60) / 12) * 360;

  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-white/20 glass flex items-center justify-center shadow-inner">
      {/* Clock Face - Marks */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-3 bg-white/40 rounded-full"
          style={{
            transform: `rotate(${i * 30}deg) translateY(-85px)`,
            height: i % 3 === 0 ? '12px' : '6px',
            width: i % 3 === 0 ? '4px' : '2px',
          }}
        />
      ))}

      {/* Center Point */}
      <div className="absolute w-4 h-4 bg-primary rounded-full z-10 shadow-lg" />

      {/* Hands */}
      <motion.div
        className="absolute w-1.5 h-20 bg-white rounded-full origin-bottom"
        animate={{ rotate: hourDegrees }}
        transition={{ type: "spring", stiffness: 50 }}
        style={{ bottom: '50%' }}
      />
      <motion.div
        className="absolute w-1 h-28 bg-white/80 rounded-full origin-bottom"
        animate={{ rotate: minuteDegrees }}
        transition={{ type: "spring", stiffness: 50 }}
        style={{ bottom: '50%' }}
      />
      <motion.div
        className="absolute w-0.5 h-32 bg-primary rounded-full origin-bottom"
        animate={{ rotate: secondDegrees }}
        transition={{ type: "linear", duration: 1 }}
        style={{ bottom: '50%' }}
      />
    </div>
  );
};

export default AnalogClock;
