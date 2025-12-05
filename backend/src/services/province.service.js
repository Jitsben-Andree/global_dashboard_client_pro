import { State } from 'country-state-city'; // Librería Real
import prisma from '../lib/prisma.js';

// --- BASE DE DATOS DE RESPALDO (MOCK) ---
// Se usa si la librería falla o no encuentra datos
const MOCK_PROVINCES = {
  'PE': [
    { id: 'PE-LIM', name: "Lima (Respaldo)" }, { id: 'PE-CUS', name: "Cusco (Respaldo)" },
    { id: 'PE-ARE', name: "Arequipa (Respaldo)" }, { id: 'PE-PUN', name: "Puno (Respaldo)" },
    { id: 'PE-JUN', name: "Junín" }, { id: 'PE-LAL', name: "La Libertad" }
  ],
  'AR': [
    { id: 'AR-B', name: "Buenos Aires (Respaldo)" }, { id: 'AR-C', name: "CABA" },
    { id: 'AR-X', name: "Córdoba" }, { id: 'AR-S', name: "Santa Fe" }
  ],
  'BR': [
    { id: 'BR-SP', name: "São Paulo" }, { id: 'BR-RJ', name: "Rio de Janeiro" }
  ],
  'CO': [
    { id: 'CO-DC', name: "Bogotá D.C." }, { id: 'CO-ANT', name: "Antioquia" }
  ],
  'DEFAULT': [
    { id: 'DEF-1', name: "Región Norte (Demo)" },
    { id: 'DEF-2', name: "Región Sur (Demo)" }
  ]
};

const iso3ToIso2 = {
  'PER': 'PE', 'ARG': 'AR', 'BRA': 'BR', 'BOL': 'BO',
  'CHL': 'CL', 'COL': 'CO', 'ECU': 'EC', 'PRY': 'PY',
  'URY': 'UY', 'VEN': 'VE', 'MEX': 'MX', 'USA': 'US',
  'ESP': 'ES', 'FRA': 'FR', 'CAN': 'CA'
};

export const getProvincesByCountry = async (countryCode) => {
  const codeIso3 = countryCode.toUpperCase(); // Ej: PER
  
  // Convertimos PER -> PE para la librería
  const codeIso2 = iso3ToIso2[codeIso3] || codeIso3.substring(0, 2); 

  console.log(`📚 [PROVINCE SERVICE] Buscando para: ${codeIso3} (${codeIso2})`);

  //  INTENTAR CON LIBRERÍA REAL (country-state-city)
  try {
    console.log("⚡ Intentando obtener datos de librería 'country-state-city'...");
    
    const states = State.getStatesOfCountry(codeIso2);

    if (states && states.length > 0) {
      console.log(` Éxito: ${states.length} provincias encontradas en librería.`);
      
      const formattedData = states.map((state) => ({
        id: state.isoCode || state.name, 
        name: state.name
      }));

      try {
        await prisma.provinceCache.upsert({
          where: { countryCode: codeIso3 },
          update: { data: formattedData, updatedAt: new Date() },
          create: { countryCode: codeIso3, data: formattedData }
        });
      } catch (e) { /* Ignorar error de caché */ }

      return formattedData;
    } else {
      console.warn(` Librería retornó 0 resultados para ${codeIso2}. Pasando a Respaldo.`);
    }

  } catch (error) {
    console.error(` Fallo en librería local: ${error.message}`);
  }

  console.log(" Usando Base de Datos Simulada (Respaldo).");
  
  // Pequeña espera para simular carga
  await new Promise(resolve => setTimeout(resolve, 200));

  return MOCK_PROVINCES[codeIso2] || MOCK_PROVINCES['DEFAULT'];
};