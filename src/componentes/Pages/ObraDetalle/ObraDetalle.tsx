import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FiShoppingBag } from 'react-icons/fi';
import { useTienda } from '../../../context/TiendaContext';
import { artistaPorId } from '../../../data/artistas';
import { obraPorId, obras } from '../../../data/obras';
import { useTitulo } from '../../../hooks/useTitulo';
import { formatEUR, medidas } from '../../../utils/format';
import ObraCard from '../../ObraCard/ObraCard';
import { Boton, Contenedor, Migas, RejillaObras } from '../../common/ui';
import NoEncontrada from '../NoEncontrada/NoEncontrada';
import EscalaObra from './EscalaObra';
import {
  Acciones,
  Autor,
  Datos,
  Descripcion,
  Desplegable,
  Disposicion,
  Ficha,
  ParedGrande,
  PrecioGrande,
  Relacionadas,
  Titulo,
} from './ObraDetalle.styles';

const ObraDetalle: React.FC = () => {
  const { id = '' } = useParams();
  const obra = obraPorId(id);
  const { esFavorita, alternarFavorito, enCarrito, agregarAlCarrito, estaVendida } = useTienda();
  useTitulo(obra ? `${obra.titulo}, ${artistaPorId(obra.artistaId)?.nombre ?? ''}` : 'Obra no encontrada');

  if (!obra) {
    return <NoEncontrada titulo="No encontramos esta obra" texto="Puede que ya no esté en la galería. Explore el resto del catálogo." />;
  }

  const artista = artistaPorId(obra.artistaId);
  const vendida = estaVendida(obra);
  const favorita = esFavorita(obra.id);
  const dentro = enCarrito(obra.id);

  const delArtista = obras.filter((o) => o.artistaId === obra.artistaId && o.id !== obra.id);
  const similares = obras
    .filter((o) => o.id !== obra.id && o.artistaId !== obra.artistaId && (o.categoria === obra.categoria || o.paletas.some((p) => obra.paletas.includes(p))))
    .sort((a, b) => Number(b.categoria === obra.categoria) - Number(a.categoria === obra.categoria))
    .slice(0, 4);

  return (
    <Contenedor>
      <Migas aria-label="Ruta de navegación">
        <Link to="/obras">Obras de arte</Link>
        <span aria-hidden>/</span>
        <Link to={`/obras?cat=${encodeURIComponent(obra.categoria)}`}>{obra.categoria}</Link>
      </Migas>

      <Disposicion>
        <div>
          <ParedGrande>
            <img src={obra.imagen} alt={`«${obra.titulo}», ${obra.tecnica.toLowerCase()} de ${artista?.nombre ?? ''}`} />
          </ParedGrande>
          <EscalaObra obra={obra} />
        </div>

        <Ficha>
          {artista && (
            <Autor>
              <Link to={`/artistas/${artista.id}`}>{artista.nombre}</Link>
            </Autor>
          )}
          <Titulo>
            {obra.titulo}, <span>{obra.anio}</span>
          </Titulo>

          <Datos>
            <dt>Técnica</dt>
            <dd>{obra.tecnica}</dd>
            <dt>Medidas</dt>
            <dd>{medidas(obra)}</dd>
            <dt>Categoría</dt>
            <dd>{obra.categoria}</dd>
            <dt>Ejemplar</dt>
            <dd>Original único</dd>
          </Datos>

          <PrecioGrande>
            {formatEUR(obra.precio)} <small>IVA incluido</small>
          </PrecioGrande>

          <Acciones>
            {vendida ? (
              <Boton type="button" $grande disabled>
                Vendida
              </Boton>
            ) : dentro ? (
              <Boton as={Link} to="/carrito" $grande>
                <FiShoppingBag aria-hidden /> Ir al carrito
              </Boton>
            ) : (
              <Boton type="button" $grande onClick={() => agregarAlCarrito(obra.id)}>
                <FiShoppingBag aria-hidden /> Añadir al carrito
              </Boton>
            )}
            <Boton
              type="button"
              $variante="secundario"
              $grande
              aria-pressed={favorita}
              onClick={() => alternarFavorito(obra.id)}
            >
              {favorita ? <FaHeart aria-hidden /> : <FaRegHeart aria-hidden />}
              {favorita ? 'En favoritos' : 'Favoritos'}
            </Boton>
          </Acciones>

          <Descripcion>{obra.descripcion}</Descripcion>

          <Desplegable>
            <summary>Envío y devoluciones</summary>
            <p>
              Cada obra se embala y se envía asegurada. Consulte los plazos en <Link to="/info/envio">Envío</Link> y las
              condiciones en <Link to="/info/devoluciones">Política de devoluciones</Link>.
            </p>
          </Desplegable>
          <Desplegable>
            <summary>¿Dudas sobre esta obra?</summary>
            <p>
              Escríbanos desde <Link to="/info/contacto">Contacto</Link> o pida <Link to="/info/asesoramiento">asesoramiento gratuito</Link>.
            </p>
          </Desplegable>
        </Ficha>
      </Disposicion>

      {delArtista.length > 0 && artista && (
        <Relacionadas>
          <h2>Más obras de {artista.nombre}</h2>
          <RejillaObras>
            {delArtista.slice(0, 4).map((o) => (
              <li key={o.id}>
                <ObraCard obra={o} />
              </li>
            ))}
          </RejillaObras>
        </Relacionadas>
      )}

      {similares.length > 0 && (
        <Relacionadas>
          <h2>También le puede interesar</h2>
          <RejillaObras>
            {similares.map((o) => (
              <li key={o.id}>
                <ObraCard obra={o} />
              </li>
            ))}
          </RejillaObras>
        </Relacionadas>
      )}
    </Contenedor>
  );
};

export default ObraDetalle;
