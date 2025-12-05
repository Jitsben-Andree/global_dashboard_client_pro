'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { loginRequest } from '@/services/auth.service';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const res = await loginRequest({ email, password });
      setAuth(res.data.user); // Guardamos usuario en Zustand
      router.push('/'); // Redirigir al dashboard
    } catch (err: any) {
      // Manejo de error seguro
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input 
          id="email" 
          name="email" 
          type="email" 
          label="Correo Electrónico" 
          placeholder="tu@email.com"
          required 
        />
        
        <Input 
          id="password" 
          name="password" 
          type="password" 
          label="Contraseña" 
          placeholder="••••••"
          required 
        />

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <Button type="submit" className="w-full" isLoading={loading}>
          Iniciar Sesión
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              ¿No tienes cuenta?
            </span>
          </div>
        </div>

        <div className="mt-6">
          <Link href="/register">
            <Button variant="secondary" className="w-full">
              Registrarse
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}