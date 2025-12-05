import { Country } from '@/types';
import { formatNumber } from '@/lib/utils';
import Image from 'next/image';
import { MapPin, Users, Globe, Wallet } from 'lucide-react';
import WeatherCard from '../weather/WeatherCard';
import { useEffect, useState } from 'react';
import { getWeather } from '@/services/data.service';

export default function CountryInfo({ country }: { country: Country }) {
  const [weather, setWeather] = useState<any>(null);

  // Cargar clima de la capital al montar este componente
  useEffect(() => {
    if (country.latlng) {
      getWeather(country.latlng[0], country.latlng[1])
        .then(setWeather)
        .catch(console.error);
    }
  }, [country]);

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-500">
      {/* Cabecera con Bandera */}
      <div className="relative h-40 w-full rounded-xl overflow-hidden shadow-sm">
        <Image 
          src={country.flags.svg} 
          alt={`Bandera de ${country.name.common}`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
          <h2 className="text-2xl font-bold text-white">{country.name.common}</h2>
        </div>
      </div>

      {/* Widget Clima */}
      {weather && <WeatherCard data={weather} title={`Clima en ${country.capital?.[0] || 'Capital'}`} />}

      {/* Datos Generales */}
      <div className="grid grid-cols-2 gap-4">
        <InfoItem icon={<Users />} label="Población" value={formatNumber(country.population)} />
        <InfoItem icon={<MapPin />} label="Capital" value={country.capital?.[0] || 'N/A'} />
        <InfoItem icon={<Globe />} label="Región" value={country.region} />
        <InfoItem 
          icon={<Wallet />} 
          label="Moneda" 
          value={Object.values(country.currencies || {})[0]?.name || 'N/A'} 
        />
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
      <div className="flex items-center gap-2 text-gray-500 mb-1">
        <div className="h-4 w-4">{icon}</div>
        <span className="text-xs font-medium uppercase">{label}</span>
      </div>
      <p className="font-semibold text-gray-800 truncate" title={value}>{value}</p>
    </div>
  );
}