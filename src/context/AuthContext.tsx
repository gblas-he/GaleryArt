import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Usuario } from '../types';

/**
 * AUTENTICACIÓN SIMULADA (solo front-end).
 * Los usuarios se guardan en el localStorage del navegador, así que sirve para
 * desarrollar y enseñar la app, pero NO es seguro para producción.
 * Cuando tenga un back-end, sustituya registrar/iniciarSesion por llamadas a su API.
 */
interface UsuarioGuardado extends Usuario {
  hash: string;
}

interface AuthValue {
  usuario: Usuario | null;
  /** Devuelven un mensaje de error, o null si todo salió bien. */
  registrar: (nombre: string, email: string, password: string) => Promise<string | null>;
  iniciarSesion: (email: string, password: string) => Promise<string | null>;
  cerrarSesion: () => void;
}

const Ctx = createContext<AuthValue | null>(null);

async function hashear(texto: string): Promise<string> {
  if (window.crypto?.subtle && typeof TextEncoder !== 'undefined') {
    const buf = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(texto));
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }
  // Alternativa muy simple para entornos sin Web Crypto (no es criptográfica).
  let h = 5381;
  for (let i = 0; i < texto.length; i++) h = (h * 33) ^ texto.charCodeAt(i);
  return String(h >>> 0);
}

const emailValido = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuarios, setUsuarios] = useLocalStorage<UsuarioGuardado[]>('galeryart:usuarios', []);
  const [sesionId, setSesionId] = useLocalStorage<string | null>('galeryart:sesion', null);

  const usuario = useMemo<Usuario | null>(() => {
    const u = usuarios.find((x) => x.id === sesionId);
    return u ? { id: u.id, nombre: u.nombre, email: u.email, creadoEn: u.creadoEn } : null;
  }, [usuarios, sesionId]);

  const registrar = useCallback(
    async (nombre: string, emailBruto: string, password: string) => {
      const email = emailBruto.trim().toLowerCase();
      if (nombre.trim().length < 2) return 'Escriba su nombre.';
      if (!emailValido(email)) return 'Escriba un correo electrónico válido.';
      if (password.length < 8) return 'La contraseña debe tener al menos 8 caracteres.';
      if (usuarios.some((u) => u.email === email)) return 'Ya existe una cuenta con este correo.';
      const nuevo: UsuarioGuardado = {
        id: `u-${Date.now().toString(36)}`,
        nombre: nombre.trim(),
        email,
        creadoEn: new Date().toISOString(),
        hash: await hashear(`${email}:${password}`),
      };
      setUsuarios((prev) => [...prev, nuevo]);
      setSesionId(nuevo.id);
      return null;
    },
    [usuarios, setUsuarios, setSesionId]
  );

  const iniciarSesion = useCallback(
    async (emailBruto: string, password: string) => {
      const email = emailBruto.trim().toLowerCase();
      const hash = await hashear(`${email}:${password}`);
      const u = usuarios.find((x) => x.email === email && x.hash === hash);
      if (!u) return 'El correo o la contraseña no son correctos.';
      setSesionId(u.id);
      return null;
    },
    [usuarios, setSesionId]
  );

  const cerrarSesion = useCallback(() => setSesionId(null), [setSesionId]);

  return (
    <Ctx.Provider value={{ usuario, registrar, iniciarSesion, cerrarSesion }}>{children}</Ctx.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
};
