import { WeatherData } from '@/types';
import { getWeatherDescription } from '@/lib/utils';
import { CloudSun, Wind, Thermometer } from 'lucide-react';

export default function WeatherCard({ data, title }: { data: WeatherData, title: string }) {
  const current = data.current_weather;
  
  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-lg">
      <h3 className="text-sm font-medium text-blue-100 uppercase tracking-wider mb-4">
        {title}
      </h3>
      
      <div className="flex items-center justify-between">
        <div>
          <div className="text-4xl font-bold flex items-start">
            {current.temperature}
            <span className="text-xl mt-1">°C</span>
          </div>
          <p className="text-blue-100 text-sm mt-1">
            {getWeatherDescription(current.weathercode)}
          </p>
        </div>
        <CloudSun className="h-12 w-12 text-blue-200 opacity-80" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-sm bg-white/10 rounded-lg p-2">
        <div className="flex items-center gap-2">
          <Wind className="h-4 w-4" />
          <span>{current.windspeed} km/h</span>
        </div>
        <div className="flex items-center gap-2">
          <Thermometer className="h-4 w-4" />
          <span>Max: {data.daily.temperature_2m_max[0]}°</span>
        </div>
      </div>
    </div>
  );
}