import styled from 'styled-components';

export const Ventana = styled.div`
  position: relative;
`;

export const Pista = styled.ul`
  display: flex;
  gap: clamp(1rem, 2.5vw, 1.75rem);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-left: 0;
  scrollbar-width: none;
  padding-bottom: 0.5rem;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Elemento = styled.li`
  flex: 0 0 min(300px, 76vw);
  scroll-snap-align: start;
`;

export const Flecha = styled.button<{ $lado: 'izq' | 'der' }>`
  position: absolute;
  top: calc(50% - 3.5rem);
  ${(p) => (p.$lado === 'izq' ? 'left: -1.25rem;' : 'right: -1.25rem;')}
  z-index: 3;
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  background: var(--tinta);
  color: #fff;
  border: 0;
  border-radius: 50%;
  font-size: 1.4rem;
  cursor: pointer;
  box-shadow: 0 6px 18px -6px rgba(0, 0, 0, 0.5);
  transition: background 0.15s ease, opacity 0.15s ease;

  &:hover:not(:disabled) {
    background: var(--tinta-2);
  }
  &:disabled {
    opacity: 0;
    pointer-events: none;
  }
  &:focus-visible {
    outline-color: var(--oro);
  }

  @media (max-width: 1360px) {
    ${(p) => (p.$lado === 'izq' ? 'left: 0.25rem;' : 'right: 0.25rem;')}
  }
`;
