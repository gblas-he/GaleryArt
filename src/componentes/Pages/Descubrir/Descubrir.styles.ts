import styled from 'styled-components';

export const Preferencias = styled.section`
  padding: 2rem 0 2.25rem;
  border-bottom: 1px solid var(--linea);
`;

export const Grupos = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.75rem 2rem;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const Grupo = styled.fieldset`
  margin: 0;
  padding: 0;
  border: 0;
  min-width: 0;

  legend {
    padding: 0 0 0.7rem;
    font-size: 1.05rem;
    font-weight: 500;
  }
`;

export const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const Chip = styled.button`
  padding: 0.5rem 0.9rem;
  background: #fff;
  color: var(--texto);
  border: 1px solid #aab1b8;
  border-radius: 2px;
  font-size: 0.98rem;
  cursor: pointer;
  transition: background 0.12s ease, color 0.12s ease, border-color 0.12s ease;

  &:hover {
    border-color: var(--texto);
  }
  &[aria-pressed='true'] {
    background: var(--tinta);
    color: #fff;
    border-color: var(--tinta);
  }
`;

export const PieFiltros = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem 1.5rem;
  margin-top: 1.75rem;

  p {
    font-family: var(--fuente-texto);
    color: var(--suave);
    font-size: 1.02rem;
  }
`;

export const Muro = styled.section`
  background: var(--muro);
  padding: clamp(2rem, 5vw, 3.5rem) 0 clamp(2.5rem, 6vw, 4.5rem);
`;

export const TituloMuro = styled.div`
  margin-bottom: 2rem;

  h2 {
    font-size: clamp(1.6rem, 3vw, 2.1rem);
    font-weight: 400;
  }
  p {
    margin-top: 0.4rem;
    font-family: var(--fuente-texto);
    font-size: 1.1rem;
    color: var(--suave);
  }
`;

/** Colgado "de salón": las obras conservan su proporción y se reparten en columnas. */
export const Colgado = styled.ul`
  column-width: 250px;
  column-gap: clamp(1.75rem, 4vw, 3rem);

  li {
    break-inside: avoid;
    margin-bottom: 2.75rem;
  }
`;

export const Separador = styled.div`
  margin: 1rem 0 2rem;
  border-top: 1px solid var(--linea);
`;
