import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ObraCard from '../../../../ObraCard/ObraCard';
import { Obra } from '../../../../../types';
import { Elemento, Flecha, Pista, Ventana } from './CustomCarousel.styles';

interface Props {
  obras: Obra[];
}

/**
 * Carrusel horizontal con scroll-snap nativo (sin librerías).
 * Funciona con el dedo, la rueda, el teclado y las flechas, y no se sale de la página.
 */
const CustomCarousel: React.FC<Props> = ({ obras }) => {
  const pista = useRef<HTMLUListElement>(null);
  const [puedeIzq, setPuedeIzq] = useState(false);
  const [puedeDer, setPuedeDer] = useState(true);

  const actualizar = useCallback(() => {
    const el = pista.current;
    if (!el) return;
    setPuedeIzq(el.scrollLeft > 4);
    setPuedeDer(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    actualizar();
    window.addEventListener('resize', actualizar);
    return () => window.removeEventListener('resize', actualizar);
  }, [actualizar, obras]);

  const mover = (dir: 1 | -1) => {
    const el = pista.current;
    if (!el) return;
    const paso = (el.firstElementChild as HTMLElement | null)?.offsetWidth ?? 300;
    el.scrollBy({ left: dir * (paso + 24), behavior: 'smooth' });
  };

  return (
    <Ventana>
      <Flecha type="button" $lado="izq" onClick={() => mover(-1)} disabled={!puedeIzq} aria-label="Obras anteriores">
        <FiChevronLeft aria-hidden />
      </Flecha>
      <Pista ref={pista} onScroll={actualizar} aria-label="Obras destacadas">
        {obras.map((obra) => (
          <Elemento key={obra.id}>
            <ObraCard obra={obra} />
          </Elemento>
        ))}
      </Pista>
      <Flecha type="button" $lado="der" onClick={() => mover(1)} disabled={!puedeDer} aria-label="Obras siguientes">
        <FiChevronRight aria-hidden />
      </Flecha>
    </Ventana>
  );
};

export default CustomCarousel;
