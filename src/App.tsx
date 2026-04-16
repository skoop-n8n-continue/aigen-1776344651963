import React, { useState, useEffect } from 'react'
import { WeatherProvider } from './hooks/useWeather'
import WeatherPage from './pages/WeatherPage'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <WeatherProvider>
      <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'dark bg-dark text-white' : 'bg-blue-50 text-gray-900'}`}>
        <WeatherPage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </div>
    </WeatherProvider>
  )
}

export default App
