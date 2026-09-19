import styled from 'styled-components';

export const Cuerpo = styled.div`
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr);
  gap: clamp(1.5rem, 4vw, 3.5rem);
  padding: 2rem 0 clamp(3rem, 7vw, 5rem);

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
`;

export const BotonFiltros = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.7rem 1rem;
  background: #fff;
  border: 1px solid var(--texto);
  border-radius: 2px;
  font-weight: 500;
  cursor: pointer;

  @media (max-width: 860px) {
    display: flex;
  }
`;

export const PanelFiltros = styled.aside<{ $abierto: boolean }>`
  align-self: start;
  position: sticky;
  top: calc(var(--alto-nav) + 1rem);
  max-height: calc(100vh - var(--alto-nav) - 2rem);
  overflow-y: auto;
  padding-right: 0.5rem;

  @media (max-width: 860px) {
    display: ${(p) => (p.$abierto ? 'block' : 'none')};
    position: static;
    max-height: none;
    padding: 1rem 1.1rem;
    background: var(--muro);
  }
`;

export const Grupo = styled.fieldset`
  margin: 0 0 1.5rem;
  padding: 0;
  border: 0;

  legend {
    padding: 0 0 0.6rem;
    font-size: 1rem;
    font-weight: 500;
  }
`;

export const Opcion = styled.label`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.3rem 0;
  font-family: var(--fuente-texto);
  font-size: 1.05rem;
  cursor: pointer;

  input {
    width: 1.05rem;
    height: 1.05rem;
    margin: 0;
    accent-color: var(--tinta);
  }
`;

export const BarraResultados = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
  margin-bottom: 1.25rem;

  p {
    font-family: var(--fuente-texto);
    font-size: 1.1rem;
    color: var(--suave);
  }
  label {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.95rem;
  }
  select {
    padding: 0.5rem 0.7rem;
    background: #fff;
    border: 1px solid #aab1b8;
    border-radius: 2px;
  }
`;

export const Etiquetas = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

export const Etiqueta = styled.li`
  button {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.35rem 0.7rem;
    background: var(--muro);
    border: 1px solid var(--linea);
    border-radius: 999px;
    font-size: 0.9rem;
    cursor: pointer;
    &:hover {
      border-color: var(--texto);
    }
  }
`;
