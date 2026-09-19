import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { TiendaProvider } from './context/TiendaContext';
import { ToastProvider } from './context/ToastContext';

/** Todos los contextos de la app en un solo sitio (también útil en los tests). */
const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ToastProvider>
    <AuthProvider>
      <TiendaProvider>{children}</TiendaProvider>
    </AuthProvider>
  </ToastProvider>
);

export default Providers;
