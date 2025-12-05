import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Función estándar para combinar clases de Tailwind condicionalmente
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formatear números (ej: población)
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('es-ES').format(num);
}

// Convertir código de clima WMO a texto/icono (para Open-Meteo)
export function getWeatherDescription(code: number): string {
  const codes: Record<number, string> = {
    0: 'Cielo despejado',
    1: 'Mayormente despejado',
    2: 'Parcialmente nublado',
    3: 'Nublado',
    45: 'Niebla',
    48: 'Niebla con escarcha',
    51: 'Llovizna ligera',
    53: 'Llovizna moderada',
    55: 'Llovizna densa',
    61: 'Lluvia ligera',
    63: 'Lluvia moderada',
    65: 'Lluvia fuerte',
    80: 'Chubascos leves',
    81: 'Chubascos moderados',
    82: 'Chubascos violentos',
    95: 'Tormenta eléctrica',
  };
  return codes[code] || 'Clima desconocido';
}