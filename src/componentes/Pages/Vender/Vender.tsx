import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../../context/AuthContext';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { useTitulo } from '../../../hooks/useTitulo';
import { AvisoDemo, Boton, Campo, CabeceraPagina, Contenedor, Formulario, MensajeOk } from '../../common/ui';

const Disposicion = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
  gap: clamp(2rem, 6vw, 5rem);
  padding: 2rem 0 clamp(3rem, 7vw, 5rem);

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const Pasos = styled.ol`
  counter-reset: paso;
  display: grid;
  gap: 1.5rem;

  li {
    counter-increment: paso;
    display: grid;
    grid-template-columns: 2.5rem 1fr;
    gap: 0.5rem;
  }
  li::before {
    content: counter(paso);
    display: grid;
    place-items: center;
    width: 2.5rem;
    height: 2.5rem;
    background: var(--tinta);
    color: var(--oro);
    font-weight: 500;
  }
  strong {
    display: block;
    font-size: 1.15rem;
    font-weight: 500;
  }
  p {
    margin-top: 0.2rem;
    font-family: var(--fuente-texto);
    font-size: 1.08rem;
    line-height: 1.55;
    color: var(--suave);
  }
`;

interface Solicitud {
  id: string;
  fecha: string;
  nombre: string;
  email: string;
  web: string;
  disciplina: string;
  mensaje: string;
}

const disciplinas = ['Pintura', 'Dibujo y obra sobre papel', 'Escultura', 'Fotografía', 'Obra gráfica', 'Otra'];

const Vender: React.FC = () => {
  useTitulo('Vender mis obras');
  const { usuario } = useAuth();
  const [, setSolicitudes] = useLocalStorage<Solicitud[]>('galeryart:solicitudes', []);
  const [enviada, setEnviada] = useState(false);
  const [f, setF] = useState({
    nombre: usuario?.nombre ?? '',
    email: usuario?.email ?? '',
    web: '',
    disciplina: disciplinas[0],
    mensaje: '',
  });

  const cambiar = (campo: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF({ ...f, [campo]: e.target.value });

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    setSolicitudes((prev) => [...prev, { id: `s-${Date.now().toString(36)}`, fecha: new Date().toISOString(), ...f }]);
    setEnviada(true);
  };

  return (
    <Contenedor>
      <CabeceraPagina>
        <h1>Venda sus obras en GALERYART</h1>
        <p>Cuéntenos quién es y qué crea. Revisamos cada candidatura personalmente.</p>
      </CabeceraPagina>

      <Disposicion>
        <Pasos>
          <li>
            <div>
              <strong>Envíenos su candidatura</strong>
              <p>Con unas líneas sobre su trayectoria y un enlace a su portafolio, web o redes.</p>
            </div>
          </li>
          <li>
            <div>
              <strong>Revisamos su obra</strong>
              <p>Valoramos la calidad, la coherencia de la serie y si encaja con lo que buscan nuestros compradores.</p>
            </div>
          </li>
          <li>
            <div>
              <strong>Publicamos su obra</strong>
              <p>Acordamos precios y medidas, y su obra aparece en el catálogo con su propia cartela.</p>
            </div>
          </li>
        </Pasos>

        {enviada ? (
          <div role="status">
            <MensajeOk>
              Candidatura recibida. Gracias, {f.nombre.split(' ')[0]}: le escribiremos a {f.email} en cuanto la hayamos
              revisado.
            </MensajeOk>
            <AvisoDemo style={{ marginTop: '1rem' }}>
              Modo demostración: la candidatura se ha guardado solo en este navegador.
            </AvisoDemo>
          </div>
        ) : (
          <Formulario onSubmit={enviar}>
            <Campo>
              <label htmlFor="v-nombre">Nombre artístico o completo</label>
              <input id="v-nombre" required autoComplete="name" value={f.nombre} onChange={cambiar('nombre')} />
            </Campo>
            <Campo>
              <label htmlFor="v-email">Correo electrónico</label>
              <input id="v-email" type="email" required autoComplete="email" value={f.email} onChange={cambiar('email')} />
            </Campo>
            <Campo>
              <label htmlFor="v-web">Portafolio, web o Instagram (opcional)</label>
              <input id="v-web" value={f.web} onChange={cambiar('web')} />
            </Campo>
            <Campo>
              <label htmlFor="v-disc">Disciplina principal</label>
              <select id="v-disc" value={f.disciplina} onChange={cambiar('disciplina')}>
                {disciplinas.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </Campo>
            <Campo>
              <label htmlFor="v-msg">Cuéntenos sobre su obra</label>
              <textarea id="v-msg" required value={f.mensaje} onChange={cambiar('mensaje')} />
            </Campo>
            <Boton type="submit" $grande>
              Enviar candidatura
            </Boton>
          </Formulario>
        )}
      </Disposicion>
    </Contenedor>
  );
};

export default Vender;
