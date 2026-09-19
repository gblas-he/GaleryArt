import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Cabecera = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--tinta);
  color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  a:focus-visible,
  button:focus-visible,
  input:focus-visible {
    outline-color: var(--oro);
  }
`;

export const Barra = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.75rem;
  width: 100%;
  max-width: var(--ancho-max);
  height: var(--alto-nav);
  margin: 0 auto;
  padding: 0 var(--gutter);

  @media (max-width: 1080px) {
    gap: 0.5rem;
  }
`;

export const Marca = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: none;
  text-decoration: none;
  color: #fff;

  img {
    height: 44px;
    width: auto;
  }
  span {
    font-size: 1.05rem;
    font-weight: 500;
    letter-spacing: 0.28em;
  }
  @media (max-width: 520px) {
    gap: 0.5rem;
    img {
      height: 38px;
    }
    span {
      font-size: 0.88rem;
      letter-spacing: 0.16em;
    }
  }
  @media (max-width: 360px) {
    span {
      display: none;
    }
  }
`;

export const Enlaces = styled.div`
  display: flex;
  gap: 1.5rem;
  flex: none;

  @media (max-width: 1080px) {
    display: none;
  }
`;

export const Enlace = styled(NavLink)`
  padding: 0.3rem 0;
  color: rgba(255, 255, 255, 0.86);
  text-decoration: none;
  font-size: 1rem;
  border-bottom: 2px solid transparent;

  &:hover {
    color: #fff;
  }
  &.active {
    color: #fff;
    border-bottom-color: var(--oro);
  }
`;

export const Buscador = styled.form`
  position: relative;
  flex: 1 1 auto;
  max-width: 340px;
  margin-left: auto;

  input {
    width: 100%;
    height: 40px;
    padding: 0 2.5rem 0 0.9rem;
    background: #fff;
    color: var(--texto);
    border: 1px solid transparent;
    border-radius: 2px;
    font-size: 0.98rem;
  }
  input::placeholder {
    color: #6b747c;
  }
  button {
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 40px;
    display: grid;
    place-items: center;
    background: none;
    border: 0;
    color: var(--tinta);
    cursor: pointer;
  }

  @media (max-width: 1080px) {
    display: none;
  }
`;

export const BotonVender = styled(NavLink)`
  flex: none;
  padding: 0.55rem 1.1rem;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 2px;
  text-decoration: none;
  font-size: 0.98rem;
  font-weight: 500;
  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    background: #fff;
    color: var(--tinta);
  }
  @media (max-width: 1080px) {
    display: none;
  }
`;

export const Acciones = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-left: 0.25rem;

  @media (max-width: 1080px) {
    margin-left: auto;
  }
`;

export const Idioma = styled.span`
  padding: 0 0.6rem;
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.75);
  @media (max-width: 1080px) {
    display: none;
  }
`;

const iconoBase = `
  position: relative;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  background: none;
  border: 0;
  border-radius: 2px;
  color: #fff;
  cursor: pointer;
  text-decoration: none;
  font-size: 1.35rem;
  &:hover {
    color: var(--oro);
  }
  @media (max-width: 520px) {
    width: 40px;
    font-size: 1.25rem;
  }
`;

export const IconoEnlace = styled(NavLink)`
  ${iconoBase}
`;

export const IconoBoton = styled.button`
  ${iconoBase}
`;

export const Insignia = styled.span`
  position: absolute;
  top: 3px;
  right: 1px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  display: grid;
  place-items: center;
  background: var(--oro);
  color: var(--tinta);
  border-radius: 9px;
  font-size: 0.72rem;
  font-weight: 600;
  line-height: 1;
`;

export const PuntoSesion = styled.span`
  position: absolute;
  top: 9px;
  right: 8px;
  width: 9px;
  height: 9px;
  background: var(--oro);
  border: 2px solid var(--tinta);
  border-radius: 50%;
`;

export const BotonMenu = styled(IconoBoton)`
  display: none;
  @media (max-width: 1080px) {
    display: grid;
  }
`;

export const PanelMovil = styled.div`
  display: none;
  @media (max-width: 1080px) {
    display: block;
    padding: 1rem var(--gutter) 1.5rem;
    background: var(--tinta);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

export const EnlacesMovil = styled.div`
  display: grid;
  margin: 0.75rem 0 1.25rem;

  a {
    padding: 0.85rem 0;
    color: #fff;
    text-decoration: none;
    font-size: 1.15rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  a.active {
    color: var(--oro);
  }
`;

export const BuscadorMovil = styled(Buscador)`
  display: none;
  @media (max-width: 1080px) {
    display: block;
    max-width: none;
    margin: 0;
  }
`;
