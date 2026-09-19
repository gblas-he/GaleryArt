import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Pie = styled.footer`
  background: var(--tinta);
  color: #fff;
  padding: clamp(2.5rem, 5vw, 3.5rem) 0 1.5rem;

  a:focus-visible {
    outline-color: var(--oro);
  }
`;

export const Envoltorio = styled.div`
  width: 100%;
  max-width: var(--ancho-max);
  margin: 0 auto;
  padding: 0 var(--gutter);
`;

export const Columnas = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 1.3fr 1.4fr 1.1fr 0.9fr;
  gap: 2rem;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (max-width: 680px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 440px) {
    grid-template-columns: 1fr;
  }
`;

export const Bloque = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.35rem;
`;

export const Titulo = styled.h2`
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  font-weight: 500;
`;

export const EnlacePie = styled(Link)`
  color: #b8c0c6;
  text-decoration: none;
  font-size: 0.95rem;
  &:hover {
    color: #fff;
    text-decoration: underline;
  }
`;

export const EnlaceExterno = styled.a`
  color: #b8c0c6;
  text-decoration: none;
  font-size: 0.95rem;
  &:hover {
    color: #fff;
    text-decoration: underline;
  }
`;

export const Redes = styled.div`
  display: flex;
  gap: 0.9rem;
  margin-bottom: 0.5rem;
`;

export const Red = styled.a`
  color: #b8c0c6;
  font-size: 1.5rem;
  line-height: 0;
  &:hover {
    color: var(--oro);
  }
`;

export const Idioma = styled.p`
  color: #b8c0c6;
  font-size: 0.95rem;
`;

export const Legal = styled.p`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.4rem 1.5rem;
  margin-top: 2.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 0.85rem;
  color: #b8c0c6;

  a {
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  a:hover {
    color: #fff;
  }
`;
