import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Tarjeta = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

/** La "pared": un panel gris claro sobre el que cuelga la obra. */
export const Pared = styled.div<{ $libre: boolean }>`
  position: relative;
  background: ${(p) => (p.$libre ? 'transparent' : 'var(--muro)')};
  ${(p) => (p.$libre ? '' : 'aspect-ratio: 4 / 5;')}
`;

export const EnlaceObra = styled(Link)<{ $libre: boolean }>`
  display: block;
  ${(p) => (p.$libre ? '' : 'position: absolute; inset: 0;')}
  cursor: zoom-in;

  &:focus-visible {
    outline-offset: -2px;
  }
`;

export const Marco = styled.span<{ $libre: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${(p) =>
    p.$libre
      ? ''
      : `
    position: absolute;
    inset: 11%;
  `}

  img {
    max-width: 100%;
    max-height: 100%;
    width: ${(p) => (p.$libre ? '100%' : 'auto')};
    height: auto;
    box-shadow: 0 1px 2px rgba(15, 23, 29, 0.18), 0 14px 26px -10px rgba(15, 23, 29, 0.42);
    transition: transform 0.25s ease;
  }
`;

export const Favorito = styled.button`
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  background: rgba(255, 255, 255, 0.92);
  border: 0;
  border-radius: 50%;
  color: var(--tinta);
  font-size: 1.05rem;
  cursor: pointer;
  transition: transform 0.15s ease, background 0.15s ease;

  &:hover {
    background: #fff;
    transform: scale(1.08);
  }
`;

export const Etiqueta = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.15rem;
  padding-top: 0.85rem;
`;

export const NombreArtista = styled(Link)`
  font-size: 0.98rem;
  font-weight: 500;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

export const TituloObra = styled.p`
  font-family: var(--fuente-texto);
  font-size: 1.08rem;
  line-height: 1.3;

  a {
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

export const Ficha = styled.p`
  font-family: var(--fuente-texto);
  font-size: 0.95rem;
  line-height: 1.35;
  color: var(--suave);
`;

export const Nota = styled.p`
  margin-top: 0.35rem;
  font-family: var(--fuente-texto);
  font-style: italic;
  font-size: 0.92rem;
  color: var(--oro-texto);
`;

export const FilaPrecio = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 0.6rem;
`;

export const Precio = styled.p`
  font-size: 1.05rem;
  font-weight: 500;
`;

export const Vendida = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.92rem;
  color: var(--suave);

  &::before {
    content: '';
    width: 0.65rem;
    height: 0.65rem;
    background: var(--rojo);
    border-radius: 50%;
  }
`;
