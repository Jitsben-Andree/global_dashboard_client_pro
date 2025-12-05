import * as newsService from '../services/news.service.js';

export const getNews = async (req, res) => {
  try {
    const { q } = req.query; 

    // --- DIAGNÓSTICO DE API KEY ---
    // Esto te dirá en la consola si Node.js realmente ve la clave o no
    const apiKey = process.env.NEWSDATA_API_KEY;
    console.log(`📨 Petición: "${q}"`);
    console.log(`🔑 Estado API Key: ${apiKey ? `Cargada (${apiKey.length} caracteres)` : '❌ NO DETECTADA (Undefined)'}`);

    if(!q) {
      return res.status(400).json({ message: "Falta término de búsqueda (param q)" });
    }

    const data = await newsService.getNews(q);
    
    res.json({ 
      success: true, 
      data: data 
    });

  } catch (error) {
    console.error("Error en NewsController:", error);
    res.status(500).json({ message: error.message });
  }
};