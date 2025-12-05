'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { registerRequest } from '@/services/auth.service';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function RegisterPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const res = await registerRequest({ name, email, password });
      setAuth(res.data.user);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input 
          name="name" 
          type="text" 
          label="Nombre Completo" 
          placeholder="Juan Pérez"
          required 
        />

        <Input 
          name="email" 
          type="email" 
          label="Correo Electrónico" 
          placeholder="tu@email.com"
          required 
        />
        
        <Input 
          name="password" 
          type="password" 
          label="Contraseña" 
          placeholder="•••••• (Mín. 6 caracteres)"
          minLength={6}
          required 
        />

        {error && (
          <div className="text-red-500 text-sm text-center font-medium">
            {error}
          </div>
        )}

        <Button type="submit" className="w-full" isLoading={loading}>
          Crear Cuenta
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Inicia Sesión
          </Link>
        </p>
      </div>
    </div>
  );
}