import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useTienda } from '../../../context/TiendaContext';
import { useTitulo } from '../../../hooks/useTitulo';
import { formatEUR, formatFecha } from '../../../utils/format';
import { AvisoDemo, Boton, Campo, CabeceraPagina, Contenedor, Formulario, MensajeError } from '../../common/ui';
import { Estrecho, Panel, Pedidos, Pestanas } from './Cuenta.styles';

type Modo = 'entrar' | 'crear';

const FormularioAcceso: React.FC = () => {
  const { registrar, iniciarSesion } = useAuth();
  const [modo, setModo] = useState<Modo>('entrar');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    const fallo = modo === 'crear' ? await registrar(nombre, email, password) : await iniciarSesion(email, password);
    setEnviando(false);
    setError(fallo);
  };

  return (
    <Estrecho>
      <Pestanas role="tablist" aria-label="Acceso">
        <button type="button" role="tab" aria-selected={modo === 'entrar'} onClick={() => { setModo('entrar'); setError(null); }}>
          Iniciar sesión
        </button>
        <button type="button" role="tab" aria-selected={modo === 'crear'} onClick={() => { setModo('crear'); setError(null); }}>
          Crear cuenta
        </button>
      </Pestanas>

      <Formulario onSubmit={enviar} noValidate>
        {modo === 'crear' && (
          <Campo>
            <label htmlFor="nombre">Nombre</label>
            <input id="nombre" autoComplete="name" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </Campo>
        )}
        <Campo>
          <label htmlFor="email">Correo electrónico</label>
          <input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Campo>
        <Campo>
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            autoComplete={modo === 'crear' ? 'new-password' : 'current-password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {modo === 'crear' && <small>Mínimo 8 caracteres.</small>}
        </Campo>
        {error && <MensajeError role="alert">{error}</MensajeError>}
        <Boton type="submit" $bloque $grande disabled={enviando}>
          {modo === 'crear' ? 'Crear cuenta' : 'Iniciar sesión'}
        </Boton>
        <AvisoDemo>
          Modo demostración: las cuentas se guardan solo en este navegador. No use una contraseña que utilice en otros
          servicios.
        </AvisoDemo>
      </Formulario>
    </Estrecho>
  );
};

const Cuenta: React.FC = () => {
  const { usuario, cerrarSesion } = useAuth();
  const { pedidos, favoritos, obrasCarrito } = useTienda();
  useTitulo(usuario ? 'Mi cuenta' : 'Iniciar sesión');

  const misPedidos = pedidos.filter((p) => p.usuarioId === usuario?.id);

  return (
    <Contenedor>
      <CabeceraPagina>
        <h1>{usuario ? `Hola, ${usuario.nombre.split(' ')[0]}` : 'Su cuenta'}</h1>
        <p>
          {usuario
            ? 'Aquí tiene sus datos y sus pedidos.'
            : 'Inicie sesión o cree una cuenta para guardar sus datos y seguir sus pedidos.'}
        </p>
      </CabeceraPagina>

      {!usuario ? (
        <FormularioAcceso />
      ) : (
        <Panel>
          <section aria-label="Mis datos">
            <h2>Mis datos</h2>
            <dl>
              <dt>Nombre</dt>
              <dd>{usuario.nombre}</dd>
              <dt>Correo</dt>
              <dd>{usuario.email}</dd>
              <dt>Cliente desde</dt>
              <dd>{formatFecha(usuario.creadoEn)}</dd>
            </dl>
            <div className="enlaces">
              <Boton as={Link} to="/favoritos" $variante="secundario">
                Favoritos ({favoritos.length})
              </Boton>
              <Boton as={Link} to="/carrito" $variante="secundario">
                Carrito ({obrasCarrito.length})
              </Boton>
              <Boton type="button" onClick={cerrarSesion}>
                Cerrar sesión
              </Boton>
            </div>
          </section>

          <section aria-label="Mis pedidos">
            <h2>Mis pedidos</h2>
            {misPedidos.length === 0 ? (
              <p style={{ fontFamily: 'var(--fuente-texto)', fontSize: '1.1rem', color: 'var(--suave)' }}>
                Todavía no ha hecho ningún pedido. <Link to="/obras">Explorar obras</Link>
              </p>
            ) : (
              <Pedidos>
                {misPedidos.map((p) => (
                  <li key={p.numero}>
                    <div className="cabeza">
                      <span>{p.numero}</span>
                      <span>{formatEUR(p.total)}</span>
                    </div>
                    <p className="fecha">{formatFecha(p.fecha)}</p>
                    <ul>
                      {p.lineas.map((l) => (
                        <li key={l.obraId} style={{ border: 0, padding: '0.1rem 0' }}>
                          <em>{l.titulo}</em>, {l.artista}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </Pedidos>
            )}
          </section>
        </Panel>
      )}
    </Contenedor>
  );
};

export default Cuenta;
