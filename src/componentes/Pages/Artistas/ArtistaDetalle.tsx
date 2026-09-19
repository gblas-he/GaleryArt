import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { artistaPorId } from '../../../data/artistas';
import { obras } from '../../../data/obras';
import { useTitulo } from '../../../hooks/useTitulo';
import { iniciales } from '../../../utils/format';
import ObraCard from '../../ObraCard/ObraCard';
import { Contenedor, Migas, Monograma, RejillaObras } from '../../common/ui';
import NoEncontrada from '../NoEncontrada/NoEncontrada';
import { Bio, CabeceraArtista } from './Artistas.styles';

const ArtistaDetalle: React.FC = () => {
  const { id = '' } = useParams();
  const artista = artistaPorId(id);
  useTitulo(artista?.nombre ?? 'Artista no encontrado');

  if (!artista) return <NoEncontrada titulo="No encontramos a este artista" />;

  const suyas = obras.filter((o) => o.artistaId === artista.id);

  return (
    <Contenedor>
      <Migas aria-label="Ruta de navegación">
        <Link to="/artistas">Artistas</Link>
      </Migas>
      <CabeceraArtista>
        <Monograma $tam={88} aria-hidden>
          {iniciales(artista.nombre)}
        </Monograma>
        <div>
          <h1>{artista.nombre}</h1>
          <p className="lugar">
            {artista.ciudad}, {artista.pais}. {artista.disciplina}.
          </p>
        </div>
      </CabeceraArtista>
      <Bio>{artista.bio}</Bio>

      <RejillaObras style={{ paddingBottom: '4rem' }}>
        {suyas.map((o) => (
          <li key={o.id}>
            <ObraCard obra={o} />
          </li>
        ))}
      </RejillaObras>
    </Contenedor>
  );
};

export default ArtistaDetalle;
