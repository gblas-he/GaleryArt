import styled, { css } from 'styled-components';

export const Contenedor = styled.div`
  width: 100%;
  max-width: var(--ancho-max);
  margin: 0 auto;
  padding: 0 var(--gutter);
`;

export const Seccion = styled.section<{ $muro?: boolean }>`
  padding: clamp(2.5rem, 6vw, 4.5rem) 0;
  background: ${(p) => (p.$muro ? 'var(--muro)' : 'transparent')};
`;

/* ---------- Botones ---------- */
type Variante = 'primario' | 'secundario' | 'claro' | 'contorno-claro';

const variantes: Record<Variante, ReturnType<typeof css>> = {
  primario: css`
    background: var(--tinta);
    color: #fff;
    border-color: var(--tinta);
    &:hover:not(:disabled) {
      background: var(--tinta-2);
    }
  `,
  secundario: css`
    background: transparent;
    color: var(--texto);
    border-color: var(--texto);
    &:hover:not(:disabled) {
      background: var(--texto);
      color: #fff;
    }
  `,
  claro: css`
    background: #fff;
    color: var(--tinta);
    border-color: #fff;
    &:hover:not(:disabled) {
      background: var(--oro);
      border-color: var(--oro);
    }
    &:focus-visible {
      outline-color: var(--oro);
    }
  `,
  'contorno-claro': css`
    background: transparent;
    color: #fff;
    border-color: rgba(255, 255, 255, 0.7);
    &:hover:not(:disabled) {
      background: #fff;
      color: var(--tinta);
    }
    &:focus-visible {
      outline-color: var(--oro);
    }
  `,
};

export const Boton = styled.button<{ $variante?: Variante; $bloque?: boolean; $grande?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: ${(p) => (p.$grande ? '0.95rem 1.8rem' : '0.65rem 1.25rem')};
  width: ${(p) => (p.$bloque ? '100%' : 'auto')};
  border: 1px solid transparent;
  border-radius: 2px;
  font-family: var(--fuente-ui);
  font-size: ${(p) => (p.$grande ? '1.05rem' : '0.98rem')};
  font-weight: 500;
  letter-spacing: 0.02em;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
  ${(p: { $variante?: Variante }) => variantes[p.$variante ?? 'primario']}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

/** Enlace o botón con aspecto de texto subrayado */
export const BotonTexto = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0;
  background: none;
  border: 0;
  border-bottom: 1px solid currentColor;
  font-family: var(--fuente-ui);
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--texto);
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: var(--oro-texto);
  }
`;

/* ---------- Cabeceras de página ---------- */
export const CabeceraPagina = styled.header`
  padding: clamp(2rem, 5vw, 3.5rem) 0 clamp(1.25rem, 3vw, 2rem);
  border-bottom: 1px solid var(--linea);

  h1 {
    font-size: clamp(2rem, 4.5vw, 3rem);
    font-weight: 400;
    letter-spacing: 0.005em;
  }
  p {
    margin-top: 0.75rem;
    max-width: 60ch;
    font-family: var(--fuente-texto);
    font-size: 1.15rem;
    line-height: 1.55;
    color: var(--suave);
  }
`;

export const Migas = styled.nav`
  padding-top: 1.25rem;
  font-size: 0.9rem;
  color: var(--suave);
  a {
    text-decoration: none;
    &:hover {
      color: var(--texto);
      text-decoration: underline;
    }
  }
  span[aria-hidden] {
    margin: 0 0.4rem;
  }
`;

/* ---------- Rejilla de obras ---------- */
export const RejillaObras = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr));
  gap: 2.75rem 1.75rem;
`;

/* ---------- Estados vacíos ---------- */
export const EstadoVacio = styled.div`
  padding: clamp(2.5rem, 8vw, 5rem) 1rem;
  max-width: 34rem;
  margin: 0 auto;
  text-align: center;

  h2 {
    font-size: 1.6rem;
    font-weight: 400;
  }
  p {
    margin: 0.75rem 0 1.5rem;
    font-family: var(--fuente-texto);
    font-size: 1.1rem;
    color: var(--suave);
  }
`;

/* ---------- Formularios ---------- */
export const Formulario = styled.form`
  display: grid;
  gap: 1.1rem;
`;

export const Campo = styled.div`
  display: grid;
  gap: 0.35rem;

  label,
  legend {
    font-size: 0.92rem;
    font-weight: 500;
  }
  input,
  select,
  textarea {
    width: 100%;
    padding: 0.7rem 0.8rem;
    background: #fff;
    border: 1px solid #aab1b8;
    border-radius: 2px;
    font-size: 1rem;
  }
  textarea {
    min-height: 8rem;
    resize: vertical;
  }
  input:focus-visible,
  select:focus-visible,
  textarea:focus-visible {
    outline: 2px solid var(--oro-texto);
    outline-offset: 0;
    border-color: var(--oro-texto);
  }
  small {
    color: var(--suave);
    font-size: 0.85rem;
  }
`;

export const FilaCampos = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.1rem;
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const MensajeError = styled.p`
  padding: 0.7rem 0.9rem;
  border-left: 3px solid var(--rojo);
  background: #fbeceb;
  color: #7d1d18;
  font-size: 0.95rem;
`;

export const MensajeOk = styled.p`
  padding: 0.7rem 0.9rem;
  border-left: 3px solid var(--oro-texto);
  background: #f6f0e3;
  font-size: 0.95rem;
`;

export const AvisoDemo = styled.p`
  padding: 0.7rem 0.9rem;
  border: 1px dashed #aab1b8;
  font-size: 0.9rem;
  color: var(--suave);
`;

/* ---------- Monograma de artista ---------- */
export const Monograma = styled.span<{ $tam?: number }>`
  display: inline-grid;
  place-items: center;
  flex: none;
  width: ${(p) => p.$tam ?? 64}px;
  height: ${(p) => p.$tam ?? 64}px;
  background: var(--tinta);
  color: var(--oro);
  font-size: ${(p) => (p.$tam ?? 64) * 0.36}px;
  font-weight: 400;
  letter-spacing: 0.06em;
`;
