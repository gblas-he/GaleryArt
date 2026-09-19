import styled from 'styled-components';

export const Disposicion = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
  gap: clamp(1.5rem, 5vw, 4rem);
  padding: 1.5rem 0 clamp(2.5rem, 6vw, 4rem);
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const ParedGrande = styled.div`
  display: grid;
  place-items: center;
  min-height: min(78vh, 760px);
  padding: clamp(1.5rem, 6vw, 4rem);
  background: var(--muro);

  img {
    max-width: 100%;
    max-height: min(68vh, 660px);
    width: auto;
    height: auto;
    box-shadow: 0 2px 3px rgba(15, 23, 29, 0.2), 0 30px 50px -20px rgba(15, 23, 29, 0.5);
  }
`;

export const Ficha = styled.div`
  @media (min-width: 901px) {
    position: sticky;
    top: calc(var(--alto-nav) + 1.5rem);
  }
`;

export const Autor = styled.p`
  font-size: 1.1rem;
  font-weight: 500;

  a {
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`;

export const Titulo = styled.h1`
  margin-top: 0.35rem;
  font-family: var(--fuente-texto);
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 400;
  font-style: italic;
  line-height: 1.12;

  span {
    font-style: normal;
    color: var(--suave);
  }
`;

export const Datos = styled.dl`
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 0.4rem 1.5rem;
  margin: 1.5rem 0;
  padding: 1.1rem 0;
  border-top: 1px solid var(--linea);
  border-bottom: 1px solid var(--linea);
  font-family: var(--fuente-texto);
  font-size: 1.08rem;

  dt {
    color: var(--suave);
  }
`;

export const PrecioGrande = styled.p`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 2rem;
  font-weight: 500;

  small {
    font-size: 0.9rem;
    font-weight: 400;
    color: var(--suave);
  }
`;

export const Acciones = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 1.25rem 0 1.75rem;

  > :first-child {
    flex: 1 1 14rem;
  }
`;

export const Descripcion = styled.p`
  font-family: var(--fuente-texto);
  font-size: 1.15rem;
  line-height: 1.65;
  max-width: 60ch;
`;

export const Desplegable = styled.details`
  margin-top: 1.5rem;
  border-top: 1px solid var(--linea);

  summary {
    padding: 0.9rem 0;
    font-weight: 500;
    cursor: pointer;
  }
  p {
    padding-bottom: 1rem;
    font-family: var(--fuente-texto);
    font-size: 1.05rem;
    line-height: 1.6;
    color: var(--suave);
  }
  a {
    color: var(--texto);
  }
`;

export const Relacionadas = styled.section`
  padding: clamp(2rem, 5vw, 3.5rem) 0;
  border-top: 1px solid var(--linea);

  h2 {
    margin-bottom: 1.75rem;
    font-size: clamp(1.5rem, 3vw, 1.9rem);
    font-weight: 400;
  }
`;
