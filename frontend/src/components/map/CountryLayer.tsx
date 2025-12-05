'use client';

import { GeoJSON } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { useMapStore } from '@/store/useMapStore';
import { getCountryDetails } from '@/services/data.service';
import Loader from '../ui/Loader';
import L from 'leaflet';

export default function CountryLayer() {
  const [geoData, setGeoData] = useState<any>(null);
  const selectCountry = useMapStore(state => state.selectCountry);
  const setCountryData = useMapStore(state => state.setCountryData);
  const selectedCode = useMapStore(state => state.selectedCountryCode);

  // Cargamos el GeoJSON estático del mundo
  useEffect(() => {
    fetch('/geojson/world.json')
      .then(res => res.json())
      .then(data => setGeoData(data))
      .catch(err => console.error("Error cargando mapa:", err));
  }, []);

  const handleCountryClick = async (feature: any) => {
    const countryCode = feature.id || feature.properties.ISO_A2; // Depende de tu GeoJSON
    if (!countryCode) return;

    // 1. Actualizamos estado global para abrir sidebar
    selectCountry(countryCode);

    // 2. Pedimos datos detallados al Backend
    try {
      const data = await getCountryDetails(countryCode);
      setCountryData(data);
    } catch (error) {
      console.error("Error obteniendo detalles:", error);
    }
  };

  const onEachFeature = (feature: any, layer: L.Layer) => {
    // Estilos al pasar el mouse
    layer.on({
      mouseover: (e) => {
        const target = e.target;
        target.setStyle({
          fillOpacity: 0.7,
          weight: 2,
          color: '#666',
        });
      },
      mouseout: (e) => {
        const target = e.target;
        // Reseteamos estilo si no es el seleccionado
        // (Nota: aquí podríamos mejorar lógica para dejar pintado el seleccionado)
        target.setStyle({
          fillOpacity: 0,
          weight: 1,
          color: 'transparent', // Bordes invisibles por defecto para ver el TileLayer
        });
      },
      click: () => handleCountryClick(feature),
    });
  };

  if (!geoData) return null;

  return (
    <GeoJSON 
      data={geoData} 
      style={() => ({
        color: 'transparent', // Bordes iniciales invisibles
        weight: 1,
        fillColor: '#3b82f6', // Color azul al hacer hover
        fillOpacity: 0,
      })}
      onEachFeature={onEachFeature} 
    />
  );
}