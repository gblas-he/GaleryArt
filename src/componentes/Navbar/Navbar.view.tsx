import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiHeart, FiMenu, FiSearch, FiShoppingBag, FiUser, FiX } from 'react-icons/fi';
import logo from '../../assets/logo-galeryart.png';
import { useAuth } from '../../context/AuthContext';
import { useTienda } from '../../context/TiendaContext';
import {
  Acciones,
  Barra,
  BotonMenu,
  BotonVender,
  Buscador,
  BuscadorMovil,
  Cabecera,
  Enlace,
  Enlaces,
  EnlacesMovil,
  IconoBoton,
  IconoEnlace,
  Idioma,
  Insignia,
  Marca,
  PanelMovil,
  PuntoSesion,
} from './Navbar.styles';

const Navbar: React.FC = () => {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const { obrasCarrito, favoritos, abrirDrawer } = useTienda();
  const [q, setQ] = useState('');
  const [menuAbierto, setMenuAbierto] = useState(false);

  // El buscador refleja la búsqueda actual cuando estamos en /obras
  useEffect(() => {
    setQ(pathname === '/obras' ? new URLSearchParams(search).get('q') ?? '' : '');
  }, [pathname, search]);

  // El menú móvil se cierra al cambiar de página
  useEffect(() => setMenuAbierto(false), [pathname]);

  const buscar = (e: React.FormEvent) => {
    e.preventDefault();
    const texto = q.trim();
    navigate(texto ? `/obras?q=${encodeURIComponent(texto)}` : '/obras');
    setMenuAbierto(false);
  };

  const campoBusqueda = (
    <>
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Artista, categoría, tema..."
        aria-label="Buscar obras"
      />
      <button type="submit" aria-label="Buscar">
        <FiSearch aria-hidden />
      </button>
    </>
  );

  return (
    <Cabecera>
      <Barra aria-label="Principal">
        <Marca as={Link} to="/" aria-label="GALERYART, ir al inicio">
          <img src={logo} alt="" />
          <span>GALERYART</span>
        </Marca>

        <Enlaces>
          <Enlace to="/obras">Obras de arte</Enlace>
          <Enlace to="/descubrir">Descubrir</Enlace>
          <Enlace to="/artistas">Artistas</Enlace>
        </Enlaces>

        <Buscador role="search" onSubmit={buscar}>
          {campoBusqueda}
        </Buscador>

        <BotonVender to="/vender">Vender mis obras</BotonVender>

        <Acciones>
          <Idioma aria-label="Idioma: español. Moneda: euro">ES</Idioma>
          <IconoEnlace
            to="/cuenta"
            aria-label={usuario ? `Mi cuenta (${usuario.nombre})` : 'Iniciar sesión'}
            title={usuario ? 'Mi cuenta' : 'Iniciar sesión'}
          >
            <FiUser aria-hidden />
            {usuario && <PuntoSesion aria-hidden />}
          </IconoEnlace>
          <IconoEnlace to="/favoritos" aria-label={`Favoritos (${favoritos.length})`} title="Favoritos">
            <FiHeart aria-hidden />
            {favoritos.length > 0 && <Insignia aria-hidden>{favoritos.length}</Insignia>}
          </IconoEnlace>
          <IconoBoton type="button" onClick={abrirDrawer} aria-label={`Carrito (${obrasCarrito.length})`} title="Carrito">
            <FiShoppingBag aria-hidden />
            {obrasCarrito.length > 0 && <Insignia aria-hidden>{obrasCarrito.length}</Insignia>}
          </IconoBoton>
          <BotonMenu
            type="button"
            onClick={() => setMenuAbierto((v) => !v)}
            aria-expanded={menuAbierto}
            aria-controls="menu-movil"
            aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
          >
            {menuAbierto ? <FiX aria-hidden /> : <FiMenu aria-hidden />}
          </BotonMenu>
        </Acciones>
      </Barra>

      {menuAbierto && (
        <PanelMovil id="menu-movil">
          <BuscadorMovil role="search" onSubmit={buscar}>
            {campoBusqueda}
          </BuscadorMovil>
          <EnlacesMovil>
            <Enlace to="/obras">Obras de arte</Enlace>
            <Enlace to="/descubrir">Descubrir</Enlace>
            <Enlace to="/artistas">Artistas</Enlace>
            <Enlace to="/vender">Vender mis obras</Enlace>
          </EnlacesMovil>
        </PanelMovil>
      )}
    </Cabecera>
  );
};

export default Navbar;
