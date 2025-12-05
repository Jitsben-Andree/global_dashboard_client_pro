import { State } from 'country-state-city'; 
import prisma from '../lib/prisma.js';

const iso3ToIso2 = {
  'PER': 'PE', 'ARG': 'AR', 'BRA': 'BR', 'BOL': 'BO',
  'CHL': 'CL', 'COL': 'CO', 'ECU': 'EC', 'PRY': 'PY',
  'URY': 'UY', 'VEN': 'VE', 'MEX': 'MX', 'USA': 'US',
  'ESP': 'ES', 'FRA': 'FR', 'CAN': 'CA'
};

export const getProvincesByCountry = async (countryCode) => {
  const codeIso3 = countryCode.toUpperCase(); 
  
  const codeIso2 = iso3ToIso2[codeIso3] || codeIso3.substring(0, 2); 

  console.log(`📚 Consultando librería local para: ${codeIso3} (${codeIso2})`);

  try {
    // 1. Obtener datos de la librería (Rápido y sin internet)
    const states = State.getStatesOfCountry(codeIso2);

    // Validación si no encuentra nada
    if (!states || states.length === 0) {
      console.warn(`⚠️ No se encontraron estados para ${codeIso2}`);
      return [];
    }

    // 2. Formatear datos para el Frontend
    const formattedData = states.map((state) => ({
      id: state.isoCode || state.name, // Usamos su código ISO como ID único
      name: state.name
    }));

    // 3. Guardar en Caché (Opcional pero recomendado)
    try {
      await prisma.provinceCache.upsert({
        where: { countryCode: codeIso3 },
        update: { data: formattedData, updatedAt: new Date() },
        create: { countryCode: codeIso3, data: formattedData }
      });
    } catch (dbError) {
      console.warn("⚠️ Nota: No se pudo guardar en caché DB (No crítico).");
    }

    return formattedData;

  } catch (error) {
    console.error("❌ Error en servicio de provincias:", error.message);
    // Si falla algo grave, retornamos array vacío para no romper el frontend
    return [];
  }
};