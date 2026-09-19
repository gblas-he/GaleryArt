import { useEffect, useState } from 'react';

/**
 * Como useState, pero guarda el valor en localStorage y lo sincroniza entre pestañas.
 * Si localStorage falla (modo privado, cuota...), sigue funcionando en memoria.
 */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw !== null ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* sin almacenamiento: seguimos en memoria */
    }
  }, [key, value]);

  useEffect(() => {
    const alCambiar = (e: StorageEvent) => {
      if (e.key !== key || e.newValue === null) return;
      try {
        setValue(JSON.parse(e.newValue) as T);
      } catch {
        /* ignorar */
      }
    };
    window.addEventListener('storage', alCambiar);
    return () => window.removeEventListener('storage', alCambiar);
  }, [key]);

  return [value, setValue] as const;
}
