import styled from 'styled-components';

export const Estrecho = styled.div`
  max-width: 30rem;
  padding: 2rem 0 clamp(3rem, 7vw, 5rem);
`;

export const Pestanas = styled.div`
  display: flex;
  gap: 1.75rem;
  margin-bottom: 1.75rem;
  border-bottom: 1px solid var(--linea);

  button {
    padding: 0.6rem 0;
    background: none;
    border: 0;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    font-size: 1.1rem;
    color: var(--suave);
    cursor: pointer;
  }
  button[aria-selected='true'] {
    color: var(--texto);
    font-weight: 500;
    border-bottom-color: var(--texto);
  }
`;

export const Panel = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
  gap: clamp(1.5rem, 5vw, 4rem);
  padding: 2rem 0 clamp(3rem, 7vw, 5rem);

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }

  h2 {
    margin-bottom: 1rem;
    font-size: 1.4rem;
    font-weight: 500;
  }
  dl {
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: 0.5rem 1.5rem;
    font-family: var(--fuente-texto);
    font-size: 1.08rem;
    margin-bottom: 1.5rem;
  }
  dt {
    color: var(--suave);
  }
  .enlaces {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
`;

export const Pedidos = styled.ul`
  border-top: 1px solid var(--texto);

  li {
    padding: 1.1rem 0;
    border-bottom: 1px solid var(--linea);
  }
  .cabeza {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    font-weight: 500;
  }
  .fecha {
    font-family: var(--fuente-texto);
    color: var(--suave);
  }
  ul {
    margin-top: 0.5rem;
    font-family: var(--fuente-texto);
    font-size: 1.05rem;
  }
`;
