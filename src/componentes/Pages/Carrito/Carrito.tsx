import React from 'react';
import { Link } from 'react-router-dom';
import { useTienda } from '../../../context/TiendaContext';
import { artistaPorId } from '../../../data/artistas';
import { useTitulo } from '../../../hooks/useTitulo';
import { formatEUR, medidas } from '../../../utils/format';
import { Boton, CabeceraPagina, Contenedor, EstadoVacio } from '../../common/ui';
import { Detalle, Disposicion, Fila, Lista, Miniatura, PrecioFila, Resumen } from './Carrito.styles';

const Carrito: React.FC = () => {
  useTitulo('Carrito');
  const { obrasCarrito, totalCarrito, quitarDelCarrito, alternarFavorito, esFavorita } = useTienda();

  return (
    <Contenedor>
      <CabeceraPagina>
        <h1>Su carrito</h1>
        <p>
          {obrasCarrito.length === 0
            ? 'Todavía no ha añadido ninguna obra.'
            : 'Cada obra es un original único: si otra persona la compra antes, dejará de estar disponible.'}
        </p>
      </CabeceraPagina>

      {obrasCarrito.length === 0 ? (
        <EstadoVacio>
          <h2>Su carrito está vacío</h2>
          <p>Explore el catálogo y añada las obras que le interesen.</p>
          <Boton as={Link} to="/obras">
            Explorar obras
          </Boton>
        </EstadoVacio>
      ) : (
        <Disposicion>
          <Lista>
            {obrasCarrito.map((obra) => (
              <Fila key={obra.id}>
                <Link to={`/obras/${obra.id}`} aria-label={`Ver «${obra.titulo}»`}>
                  <Miniatura>
                    <img src={obra.imagen} alt="" />
                  </Miniatura>
                </Link>
                <Detalle>
                  <strong>{artistaPorId(obra.artistaId)?.nombre}</strong>
                  <Link to={`/obras/${obra.id}`}>
                    <em>{obra.titulo}</em>, {obra.anio}
                  </Link>
                  <span>{obra.tecnica}</span>
                  <span>{medidas(obra)}</span>
                  <div className="acciones">
                    <button type="button" onClick={() => quitarDelCarrito(obra.id)}>
                      Quitar
                    </button>
                    {!esFavorita(obra.id) && (
                      <button type="button" onClick={() => alternarFavorito(obra.id)}>
                        Guardar en favoritos
                      </button>
                    )}
                  </div>
                </Detalle>
                <PrecioFila className="precio">{formatEUR(obra.precio)}</PrecioFila>
              </Fila>
            ))}
          </Lista>

          <Resumen aria-label="Resumen del pedido">
            <h2>Resumen</h2>
            <dl>
              <dt>Subtotal</dt>
              <dd>{formatEUR(totalCarrito)}</dd>
              <dt>Envío asegurado</dt>
              <dd>Incluido</dd>
              <dt>IVA</dt>
              <dd>Incluido</dd>
            </dl>
            <p className="total">
              <span>Total</span>
              <span>{formatEUR(totalCarrito)}</span>
            </p>
            <Boton as={Link} to="/pedido" $bloque $grande>
              Finalizar compra
            </Boton>
            <Boton as={Link} to="/obras" $variante="secundario" $bloque>
              Seguir explorando
            </Boton>
          </Resumen>
        </Disposicion>
      )}
    </Contenedor>
  );
};

export default Carrito;
