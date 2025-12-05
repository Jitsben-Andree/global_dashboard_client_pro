import { State } from 'country-state-city'; // 1. Importamos la librería
import prisma from '../lib/prisma.js';

// Mapeo de respaldo para códigos ISO-3 a ISO-2
// (La librería usa códigos de 2 letras como PE, AR, US)
const iso3ToIso2 = {
  'PER': 'PE', 'ARG': 'AR', 'BRA': 'BR', 'BOL': 'BO',
  'CHL': 'CL', 'COL': 'CO', 'ECU': 'EC', 'PRY': 'PY',
  'URY': 'UY', 'VEN': 'VE', 'MEX': 'MX', 'USA': 'US',
  'ESP': 'ES', 'FRA': 'FR', 'CAN': 'CA'
};

export const getProvincesByCountry = async (countryCode) => {
  const codeIso3 = countryCode.toUpperCase(); // Ej: PER
  
  
  const codeIso2 = iso3ToIso2[codeIso3] || codeIso3.substring(0, 2); 

  console.log(`📚 Consultando librería local para: ${codeIso3} (${codeIso2})`);

  try {
    
    const states = State.getStatesOfCountry(codeIso2);

    // Si la librería no encuentra nada (ej: código inválido), devolvemos array vacío
    if (!states || states.length === 0) {
      console.warn(`⚠️ No se encontraron estados para ${codeIso2}`);
      return [];
    }

    
    const formattedData = states.map((state) => ({
      id: state.isoCode || state.name, // Usamos su código ISO como ID único
      name: state.name
    }));

    
    try {
      await prisma.provinceCache.upsert({
        where: { countryCode: codeIso3 },
        update: { data: formattedData, updatedAt: new Date() },
        create: { countryCode: codeIso3, data: formattedData }
      });
    } catch (dbError) {
      // Si falla la DB (ej: falta migración), no importa, devolvemos los datos igual.
      console.warn("⚠️ Nota: No se pudo guardar en caché DB (No crítico).");
    }

    return formattedData;

  } catch (error) {
    console.error("❌ Error en servicio de provincias:", error.message);
    throw new Error("Error interno obteniendo provincias");
  }
};