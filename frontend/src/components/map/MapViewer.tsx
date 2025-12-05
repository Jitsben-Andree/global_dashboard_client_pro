'use client';

import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
//import 'leaflet/dist/leaflet.css';
import CountryLayer from './CountryLayer';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix para los iconos de Leaflet en Next.js
const fixLeafletIcon = () => {
  // @ts-ignore
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
};

export default function MapViewer() {
  useEffect(() => {
    fixLeafletIcon();
  }, []);

  return (
    <div className="h-full w-full relative z-0">
      <MapContainer
        center={[20, 0]} // Centro del mundo aprox
        zoom={2}
        scrollWheelZoom={true}
        className="h-full w-full outline-none"
        minZoom={2}
        maxBounds={[[-90, -180], [90, 180]]} // Evitar scrollear al infinito gris
      >
        {/* Capa base del mapa (Estilo CartoDB Positron - muy limpio) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        
        <ZoomControl position="bottomright" />
        
        {/* Capa interactiva de países */}
        <CountryLayer />
      </MapContainer>
    </div>
  );
}