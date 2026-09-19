import styled from 'styled-components';

export const Disposicion = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: clamp(1.5rem, 4vw, 3.5rem);
  align-items: start;
  padding: 2rem 0 clamp(3rem, 7vw, 5rem);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const Lista = styled.ul`
  border-top: 1px solid var(--texto);
`;

export const Fila = styled.li`
  display: grid;
  grid-template-columns: 110px minmax(0, 1fr) auto;
  gap: 1.25rem;
  padding: 1.25rem 0;
  border-bottom: 1px solid var(--linea);

  @media (max-width: 560px) {
    grid-template-columns: 84px minmax(0, 1fr);
    .precio {
      grid-column: 2;
    }
  }
`;

export const Miniatura = styled.div`
  display: grid;
  place-items: center;
  aspect-ratio: 4 / 5;
  padding: 12px;
  background: var(--muro);

  img {
    max-width: 100%;
    max-height: 100%;
    box-shadow: 0 8px 14px -8px rgba(15, 23, 29, 0.6);
  }
`;

export const Detalle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;

  strong {
    font-weight: 500;
    font-size: 1.05rem;
  }
  em {
    font-family: var(--fuente-texto);
    font-size: 1.15rem;
  }
  a {
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  span {
    font-family: var(--fuente-texto);
    color: var(--suave);
  }
  .acciones {
    display: flex;
    gap: 1.25rem;
    margin-top: auto;
    padding-top: 0.75rem;
  }
  .acciones button {
    padding: 0;
    background: none;
    border: 0;
    border-bottom: 1px solid currentColor;
    font-size: 0.92rem;
    color: var(--suave);
    cursor: pointer;
  }
  .acciones button:hover {
    color: var(--texto);
  }
`;

export const PrecioFila = styled.p`
  font-size: 1.15rem;
  font-weight: 500;
`;

export const Resumen = styled.aside`
  position: sticky;
  top: calc(var(--alto-nav) + 1.5rem);
  padding: 1.5rem;
  background: var(--muro);

  h2 {
    margin-bottom: 1rem;
    font-size: 1.3rem;
    font-weight: 500;
  }
  dl {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.6rem 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--linea);
    font-family: var(--fuente-texto);
    font-size: 1.05rem;
  }
  dd {
    text-align: right;
  }
  .total {
    display: flex;
    justify-content: space-between;
    margin: 1rem 0 1.25rem;
    font-size: 1.3rem;
    font-weight: 500;
  }
  > * + * {
    margin-top: 0.75rem;
  }
  .total + * {
    margin-top: 0;
  }
`;
