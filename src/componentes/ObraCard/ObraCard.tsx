import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FiShoppingBag } from 'react-icons/fi';
import { artistaPorId } from '../../data/artistas';
import { useTienda } from '../../context/TiendaContext';
import { Obra } from '../../types';
import { formatEUR, medidas } from '../../utils/format';
import { BotonTexto } from '../common/ui';
import {
  EnlaceObra,
  Etiqueta,
  Ficha,
  FilaPrecio,
  Favorito,
  Marco,
  NombreArtista,
  Nota,
  Pared,
  Precio,
  Tarjeta,
  TituloObra,
  Vendida,
} from './ObraCard.styles';

interface Props {
  obra: Obra;
  /** 'panel': obra sobre panel gris de tamaño fijo. 'libre': la obra a su proporción real. */
  variante?: 'panel' | 'libre';
  nota?: string;
}

/**
 * Una obra colgada en la pared con su cartela de museo:
 * artista, título y año, técnica, medidas y precio.
 */
const ObraCard: React.FC<Props> = ({ obra, variante = 'panel', nota }) => {
  const { esFavorita, alternarFavorito, enCarrito, agregarAlCarrito, estaVendida } = useTienda();
  const artista = artistaPorId(obra.artistaId);
  const vendida = estaVendida(obra);
  const favorita = esFavorita(obra.id);
  const libre = variante === 'libre';
  const enlace = `/obras/${obra.id}`;

  return (
    <Tarjeta>
      <Pared $libre={libre}>
        <EnlaceObra to={enlace} $libre={libre}>
          <Marco $libre={libre}>
            <img
              src={obra.imagen}
              alt={`«${obra.titulo}», ${obra.tecnica.toLowerCase()} de ${artista?.nombre ?? 'autor desconocido'}`}
              loading="lazy"
              style={libre ? { aspectRatio: `${obra.ancho} / ${obra.alto}`, objectFit: 'cover' } : undefined}
            />
          </Marco>
        </EnlaceObra>
        <Favorito
          type="button"
          onClick={() => alternarFavorito(obra.id)}
          aria-pressed={favorita}
          aria-label={favorita ? `Quitar «${obra.titulo}» de favoritos` : `Guardar «${obra.titulo}» en favoritos`}
        >
          {favorita ? <FaHeart aria-hidden /> : <FaRegHeart aria-hidden />}
        </Favorito>
      </Pared>

      <Etiqueta>
        {artista && <NombreArtista to={`/artistas/${artista.id}`}>{artista.nombre}</NombreArtista>}
        <TituloObra>
          <Link to={enlace}>
            <em>{obra.titulo}</em>
          </Link>
          , {obra.anio}
        </TituloObra>
        <Ficha>{obra.tecnica}</Ficha>
        <Ficha>{medidas(obra)}</Ficha>
        {nota && <Nota>{nota}</Nota>}

        <FilaPrecio>
          <Precio>{formatEUR(obra.precio)}</Precio>
          {vendida ? (
            <Vendida>Vendida</Vendida>
          ) : enCarrito(obra.id) ? (
            <BotonTexto as={Link} to="/carrito">
              <FiShoppingBag aria-hidden /> En el carrito
            </BotonTexto>
          ) : (
            <BotonTexto
              type="button"
              onClick={() => agregarAlCarrito(obra.id)}
              aria-label={`Añadir «${obra.titulo}» al carrito`}
            >
              <FiShoppingBag aria-hidden /> Añadir
            </BotonTexto>
          )}
        </FilaPrecio>
      </Etiqueta>
    </Tarjeta>
  );
};

export default ObraCard;
