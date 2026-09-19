import React from 'react';
import { Link } from 'react-router-dom';
import { useTitulo } from '../../../hooks/useTitulo';
import { Boton, Contenedor, EstadoVacio } from '../../common/ui';

interface Props {
  titulo?: string;
  texto?: string;
}

const NoEncontrada: React.FC<Props> = ({
  titulo = 'No encontramos esta página',
  texto = 'Puede que el enlace haya cambiado o que la obra ya no esté en la galería.',
}) => {
  useTitulo('Página no encontrada');
  return (
    <Contenedor>
      <EstadoVacio>
        <h2>{titulo}</h2>
        <p>{texto}</p>
        <Boton as={Link} to="/obras">
          Ver las obras de arte
        </Boton>
      </EstadoVacio>
    </Contenedor>
  );
};

export default NoEncontrada;
