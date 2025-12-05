import { create } from 'zustand';
import { Country } from '@/types';

interface MapState {
  selectedCountryCode: string | null;
  selectedCountryData: Country | null; // Datos cargados del país
  isSidebarOpen: boolean;
  
  // Acciones
  selectCountry: (code: string) => void;
  setCountryData: (data: Country) => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
}

export const useMapStore = create<MapState>((set) => ({
  selectedCountryCode: null,
  selectedCountryData: null,
  isSidebarOpen: false,

  selectCountry: (code) => set({ 
    selectedCountryCode: code, 
    isSidebarOpen: true, // Abrir sidebar automáticamente al seleccionar
    selectedCountryData: null // Limpiar datos anteriores mientras cargan los nuevos
  }),

  setCountryData: (data) => set({ selectedCountryData: data }),

  closeSidebar: () => set({ isSidebarOpen: false, selectedCountryCode: null }),
  
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));