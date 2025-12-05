import apiAdapter from '../utils/apiAdapter.js';

// Open-Meteo es GRATIS y no requiere Key
export const getWeather = async (lat, lng) => {
  try {

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

    const response = await apiAdapter.get(url);

    return response.data;

  } catch (error) {
    console.error("Error en servicio weather:", error.message);
    throw new Error('Error obteniendo clima');
  }
};