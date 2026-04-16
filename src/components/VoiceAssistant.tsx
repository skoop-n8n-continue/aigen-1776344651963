import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VoiceAssistant: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const toggleListening = () => {
    if (!isListening) {
      setIsListening(true);
      setMessage("Listening for commands...");

      // Simulate voice recognition
      setTimeout(() => {
        setMessage("Command recognized: 'Current weather in Lahore'");
        setTimeout(() => {
          setIsListening(false);
          setMessage("The current temperature in Lahore is 34°C with partly cloudy skies.");
          setTimeout(() => setMessage(null), 3000);
        }, 1500);
      }, 2000);
    } else {
      setIsListening(false);
      setMessage(null);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            className="absolute bottom-16 right-0 w-64 glass-dark p-4 rounded-2xl shadow-2xl border border-primary/30"
          >
            <p className="text-sm text-white/90 leading-snug">{message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggleListening}
        className={`p-4 rounded-full shadow-2xl transition-all duration-300 ${
          isListening ? 'bg-primary scale-110' : 'bg-white/10 hover:bg-white/20'
        }`}
      >
        {isListening ? (
          <div className="relative">
            <Mic size={24} className="text-white" />
            <div className="absolute inset-0 animate-ping bg-white/40 rounded-full"></div>
          </div>
        ) : (
          <MicOff size={24} className="text-white/60" />
        )}
      </button>
    </div>
  );
};

export default VoiceAssistant;
