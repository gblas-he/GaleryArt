import { useEffect } from 'react';

export function useTitulo(titulo?: string) {
  useEffect(() => {
    document.title = titulo ? `${titulo} · GALERYART` : 'GALERYART · Galería de arte online';
  }, [titulo]);
}
