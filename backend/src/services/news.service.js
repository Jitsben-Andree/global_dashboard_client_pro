// --- BASE DE DATOS SIMULADA (MOCK DB) ---
const MOCK_LARGE_DB = [
  // --- PERÚ ---
  {
    article_id: "sim-pe-01",
    title: "El turismo en Cusco rompe récords históricos este trimestre",
    link: "#",
    source_id: "Diario El Sol",
    pubDate: new Date().toISOString(),
    description: "La ciudadela de Machu Picchu recibió un 20% más de visitantes en comparación con el año anterior, impulsando la economía local.",
    country: ["peru", "pe"]
  },
  {
    article_id: "sim-pe-02",
    title: "Gastronomía peruana: El Ceviche es declarado patrimonio mundial",
    link: "#",
    source_id: "Gourmet News",
    pubDate: new Date().toISOString(),
    description: "La UNESCO reconoce el valor cultural del plato bandera, celebrando la tradición pesquera y culinaria del país.",
    country: ["peru", "pe"]
  },
  {
    article_id: "sim-pe-03",
    title: "Nuevas Startups Fintech revolucionan la banca en Lima",
    link: "#",
    source_id: "Tech Lima",
    pubDate: new Date().toISOString(),
    description: "Jóvenes emprendedores lanzan soluciones digitales que facilitan el acceso al crédito para pequeñas empresas.",
    country: ["peru", "pe"]
  },
  
  // --- ARGENTINA ---
  {
    article_id: "sim-ar-01",
    title: "Lionel Messi confirma partido benéfico en Buenos Aires",
    link: "#",
    source_id: "Deportes Total",
    pubDate: new Date().toISOString(),
    description: "El astro argentino volverá a pisar el Monumental para un evento que recaudará fondos para hospitales infantiles.",
    country: ["argentina", "ar"]
  },
  {
    article_id: "sim-ar-02",
    title: "Auge del software: Argentina exporta servicios IT récord",
    link: "#",
    source_id: "Economía Digital",
    pubDate: new Date().toISOString(),
    description: "El sector tecnológico se convierte en el segundo complejo exportador del país, superando a industrias tradicionales.",
    country: ["argentina", "ar"]
  },
  {
    article_id: "sim-ar-03",
    title: "Vaca Muerta alcanza nuevo pico de producción de gas",
    link: "#",
    source_id: "Energía Hoy",
    pubDate: new Date().toISOString(),
    description: "Las inversiones en el sur del país comienzan a dar frutos, prometiendo autoabastecimiento energético.",
    country: ["argentina", "ar"]
  },

  // --- MÉXICO ---
  {
    article_id: "sim-mx-01",
    title: "Riviera Maya espera ocupación hotelera del 95% en verano",
    link: "#",
    source_id: "Turismo MX",
    pubDate: new Date().toISOString(),
    description: "Cancún y Tulum se preparan para recibir una ola masiva de turistas internacionales con nuevas infraestructuras.",
    country: ["mexico", "mx"]
  },
  {
    article_id: "sim-mx-02",
    title: "Industria automotriz en México lidera producción en Latam",
    link: "#",
    source_id: "AutoMundo",
    pubDate: new Date().toISOString(),
    description: "Grandes marcas anuncian la expansión de sus plantas en el norte del país para fabricar vehículos eléctricos.",
    country: ["mexico", "mx"]
  },

  // --- COLOMBIA ---
  {
    article_id: "sim-co-01",
    title: "Café colombiano gana premio a la mejor taza del año",
    link: "#",
    source_id: "Agro Cafetero",
    pubDate: new Date().toISOString(),
    description: "Un pequeño productor del Eje Cafetero sorprende al mundo con una variedad exótica de alta puntuación.",
    country: ["colombia", "co"]
  },
  {
    article_id: "sim-co-02",
    title: "Medellín se consolida como el hub de innovación de la región",
    link: "#",
    source_id: "Innova Latam",
    pubDate: new Date().toISOString(),
    description: "La ciudad atrae a nómadas digitales y empresas tecnológicas gracias a su clima y políticas de incentivos.",
    country: ["colombia", "co"]
  },

  // --- BRASIL ---
  {
    article_id: "sim-br-01",
    title: "El Amazonas recibe nuevo proyecto de conservación internacional",
    link: "#",
    source_id: "Eco Planet",
    pubDate: new Date().toISOString(),
    description: "Fondo global destina millones para proteger la biodiversidad y apoyar a las comunidades indígenas.",
    country: ["brasil", "br", "brazil"]
  },
  {
    article_id: "sim-br-02",
    title: "Carnaval de Río promete ser el más grande de la década",
    link: "#",
    source_id: "Fiesta y Cultura",
    pubDate: new Date().toISOString(),
    description: "Escuelas de samba preparan espectáculos nunca antes vistos para el regreso triunfal al Sambódromo.",
    country: ["brasil", "br", "brazil"]
  },

  // --- TECNOLOGÍA GENERAL ---
  {
    article_id: "sim-tech-01",
    title: "Inteligencia Artificial: ¿Aliada o enemiga del empleo?",
    link: "#",
    source_id: "Futuro Tech",
    pubDate: new Date().toISOString(),
    description: "Expertos debaten sobre el impacto de la automatización en el mercado laboral latinoamericano.",
    country: ["tech", "general"]
  },
  {
    article_id: "sim-tech-02",
    title: "Lanzamiento del nuevo satélite de comunicaciones regional",
    link: "#",
    source_id: "Espacio Latino",
    pubDate: new Date().toISOString(),
    description: "Mejorará la conectividad en zonas rurales y escuelas alejadas de las grandes urbes.",
    country: ["tech", "general"]
  }
];

export const getNews = async (query) => {
  // 1. Simular latencia de red (loading state) para realismo
  await new Promise(resolve => setTimeout(resolve, 300));

  console.log(`[SIMULACIÓN] Buscando en BD local para: "${query}"`);

  // 2. Si no hay query, devolvemos todo
  if (!query) return MOCK_LARGE_DB;

  const termino = query.toLowerCase();
  
  // 3. Algoritmo de Búsqueda Local
  const resultados = MOCK_LARGE_DB.filter(noticia => {
    const enTitulo = noticia.title.toLowerCase().includes(termino);
    const enDesc = noticia.description.toLowerCase().includes(termino);
    const enTags = noticia.country && noticia.country.some(tag => tag.includes(termino));
    
    return enTitulo || enDesc || enTags;
  });

  if (resultados.length > 0) {
    return resultados;
  }

  // 4. Fallback: Devolver sugerencias si no hay coincidencias exactas
  console.log("⚠️ No se encontraron coincidencias exactas. Mostrando sugerencias.");
  return MOCK_LARGE_DB.slice(0, 5);
};