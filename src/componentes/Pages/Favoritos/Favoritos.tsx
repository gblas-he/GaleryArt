import React from 'react';
import { Link } from 'react-router-dom';
import { useTienda } from '../../../context/TiendaContext';
import { obraPorId } from '../../../data/obras';
import { useTitulo } from '../../../hooks/useTitulo';
import { Obra } from '../../../types';
import ObraCard from '../../ObraCard/ObraCard';
import { Boton, CabeceraPagina, Contenedor, EstadoVacio, RejillaObras } from '../../common/ui';

const Favoritos: React.FC = () => {
  useTitulo('Favoritos');
  const { favoritos } = useTienda();
  const lista = favoritos.map(obraPorId).filter((o): o is Obra => !!o);

  return (
    <Contenedor>
      <CabeceraPagina>
        <h1>Favoritos</h1>
        <p>
          {lista.length === 0
            ? 'Las obras que guarde con el corazón aparecerán aquí.'
            : `${lista.length === 1 ? '1 obra guardada' : `${lista.length} obras guardadas`} en este navegador.`}
        </p>
      </CabeceraPagina>

      {lista.length === 0 ? (
        <EstadoVacio>
          <h2>Todavía no ha guardado ninguna obra</h2>
          <p>Toque el corazón en cualquier obra para volver a ella más tarde.</p>
          <Boton as={Link} to="/obras">
            Explorar obras
          </Boton>
        </EstadoVacio>
      ) : (
        <RejillaObras style={{ padding: '2.5rem 0 4rem' }}>
          {lista.map((o) => (
            <li key={o.id}>
              <ObraCard obra={o} />
            </li>
          ))}
        </RejillaObras>
      )}
    </Contenedor>
  );
};

export default Favoritos;
