import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import { artistaPorId } from '../../data/artistas';
import { useTienda } from '../../context/TiendaContext';
import { formatEUR, medidas } from '../../utils/format';
import { Boton } from '../common/ui';
import { Cabecera, Datos, Fondo, Linea, Lista, Miniatura, Nota, Panel, Pie, Subtotal, Vacio } from './CartDrawer.styles';

/** Carrito lateral: se abre desde el icono de la barra o al añadir una obra. */
const CartDrawer: React.FC = () => {
  const { drawerAbierto, cerrarDrawer, obrasCarrito, totalCarrito, quitarDelCarrito } = useTienda();
  const cerrar = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (drawerAbierto) cerrarDrawer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!drawerAbierto) return;
    const alPulsar = (e: KeyboardEvent) => e.key === 'Escape' && cerrarDrawer();
    document.addEventListener('keydown', alPulsar);
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    cerrar.current?.focus();
    return () => {
      document.removeEventListener('keydown', alPulsar);
      document.body.style.overflow = overflowPrevio;
    };
  }, [drawerAbierto, cerrarDrawer]);

  if (!drawerAbierto) return null;

  return (
    <>
      <Fondo onClick={cerrarDrawer} aria-hidden />
      <Panel role="dialog" aria-modal="true" aria-label="Su carrito">
        <Cabecera>
          <h2>Su carrito ({obrasCarrito.length})</h2>
          <button ref={cerrar} type="button" onClick={cerrarDrawer} aria-label="Cerrar carrito">
            <FiX aria-hidden />
          </button>
        </Cabecera>

        {obrasCarrito.length === 0 ? (
          <Vacio>
            <p>Su carrito está vacío.</p>
            <Boton as={Link} to="/obras" $variante="primario" onClick={cerrarDrawer}>
              Explorar obras
            </Boton>
          </Vacio>
        ) : (
          <>
            <Lista>
              {obrasCarrito.map((obra) => (
                <Linea key={obra.id}>
                  <Miniatura>
                    <img src={obra.imagen} alt="" />
                  </Miniatura>
                  <Datos>
                    <strong>{artistaPorId(obra.artistaId)?.nombre}</strong>
                    <Link to={`/obras/${obra.id}`} style={{ textDecoration: 'none' }}>
                      <em>{obra.titulo}</em>
                    </Link>
                    <span>{medidas(obra)}</span>
                    <strong>{formatEUR(obra.precio)}</strong>
                    <button type="button" onClick={() => quitarDelCarrito(obra.id)}>
                      Quitar
                    </button>
                  </Datos>
                </Linea>
              ))}
            </Lista>
            <Pie>
              <Subtotal>
                <span>Subtotal</span>
                <span>{formatEUR(totalCarrito)}</span>
              </Subtotal>
              <Nota>IVA incluido. Cada obra es un original único.</Nota>
              <Boton as={Link} to="/pedido" $bloque $grande>
                Finalizar compra
              </Boton>
              <Boton as={Link} to="/carrito" $variante="secundario" $bloque>
                Ver carrito
              </Boton>
            </Pie>
          </>
        )}
      </Panel>
    </>
  );
};

export default CartDrawer;
