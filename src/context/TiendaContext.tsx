import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { artistaPorId } from '../data/artistas';
import { obraPorId } from '../data/obras';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DatosEnvio, Obra, Pedido } from '../types';
import { useToast } from './ToastContext';

/**
 * Estado de la tienda: carrito, favoritos, obras vendidas y pedidos.
 * Todo se guarda en localStorage. Cada obra es un original único, así que
 * el carrito no tiene cantidades: una obra está o no está.
 */
interface TiendaValue {
  obrasCarrito: Obra[];
  totalCarrito: number;
  favoritos: string[];
  pedidos: Pedido[];
  enCarrito: (id: string) => boolean;
  esFavorita: (id: string) => boolean;
  estaVendida: (obra: Obra) => boolean;
  agregarAlCarrito: (id: string) => void;
  quitarDelCarrito: (id: string) => void;
  alternarFavorito: (id: string) => void;
  confirmarPedido: (envio: DatosEnvio, usuarioId?: string) => Pedido;
  drawerAbierto: boolean;
  abrirDrawer: () => void;
  cerrarDrawer: () => void;
}

const Ctx = createContext<TiendaValue | null>(null);

export const TiendaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { mostrar } = useToast();
  const [carritoIds, setCarrito] = useLocalStorage<string[]>('galeryart:carrito', []);
  const [favoritos, setFavoritos] = useLocalStorage<string[]>('galeryart:favoritos', []);
  const [vendidas, setVendidas] = useLocalStorage<string[]>('galeryart:vendidas', []);
  const [pedidos, setPedidos] = useLocalStorage<Pedido[]>('galeryart:pedidos', []);
  const [drawerAbierto, setDrawer] = useState(false);

  const estaVendida = useCallback((o: Obra) => !!o.vendida || vendidas.includes(o.id), [vendidas]);

  const obrasCarrito = useMemo(
    () =>
      carritoIds
        .map(obraPorId)
        .filter((o): o is Obra => !!o && !estaVendida(o)),
    [carritoIds, estaVendida]
  );

  const totalCarrito = useMemo(() => obrasCarrito.reduce((s, o) => s + o.precio, 0), [obrasCarrito]);

  const enCarrito = useCallback((id: string) => obrasCarrito.some((o) => o.id === id), [obrasCarrito]);
  const esFavorita = useCallback((id: string) => favoritos.includes(id), [favoritos]);

  const abrirDrawer = useCallback(() => setDrawer(true), []);
  const cerrarDrawer = useCallback(() => setDrawer(false), []);

  const agregarAlCarrito = useCallback(
    (id: string) => {
      const obra = obraPorId(id);
      if (!obra) return;
      if (estaVendida(obra)) {
        mostrar('Esta obra ya no está disponible.');
        return;
      }
      setCarrito((prev) => (prev.includes(id) ? prev : [...prev, id]));
      setDrawer(true);
    },
    [estaVendida, mostrar, setCarrito]
  );

  const quitarDelCarrito = useCallback(
    (id: string) => {
      setCarrito((prev) => prev.filter((x) => x !== id));
      const obra = obraPorId(id);
      if (obra) mostrar(`«${obra.titulo}» se ha quitado del carrito.`);
    },
    [mostrar, setCarrito]
  );

  const alternarFavorito = useCallback(
    (id: string) => {
      const obra = obraPorId(id);
      const yaEs = favoritos.includes(id);
      setFavoritos((prev) => (yaEs ? prev.filter((x) => x !== id) : [...prev, id]));
      if (obra) mostrar(yaEs ? `«${obra.titulo}» ya no está en favoritos.` : `«${obra.titulo}» guardada en favoritos.`);
    },
    [favoritos, mostrar, setFavoritos]
  );

  const confirmarPedido = useCallback(
    (envio: DatosEnvio, usuarioId?: string): Pedido => {
      const pedido: Pedido = {
        numero: `GA-${Date.now().toString(36).toUpperCase()}`,
        fecha: new Date().toISOString(),
        usuarioId,
        total: totalCarrito,
        envio,
        lineas: obrasCarrito.map((o) => ({
          obraId: o.id,
          titulo: o.titulo,
          artista: artistaPorId(o.artistaId)?.nombre ?? '',
          precio: o.precio,
        })),
      };
      setPedidos((prev) => [pedido, ...prev]);
      setVendidas((prev) => Array.from(new Set([...prev, ...obrasCarrito.map((o) => o.id)])));
      setCarrito([]);
      setDrawer(false);
      return pedido;
    },
    [obrasCarrito, totalCarrito, setPedidos, setVendidas, setCarrito]
  );

  const value: TiendaValue = {
    obrasCarrito,
    totalCarrito,
    favoritos,
    pedidos,
    enCarrito,
    esFavorita,
    estaVendida,
    agregarAlCarrito,
    quitarDelCarrito,
    alternarFavorito,
    confirmarPedido,
    drawerAbierto,
    abrirDrawer,
    cerrarDrawer,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useTienda = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useTienda debe usarse dentro de <TiendaProvider>');
  return ctx;
};
