import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useTienda } from '../../../context/TiendaContext';
import { useTitulo } from '../../../hooks/useTitulo';
import { DatosEnvio } from '../../../types';
import { formatEUR } from '../../../utils/format';
import { AvisoDemo, Boton, Campo, CabeceraPagina, Contenedor, EstadoVacio, FilaCampos, Formulario } from '../../common/ui';
import { Detalle, Disposicion, Fila, Miniatura, PrecioFila, Resumen } from './Carrito.styles';
import { artistaPorId } from '../../../data/artistas';

const paises = ['España', 'Portugal', 'Francia', 'Italia', 'Alemania'];

const Checkout: React.FC = () => {
  useTitulo('Finalizar compra');
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const { obrasCarrito, totalCarrito, confirmarPedido } = useTienda();
  const [datos, setDatos] = useState<DatosEnvio>({
    nombre: usuario?.nombre ?? '',
    email: usuario?.email ?? '',
    telefono: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    pais: 'España',
  });

  if (obrasCarrito.length === 0) {
    return (
      <Contenedor>
        <EstadoVacio>
          <h2>No hay nada que comprar todavía</h2>
          <p>Añada alguna obra al carrito para poder finalizar la compra.</p>
          <Boton as={Link} to="/obras">
            Explorar obras
          </Boton>
        </EstadoVacio>
      </Contenedor>
    );
  }

  const cambiar = (campo: keyof DatosEnvio) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setDatos({ ...datos, [campo]: e.target.value });

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    const pedido = confirmarPedido(datos, usuario?.id);
    navigate(`/pedido/confirmado/${pedido.numero}`, { replace: true });
  };

  return (
    <Contenedor>
      <CabeceraPagina>
        <h1>Finalizar compra</h1>
        <p>Indique adónde enviamos su pedido. Le confirmaremos los datos antes de preparar el envío.</p>
      </CabeceraPagina>

      <Disposicion>
        <Formulario onSubmit={enviar}>
          <FilaCampos>
            <Campo>
              <label htmlFor="nombre">Nombre y apellidos</label>
              <input id="nombre" required autoComplete="name" value={datos.nombre} onChange={cambiar('nombre')} />
            </Campo>
            <Campo>
              <label htmlFor="email">Correo electrónico</label>
              <input id="email" type="email" required autoComplete="email" value={datos.email} onChange={cambiar('email')} />
            </Campo>
          </FilaCampos>
          <Campo>
            <label htmlFor="telefono">Teléfono</label>
            <input id="telefono" type="tel" required autoComplete="tel" value={datos.telefono} onChange={cambiar('telefono')} />
            <small>Lo usará la empresa de transporte para coordinar la entrega.</small>
          </Campo>
          <Campo>
            <label htmlFor="direccion">Dirección</label>
            <input id="direccion" required autoComplete="street-address" value={datos.direccion} onChange={cambiar('direccion')} />
          </Campo>
          <FilaCampos>
            <Campo>
              <label htmlFor="ciudad">Ciudad</label>
              <input id="ciudad" required autoComplete="address-level2" value={datos.ciudad} onChange={cambiar('ciudad')} />
            </Campo>
            <Campo>
              <label htmlFor="cp">Código postal</label>
              <input id="cp" required autoComplete="postal-code" value={datos.codigoPostal} onChange={cambiar('codigoPostal')} />
            </Campo>
          </FilaCampos>
          <Campo>
            <label htmlFor="pais">País</label>
            <select id="pais" value={datos.pais} onChange={cambiar('pais')} autoComplete="country-name">
              {paises.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </Campo>

          <AvisoDemo>
            Modo demostración: al confirmar no se realiza ningún cobro ni se envía ningún correo. El pedido se guarda
            solo en este navegador.
          </AvisoDemo>
          <Boton type="submit" $grande>
            Confirmar pedido de {formatEUR(totalCarrito)}
          </Boton>
        </Formulario>

        <Resumen aria-label="Su pedido">
          <h2>Su pedido</h2>
          <ul>
            {obrasCarrito.map((o) => (
              <Fila key={o.id} style={{ gridTemplateColumns: '64px 1fr auto', padding: '0.75rem 0' }}>
                <Miniatura style={{ padding: 6 }}>
                  <img src={o.imagen} alt="" />
                </Miniatura>
                <Detalle>
                  <strong>{artistaPorId(o.artistaId)?.nombre}</strong>
                  <em>{o.titulo}</em>
                </Detalle>
                <PrecioFila style={{ fontSize: '1rem' }}>{formatEUR(o.precio)}</PrecioFila>
              </Fila>
            ))}
          </ul>
          <dl>
            <dt>Envío asegurado</dt>
            <dd>Incluido</dd>
          </dl>
          <p className="total">
            <span>Total</span>
            <span>{formatEUR(totalCarrito)}</span>
          </p>
        </Resumen>
      </Disposicion>
    </Contenedor>
  );
};

export default Checkout;
