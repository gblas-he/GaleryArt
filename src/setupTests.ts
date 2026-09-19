// jest-dom añade comprobaciones como `toBeInTheDocument()` a los tests
import '@testing-library/jest-dom';
import { TextEncoder } from 'util';
import { webcrypto } from 'crypto';

// jsdom no trae estas APIs: las simulamos para poder probar registro e inicio de sesión
Object.assign(globalThis, { TextEncoder });
Object.defineProperty(window, 'crypto', { value: webcrypto, configurable: true });
window.scrollTo = jest.fn();
