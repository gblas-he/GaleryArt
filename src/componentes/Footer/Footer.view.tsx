import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaPinterest, FaTwitter } from 'react-icons/fa';
import {
  Bloque,
  Columnas,
  Envoltorio,
  EnlaceExterno,
  EnlacePie,
  Idioma,
  Legal,
  Pie,
  Red,
  Redes,
  Titulo,
} from './Footer.styles';

const Footer: React.FC = () => (
  <Pie>
    <Envoltorio>
      <Columnas>
        <Bloque>
          <Titulo>Acerca de GALERYART</Titulo>
          <EnlacePie to="/info/acerca-de">Acerca de nosotros</EnlacePie>
          <EnlacePie to="/artistas">Nuestros artistas</EnlacePie>
          <EnlacePie to="/info/empleos">Empleos</EnlacePie>
          <EnlacePie to="/info/revista">Revista</EnlacePie>
        </Bloque>

        <Bloque>
          <Titulo>Servicio de atención al cliente</Titulo>
          <EnlacePie to="/info/contacto">Contacte con nosotros</EnlacePie>
          <EnlacePie to="/info/envio">Envío</EnlacePie>
          <EnlacePie to="/info/devoluciones">Política de devoluciones</EnlacePie>
          <EnlacePie to="/info/testimonios">Testimonios de clientes</EnlacePie>
          <EnlacePie to="/cuenta">Mi cuenta</EnlacePie>
          <EnlacePie to="/info/faq">FAQ</EnlacePie>
          <EnlaceExterno href="tel:+34911237781">+34 911 23 77 81</EnlaceExterno>
        </Bloque>

        <Bloque>
          <Titulo>Servicios artísticos</Titulo>
          <EnlacePie to="/info/asesoramiento">Asesoramiento gratis sobre arte</EnlacePie>
          <EnlacePie to="/info/encargos">Encargue obras a un artista</EnlacePie>
          <EnlacePie to="/info/tarjeta-regalo">Ofrecer una tarjeta regalo</EnlacePie>
          <EnlacePie to="/info/trade">Trade</EnlacePie>
          <EnlacePie to="/info/galerias-espana">Galerías de arte en España</EnlacePie>
        </Bloque>

        <Bloque>
          <Titulo>Para creadores</Titulo>
          <EnlacePie to="/cuenta">Inicie sesión como creador</EnlacePie>
          <EnlacePie to="/vender">Únase a GALERYART como artista</EnlacePie>
        </Bloque>

        <Bloque>
          <Titulo>Síganos</Titulo>
          <Redes>
            <Red href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook aria-hidden />
            </Red>
            <Red href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter aria-hidden />
            </Red>
            <Red href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram aria-hidden />
            </Red>
            <Red href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
              <FaPinterest aria-hidden />
            </Red>
          </Redes>
          <Idioma>Español | EUR</Idioma>
        </Bloque>
      </Columnas>

      <Legal>
        <span>© {new Date().getFullYear()} GALERYART</span>
        <Link to="/info/privacidad">Centro de privacidad</Link>
        <Link to="/info/avisos-legales">Avisos legales</Link>
        <Link to="/info/terminos">Términos y condiciones generales</Link>
      </Legal>
    </Envoltorio>
  </Pie>
);

export default Footer;
