import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Hero = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  min-height: clamp(420px, 66vh, 620px);
  background-size: cover;
  background-position: center;
  color: #fff;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(15, 23, 29, 0.93) 0%, rgba(15, 23, 29, 0.72) 42%, rgba(15, 23, 29, 0.12) 100%);
  }
  @media (max-width: 760px) {
    &::before {
      background: rgba(15, 23, 29, 0.74);
    }
  }
`;

export const HeroTexto = styled.div`
  position: relative;
  max-width: 40rem;
  padding: 3rem 0;

  h1 {
    font-size: clamp(2.6rem, 6.5vw, 4.6rem);
    font-weight: 300;
    letter-spacing: 0.01em;
  }
  p {
    margin-top: 1.25rem;
    font-family: var(--fuente-texto);
    font-size: clamp(1.1rem, 2vw, 1.3rem);
    line-height: 1.55;
    color: rgba(255, 255, 255, 0.88);
  }
`;

export const HeroAcciones = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2rem;
`;

export const Encabezado = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.75rem;

  h2 {
    font-size: clamp(1.6rem, 3vw, 2.1rem);
    font-weight: 400;
  }
`;

export const Categorias = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const Categoria = styled(Link)`
  display: block;
  text-decoration: none;

  img {
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    background: var(--muro);
  }
  strong {
    display: block;
    margin-top: 0.7rem;
    font-size: 1.15rem;
    font-weight: 500;
  }
  span {
    font-family: var(--fuente-texto);
    color: var(--suave);
  }
  &:hover strong {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`;

export const ListaArtistas = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 1.5rem;
`;

export const Artista = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;

  strong {
    display: block;
    font-weight: 500;
    font-size: 1.08rem;
  }
  span {
    font-family: var(--fuente-texto);
    color: var(--suave);
  }
  &:hover strong {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`;

export const Banda = styled.section`
  background: var(--tinta-2);
  color: #fff;
  padding: clamp(3rem, 7vw, 5rem) 0;

  a:focus-visible {
    outline-color: var(--oro);
  }
`;

export const BandaContenido = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem 3rem;

  h2 {
    font-size: clamp(1.7rem, 3.5vw, 2.4rem);
    font-weight: 400;
  }
  p {
    margin-top: 0.75rem;
    max-width: 38rem;
    font-family: var(--fuente-texto);
    font-size: 1.15rem;
    line-height: 1.55;
    color: rgba(255, 255, 255, 0.82);
  }
`;
