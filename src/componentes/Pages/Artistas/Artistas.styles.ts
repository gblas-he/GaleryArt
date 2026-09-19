import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Lista = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr));
  gap: 2.5rem 3rem;
  padding: 2.5rem 0 clamp(3rem, 7vw, 5rem);
`;

export const Ficha = styled.article`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.25rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--texto);

  h2 {
    font-size: 1.4rem;
    font-weight: 500;
  }
  h2 a {
    text-decoration: none;
  }
  h2 a:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  .lugar {
    margin-top: 0.15rem;
    font-family: var(--fuente-texto);
    font-size: 1.02rem;
    color: var(--suave);
  }
  .bio {
    margin: 0.9rem 0 1rem;
    font-family: var(--fuente-texto);
    font-size: 1.08rem;
    line-height: 1.55;
  }
`;

export const EnlaceObras = styled(Link)`
  font-weight: 500;
  color: var(--texto);
`;

export const CabeceraArtista = styled.header`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  padding: 1.5rem 0 2rem;

  h1 {
    font-size: clamp(2rem, 4.5vw, 3rem);
    font-weight: 400;
  }
  .lugar {
    margin-top: 0.25rem;
    font-family: var(--fuente-texto);
    font-size: 1.1rem;
    color: var(--suave);
  }
`;

export const Bio = styled.p`
  max-width: 60ch;
  padding-bottom: 2.5rem;
  font-family: var(--fuente-texto);
  font-size: 1.2rem;
  line-height: 1.65;
`;
