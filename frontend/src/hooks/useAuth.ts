import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { verifyTokenRequest } from '@/services/auth.service';

export function useAuth() {
  const { setAuth, logout, isAuthenticated, user } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      // Si ya tenemos usuario en estado, solo validamos silenciosamente
      // Si no tenemos, intentamos recuperar la sesión vía cookie
      try {
        const res = await verifyTokenRequest();
        if (res.data.success && res.data.user) {
          setAuth(res.data.user);
        } else {
          // Si el backend dice que el token no vale, cerramos sesión
          logout();
        }
      } catch (error) {
        // Si falla la petición (401), limpiamos estado
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Solo se ejecuta al montar el componente

  return { 
    user, 
    isAuthenticated, 
    loading 
  };
}