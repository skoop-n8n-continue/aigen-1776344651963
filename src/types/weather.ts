export interface WeatherData {
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_kph: number;
    humidity: number;
    feelslike_c: number;
    uv: number;
    air_quality: {
      "us-epa-index": number;
      pm2_5: number;
      pm10: number;
    };
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        daily_chance_of_rain: number;
        condition: {
          text: string;
          icon: string;
        };
      };
      hour: Array<{
        time: string;
        temp_c: number;
        condition: {
          text: string;
          icon: string;
        };
      }>;
    }>;
  };
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
}

export interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
  unit: 'C' | 'F';
}
