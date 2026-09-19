import React, { createContext, useCallback, useContext, useState } from 'react';
import styled, { keyframes } from 'styled-components';

interface Aviso {
  id: number;
  texto: string;
}

interface ToastValue {
  mostrar: (texto: string) => void;
}

const Ctx = createContext<ToastValue | null>(null);

const entrar = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Region = styled.div`
  position: fixed;
  left: 50%;
  bottom: 1.25rem;
  transform: translateX(-50%);
  z-index: 300;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: max-content;
  max-width: calc(100vw - 2rem);
  pointer-events: none;
`;

const TextoAviso = styled.p`
  background: var(--tinta);
  color: #fff;
  padding: 0.7rem 1.1rem;
  font-size: 0.95rem;
  border-left: 3px solid var(--oro);
  box-shadow: 0 8px 24px -8px rgba(0, 0, 0, 0.5);
  animation: ${entrar} 0.2s ease-out;
`;

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [avisos, setAvisos] = useState<Aviso[]>([]);

  const mostrar = useCallback((texto: string) => {
    const id = Date.now() + Math.random();
    setAvisos((prev) => [...prev.slice(-2), { id, texto }]);
    window.setTimeout(() => setAvisos((prev) => prev.filter((a) => a.id !== id)), 3400);
  }, []);

  return (
    <Ctx.Provider value={{ mostrar }}>
      {children}
      <Region role="status" aria-live="polite">
        {avisos.map((a) => (
          <TextoAviso key={a.id}>{a.texto}</TextoAviso>
        ))}
      </Region>
    </Ctx.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useToast debe usarse dentro de <ToastProvider>');
  return ctx;
};
