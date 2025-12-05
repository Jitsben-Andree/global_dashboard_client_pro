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
  
  // Convertimos PER -> PE para la librería
  const codeIso2 = iso3ToIso2[codeIso3] || codeIso3.substring(0, 2); 

  console.log(`📚 [PROVINCE SERVICE] Buscando datos reales para: ${codeIso3} (${codeIso2})`);

  try {
    //  Intentar obtener datos de librería 'country-state-city'
    const states = State.getStatesOfCountry(codeIso2);

    //  Si encontramos datos reales, los procesamos
    if (states && states.length > 0) {
      console.log(` Éxito: ${states.length} provincias encontradas en librería.`);
      
      const formattedData = states.map((state) => ({
        id: state.isoCode || state.name, 
        name: state.name
      }));

      // Guardar en Caché DB (Opcional, para futuras consultas o analíticas)
      try {
        await prisma.provinceCache.upsert({
          where: { countryCode: codeIso3 },
          update: { data: formattedData, updatedAt: new Date() },
          create: { countryCode: codeIso3, data: formattedData }
        });
      } catch (e) { 
        console.warn(`⚠️ No se pudo guardar en caché: ${e.message}`); 
      }

      return formattedData;
    } 
    
    // Si la librería retorna 0 resultados
    console.warn(`⚠️ La librería no tiene datos para el código: ${codeIso2}`);
    return [];

  } catch (error) {
    console.error(`Error crítico en servicio de provincias: ${error.message}`);
    return [];
  }
};