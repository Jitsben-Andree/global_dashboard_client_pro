import * as countryService from '../services/country.service.js';

export const getCountryDetails = async (req, res) => {
  try {
    const { code } = req.params;

    // CORRECCIÓN AQUÍ:
    // Antes rechazaba si no era == 2. Ahora aceptamos 2 o 3 letras (Ej: PE o PER)
    if (!code || (code.length !== 2 && code.length !== 3)) {
      return res.status(400).json({ 
        message: 'Código de país inválido (Debe ser ISO de 2 o 3 letras, ej: PE o PER)' 
      });
    }

    const data = await countryService.getCountryInfo(code);
    
    res.status(200).json({
      success: true,
      data: data
    });

  } catch (error) {
    console.error("Error en getCountryDetails:", error); // Agregamos log para depurar
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};