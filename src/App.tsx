import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import CartDrawer from './componentes/CartDrawer/CartDrawer';
import Footer from './componentes/Footer/Footer.view';
import ScrollToTop from './componentes/Layout/ScrollToTop';
import Navbar from './componentes/Navbar/Navbar.view';
import ArtistaDetalle from './componentes/Pages/Artistas/ArtistaDetalle';
import Artistas from './componentes/Pages/Artistas/Artistas';
import Carrito from './componentes/Pages/Carrito/Carrito';
import Checkout from './componentes/Pages/Carrito/Checkout';
import PedidoConfirmado from './componentes/Pages/Carrito/PedidoConfirmado';
import Cuenta from './componentes/Pages/Cuenta/Cuenta';
import Descubrir from './componentes/Pages/Descubrir/Descubrir';
import Favoritos from './componentes/Pages/Favoritos/Favoritos';
import Home from './componentes/Pages/Home/Home';
import Info from './componentes/Pages/Info/Info';
import NoEncontrada from './componentes/Pages/NoEncontrada/NoEncontrada';
import ObraDetalle from './componentes/Pages/ObraDetalle/ObraDetalle';
import Obras from './componentes/Pages/Obras/Obras';
import Vender from './componentes/Pages/Vender/Vender';

/*
 * El pie de página ya no es "position: fixed" (era lo que tapaba la parte de abajo).
 * Ahora la página es una columna: la barra arriba, el contenido crece y el pie queda
 * siempre al final, tanto si hay poco contenido como si hay mucho.
 */
const Pagina = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Principal = styled.main`
  flex: 1 0 auto;
  outline: none;
`;

const SaltarAlContenido = styled.a`
  position: absolute;
  left: 0.5rem;
  top: -4rem;
  z-index: 400;
  padding: 0.6rem 1rem;
  background: #fff;
  color: var(--texto);
  &:focus {
    top: 0.5rem;
  }
`;

const App: React.FC = () => (
  <Pagina>
    <SaltarAlContenido href="#contenido">Saltar al contenido</SaltarAlContenido>
    <ScrollToTop />
    <Navbar />
    <Principal id="contenido" tabIndex={-1}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/obras" element={<Obras />} />
        <Route path="/obras/:id" element={<ObraDetalle />} />
        <Route path="/descubrir" element={<Descubrir />} />
        <Route path="/artistas" element={<Artistas />} />
        <Route path="/artistas/:id" element={<ArtistaDetalle />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/pedido" element={<Checkout />} />
        <Route path="/pedido/confirmado/:numero" element={<PedidoConfirmado />} />
        <Route path="/cuenta" element={<Cuenta />} />
        <Route path="/vender" element={<Vender />} />
        <Route path="/info/:slug" element={<Info />} />
        {/* Ruta antigua */}
        <Route path="/galeria" element={<Navigate to="/obras" replace />} />
        <Route path="*" element={<NoEncontrada />} />
      </Routes>
    </Principal>
    <Footer />
    <CartDrawer />
  </Pagina>
);

export default App;
