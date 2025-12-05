import * as provinceService from '../services/province.service.js';

export const getProvinces = async (req, res) => {
  try {
    const { countryCode } = req.params;
        if (!countryCode) {
      return res.status(400).json({ message: 'El código de país es requerido' });
    }
    const data = await provinceService.getProvincesByCountry(countryCode);
    
    res.json({ success: true, data });
  } catch (error) {
    console.error("Error en Province Controller:", error);
    res.status(500).json({ message: error.message });
  }
};