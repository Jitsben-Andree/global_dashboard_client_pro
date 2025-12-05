export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface AuthResponse {
  success: boolean;
  user: User;
  token?: string; // Aunque usamos cookies HttpOnly, a veces el back lo devuelve
}

export interface Country {
  name: {
    common: string;
    official: string;
  };
  cca2: string; // Código de 2 letras (ej: AR)
  region: string;
  subregion?: string;
  capital?: string[];
  population: number;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  currencies?: Record<string, { name: string; symbol: string }>;
  languages?: Record<string, string>;
  latlng: [number, number];
}

export interface Province {
  id: string;
  name: string;
  countryCode: string;
  population?: number;
}

export interface WeatherData {
  current_weather: {
    temperature: number;
    windspeed: number;
    weathercode: number;
    time: string;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

export interface NewsItem {
  article_id: string;
  title: string;
  link: string;
  description?: string;
  source_id: string;
  pubDate: string;
  image_url?: string;
}

export interface Favorite {
  id: string;
  entityType: 'COUNTRY' | 'PROVINCE';
  entityId: string;
  entityName: string;
  savedAt: string;
}