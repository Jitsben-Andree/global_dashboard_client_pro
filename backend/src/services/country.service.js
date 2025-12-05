import prisma from '../lib/prisma.js';
import apiAdapter from '../utils/apiAdapter.js';

// Servicio que maneja la lógica inteligente de Caché vs API
export const getCountryInfo = async (countryCode) => {
  const code = countryCode.toUpperCase();

  // 1. Intentar buscar en Base de Datos (Caché Local)
  const cachedCountry = await prisma.countryCache.findUnique({
    where: { code: code },
  });

  // Verificamos si existe y si no ha "caducado" (ej: 30 días)
  const isCacheValid = cachedCountry && new Date() < cachedCountry.expiresAt;

  if (isCacheValid) {
    console.log(`[CACHE HIT] Sirviendo ${code} desde Base de Datos.`);
    return cachedCountry.data;
  }

  // 2. Si no está en caché o caducó, llamamos a la API Externa (REST Countries)
  console.log(`[API CALL] Buscando ${code} en REST Countries API...`);
  
  try {
    // Usamos el endpoint "alpha" para buscar por código de 2 letras
    const response = await apiAdapter.get(`https://restcountries.com/v3.1/alpha/${code}`);
    const countryData = response.data[0]; // La API devuelve un array

    // 3. Guardamos la respuesta en nuestra Base de Datos (Upsert: Crear o Actualizar)
    // Calculamos fecha de expiración (ej: hoy + 30 días)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    await prisma.countryCache.upsert({
      where: { code: code },
      update: {
        name: countryData.name.common,
        data: countryData,
        expiresAt: expiresAt,
      },
      create: {
        code: code,
        name: countryData.name.common,
        data: countryData,
        expiresAt: expiresAt,
      },
    });

    return countryData;

  } catch (error) {
    console.error('Error fetching country data:', error.message);
    throw new Error('No se pudo obtener la información del país.');
  }
};

export const getAllCountriesCache = async () => {
  // Retorna lista básica de países cacheados (útil para sitemap o listados rápidos)
  return await prisma.countryCache.findMany({
    select: { code: true, name: true }
  });
};