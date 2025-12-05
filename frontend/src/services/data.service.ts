import api from '../lib/axios';
import { Country, Favorite, NewsItem, Province, WeatherData } from '../types';

export const getCountryDetails = async (code: string) => {
  const response = await api.get<{ success: boolean; data: Country }>(`/countries/${code}`);
  return response.data.data;
};

export const getProvinces = async (countryCode: string) => {
  const response = await api.get<{ success: boolean; data: Province[] }>(`/provinces/${countryCode}`);
  return response.data.data;
};

export const getWeather = async (lat: number, lng: number) => {
  const response = await api.get<{ success: boolean; data: WeatherData }>(`/weather?lat=${lat}&lng=${lng}`);
  return response.data.data;
};

export const getNews = async (query: string) => {
  const response = await api.get<{ success: boolean; data: NewsItem[] }>(`/news?q=${query}`);
  return response.data.data;
};

// Favoritos
export const getFavorites = async () => {
  const response = await api.get<{ success: boolean; data: Favorite[] }>('/favorites');
  return response.data.data;
};

export const addFavorite = async (data: { entityType: 'COUNTRY' | 'PROVINCE'; entityId: string; entityName: string }) => {
  const response = await api.post<{ success: boolean; data: Favorite }>('/favorites', data);
  return response.data.data;
};

export const removeFavorite = async (id: string) => {
  await api.delete(`/favorites/${id}`);
};