import React from 'react';
import { Link } from 'react-router-dom';
import { artistas } from '../../../data/artistas';
import { obras } from '../../../data/obras';
import { useTitulo } from '../../../hooks/useTitulo';
import { iniciales } from '../../../utils/format';
import { CabeceraPagina, Contenedor, Monograma } from '../../common/ui';
import { EnlaceObras, Ficha, Lista } from './Artistas.styles';

const Artistas: React.FC = () => {
  useTitulo('Artistas');
  return (
    <Contenedor>
      <CabeceraPagina style={{ borderBottom: 0, paddingBottom: 0 }}>
        <h1>Artistas</h1>
        <p>Conozca a quienes están detrás de las obras: de dónde vienen y cómo trabajan.</p>
      </CabeceraPagina>

      <Lista>
        {artistas.map((a) => {
          const n = obras.filter((o) => o.artistaId === a.id).length;
          return (
            <li key={a.id}>
              <Ficha>
                <Monograma $tam={72} aria-hidden>
                  {iniciales(a.nombre)}
                </Monograma>
                <div>
                  <h2>
                    <Link to={`/artistas/${a.id}`}>{a.nombre}</Link>
                  </h2>
                  <p className="lugar">
                    {a.ciudad}, {a.pais}. {a.disciplina}.
                  </p>
                  <p className="bio">{a.bio}</p>
                  <EnlaceObras to={`/artistas/${a.id}`}>Ver {n === 1 ? '1 obra' : `${n} obras`}</EnlaceObras>
                </div>
              </Ficha>
            </li>
          );
        })}
      </Lista>
    </Contenedor>
  );
};

export default Artistas;
