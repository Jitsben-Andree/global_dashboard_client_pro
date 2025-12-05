'use client';

// 1. IMPORTANTE: Forzamos renderizado dinámico para evitar errores de compilación
export const dynamic = 'force-dynamic';

import dynamicLoader from 'next/dynamic'; 
import Sidebar from '@/components/sidebar/Sidebar';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Button from '@/components/ui/Button';

// Importación Dinámica del Mapa (Vital para evitar errores de SSR 'window is undefined')
const MapViewer = dynamicLoader(() => import('@/components/map/MapViewer'), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100 text-gray-500">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p>Cargando Mapa Global...</p>
      </div>
    </div>
  ),
});

export default function DashboardPage() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const router = useRouter();

  // Protección de ruta simple
  useEffect(() => {
    // Si no hay usuario en el estado, redirigir al login
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Si no está autenticado, no mostramos nada (el useEffect redirigirá)
  if (!isAuthenticated) return null; 

  return (
    <main className="h-screen w-screen relative overflow-hidden flex flex-col bg-slate-100">
      
      {/* Navbar Flotante (Superior Izquierda) */}
      <div className="absolute top-4 left-4 z-[500] flex items-center gap-4">
        <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/20 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm font-semibold text-gray-700">
            Hola, {user?.name || 'Explorador'} 
          </span>
        </div>
      </div>

      {/* Botón Logout (Superior Derecha) */}
      <div className="absolute top-4 right-4 z-[500]">
        <Button 
          variant="secondary" 
          onClick={() => { logout(); router.push('/login'); }}
          className="shadow-lg backdrop-blur-md bg-white/90 text-xs py-1 px-3"
        >
          Cerrar Sesión
        </Button>
      </div>

      {/* Contenedor del Mapa (Ocupa todo el espacio restante) */}
      <div className="flex-1 relative z-0 h-full w-full">
        <MapViewer />
      </div>

      {/* Panel Lateral (Sidebar) - Controlado por el estado global */}
      <Sidebar />
      
    </main>
  );
}