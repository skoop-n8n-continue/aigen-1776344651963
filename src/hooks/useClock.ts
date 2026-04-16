import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export const useClock = (timezone: string = 'Asia/Karachi') => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const zonedTime = toZonedTime(time, timezone);

  return {
    time: zonedTime,
    formattedTime: (is24h: boolean) => format(zonedTime, is24h ? 'HH:mm:ss' : 'hh:mm:ss a'),
    formattedDate: format(zonedTime, 'EEEE, MMMM do yyyy'),
  };
};
