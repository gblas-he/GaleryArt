import styled, { keyframes } from 'styled-components';

const deslizar = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

const aparecer = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Fondo = styled.div`
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(15, 23, 29, 0.55);
  animation: ${aparecer} 0.2s ease-out;
`;

export const Panel = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 201;
  display: flex;
  flex-direction: column;
  width: min(430px, 100vw);
  background: #fff;
  box-shadow: -20px 0 40px -20px rgba(0, 0, 0, 0.4);
  animation: ${deslizar} 0.25s ease-out;
`;

export const Cabecera = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.1rem 1.25rem;
  border-bottom: 1px solid var(--linea);

  h2 {
    font-size: 1.25rem;
    font-weight: 500;
  }
  button {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    background: none;
    border: 0;
    font-size: 1.4rem;
    cursor: pointer;
  }
`;

export const Lista = styled.ul`
  flex: 1;
  overflow-y: auto;
  padding: 0 1.25rem;
`;

export const Linea = styled.li`
  display: grid;
  grid-template-columns: 84px 1fr;
  gap: 1rem;
  padding: 1.1rem 0;
  border-bottom: 1px solid var(--linea);
`;

export const Miniatura = styled.div`
  display: grid;
  place-items: center;
  width: 84px;
  height: 100px;
  background: var(--muro);
  padding: 10px;

  img {
    max-width: 100%;
    max-height: 100%;
    box-shadow: 0 6px 12px -6px rgba(15, 23, 29, 0.5);
  }
`;

export const Datos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;

  strong {
    font-weight: 500;
  }
  em {
    font-family: var(--fuente-texto);
    font-size: 1.05rem;
  }
  span {
    font-family: var(--fuente-texto);
    color: var(--suave);
    font-size: 0.95rem;
  }
  button {
    align-self: flex-start;
    margin-top: auto;
    padding: 0;
    background: none;
    border: 0;
    border-bottom: 1px solid currentColor;
    font-size: 0.9rem;
    color: var(--suave);
    cursor: pointer;
    &:hover {
      color: var(--texto);
    }
  }
`;

export const Pie = styled.footer`
  display: grid;
  gap: 0.75rem;
  padding: 1.25rem;
  border-top: 1px solid var(--linea);
  background: var(--muro);
`;

export const Subtotal = styled.p`
  display: flex;
  justify-content: space-between;
  font-size: 1.15rem;
  font-weight: 500;
`;

export const Nota = styled.p`
  font-size: 0.88rem;
  color: var(--suave);
`;

export const Vacio = styled.div`
  flex: 1;
  display: grid;
  align-content: center;
  justify-items: center;
  gap: 1rem;
  padding: 2rem;
  text-align: center;

  p {
    font-family: var(--fuente-texto);
    font-size: 1.15rem;
    color: var(--suave);
  }
`;
