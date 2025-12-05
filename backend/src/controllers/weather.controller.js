import * as weatherService from '../services/weather.service.js';

export const getWeather = async (req, res) => {
  try {
    const { lat, lng } = req.query;
    
    // Log para depuración
    console.log(`📡 Solicitando clima para: Lat ${lat}, Lng ${lng}`);

    if(!lat || !lng) {
      return res.status(400).json({ message: "Faltan coordenadas (lat, lng)" });
    }

    const data = await weatherService.getWeather(lat, lng);
    
    res.json({ success: true, data });
  } catch (error) {
    console.error("❌ Error en weather controller:", error);
    res.status(500).json({ message: error.message });
  }
};