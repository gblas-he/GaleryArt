import React from 'react';
import styled from 'styled-components';
import { Obra } from '../../../types';

const Caja = styled.figure`
  margin-top: 1.5rem;

  svg {
    display: block;
    width: 100%;
    height: auto;
    background: #e9eaea;
  }
  figcaption {
    margin-top: 0.5rem;
    font-family: var(--fuente-texto);
    font-size: 0.95rem;
    color: var(--suave);
  }
`;

/** Dibuja la obra a escala real (en cm) sobre un sofá de 200 cm en una pared de 300 × 250 cm. */
const EscalaObra: React.FC<{ obra: Obra }> = ({ obra }) => {
  const suelo = 235;
  const altoRespaldo = 85;
  const baseObra = suelo - altoRespaldo - 25; // 25 cm por encima del respaldo
  const x = 150 - obra.ancho / 2;
  const y = baseObra - obra.alto;

  return (
    <Caja>
      <svg viewBox="0 0 300 250" role="img" aria-label={`«${obra.titulo}» a escala sobre un sofá de dos metros`}>
        <rect x="0" y={suelo} width="300" height="15" fill="#cfd1d2" />
        {/* sofá */}
        <rect x="50" y={suelo - altoRespaldo} width="200" height="52" rx="6" fill="#3b4750" />
        <rect x="40" y={suelo - 55} width="20" height="55" rx="6" fill="#2f3a42" />
        <rect x="240" y={suelo - 55} width="20" height="55" rx="6" fill="#2f3a42" />
        <rect x="58" y={suelo - 40} width="184" height="34" rx="5" fill="#4a5963" />
        <rect x="58" y={suelo - 6} width="6" height="6" fill="#1d252b" />
        <rect x="236" y={suelo - 6} width="6" height="6" fill="#1d252b" />
        {/* obra */}
        <image
          href={obra.imagen}
          x={x}
          y={y}
          width={obra.ancho}
          height={obra.alto}
          preserveAspectRatio="none"
          style={{ filter: 'drop-shadow(0 3px 4px rgba(0,0,0,.35))' }}
        />
      </svg>
      <figcaption>
        A escala real, sobre un sofá de 200 cm de ancho. La obra mide {obra.ancho} × {obra.alto} cm.
      </figcaption>
    </Caja>
  );
};

export default EscalaObra;
