import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useTienda } from '../../../context/TiendaContext';
import { useTitulo } from '../../../hooks/useTitulo';
import { formatEUR, formatFecha } from '../../../utils/format';
import { Boton, CabeceraPagina, Contenedor } from '../../common/ui';
import NoEncontrada from '../NoEncontrada/NoEncontrada';
import { Detalle, Fila, Lista } from './Carrito.styles';

const PedidoConfirmado: React.FC = () => {
  useTitulo('Pedido recibido');
  const { numero } = useParams();
  const { pedidos } = useTienda();
  const { usuario } = useAuth();
  const pedido = pedidos.find((p) => p.numero === numero);

  if (!pedido) return <NoEncontrada titulo="No encontramos este pedido" />;

  return (
    <Contenedor>
      <CabeceraPagina>
        <h1>Gracias, {pedido.envio.nombre.split(' ')[0]}</h1>
        <p>
          Hemos registrado su pedido {pedido.numero} el {formatFecha(pedido.fecha)}. Lo enviaremos a {pedido.envio.direccion},{' '}
          {pedido.envio.codigoPostal} {pedido.envio.ciudad} ({pedido.envio.pais}).
        </p>
      </CabeceraPagina>

      <div style={{ maxWidth: 640, padding: '2rem 0 4rem' }}>
        <Lista>
          {pedido.lineas.map((l) => (
            <Fila key={l.obraId} style={{ gridTemplateColumns: '1fr auto' }}>
              <Detalle>
                <strong>{l.artista}</strong>
                <em>{l.titulo}</em>
              </Detalle>
              <span>{formatEUR(l.precio)}</span>
            </Fila>
          ))}
        </Lista>
        <p style={{ display: 'flex', justifyContent: 'space-between', margin: '1.25rem 0 2rem', fontSize: '1.3rem', fontWeight: 500 }}>
          <span>Total</span>
          <span>{formatEUR(pedido.total)}</span>
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <Boton as={Link} to="/obras">
            Seguir explorando
          </Boton>
          {usuario && (
            <Boton as={Link} to="/cuenta" $variante="secundario">
              Ver mis pedidos
            </Boton>
          )}
        </div>
      </div>
    </Contenedor>
  );
};

export default PedidoConfirmado;
