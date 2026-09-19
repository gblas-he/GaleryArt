import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { faq, infoPorSlug } from '../../../data/info';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { useTitulo } from '../../../hooks/useTitulo';
import { AvisoDemo, Boton, Campo, CabeceraPagina, Contenedor, Formulario, MensajeOk } from '../../common/ui';
import NoEncontrada from '../NoEncontrada/NoEncontrada';

const Texto = styled.div`
  max-width: 44rem;
  padding: 2rem 0 clamp(3rem, 7vw, 5rem);

  h2 {
    margin: 2rem 0 0.6rem;
    font-size: 1.4rem;
    font-weight: 500;
  }
  h2:first-child {
    margin-top: 0;
  }
  p {
    margin-bottom: 1rem;
    font-family: var(--fuente-texto);
    font-size: 1.15rem;
    line-height: 1.65;
  }
`;

const Provisional = styled.p`
  margin-bottom: 1.5rem;
  padding: 0.7rem 0.9rem;
  border-left: 3px solid var(--oro-texto);
  background: #f6f0e3;
  font-size: 0.95rem;
`;

const Pregunta = styled.details`
  border-top: 1px solid var(--linea);

  &:last-of-type {
    border-bottom: 1px solid var(--linea);
  }
  summary {
    padding: 1rem 0;
    font-size: 1.1rem;
    font-weight: 500;
    cursor: pointer;
  }
  p {
    padding-bottom: 1rem;
    color: var(--suave);
  }
`;

interface Mensaje {
  id: string;
  fecha: string;
  nombre: string;
  email: string;
  mensaje: string;
}

const FormularioContacto: React.FC = () => {
  const [, setMensajes] = useLocalStorage<Mensaje[]>('galeryart:mensajes', []);
  const [enviado, setEnviado] = useState(false);
  const [f, setF] = useState({ nombre: '', email: '', mensaje: '' });

  if (enviado) {
    return (
      <div role="status">
        <MensajeOk>Mensaje recibido. Gracias, {f.nombre.split(' ')[0]}: le responderemos a {f.email}.</MensajeOk>
        <AvisoDemo style={{ marginTop: '1rem' }}>Modo demostración: el mensaje se ha guardado solo en este navegador.</AvisoDemo>
      </div>
    );
  }

  return (
    <Formulario
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
        setMensajes((prev) => [...prev, { id: `m-${Date.now().toString(36)}`, fecha: new Date().toISOString(), ...f }]);
        setEnviado(true);
      }}
    >
      <Campo>
        <label htmlFor="c-nombre">Nombre</label>
        <input id="c-nombre" required autoComplete="name" value={f.nombre} onChange={(e) => setF({ ...f, nombre: e.target.value })} />
      </Campo>
      <Campo>
        <label htmlFor="c-email">Correo electrónico</label>
        <input id="c-email" type="email" required autoComplete="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
      </Campo>
      <Campo>
        <label htmlFor="c-msg">Mensaje</label>
        <textarea id="c-msg" required value={f.mensaje} onChange={(e) => setF({ ...f, mensaje: e.target.value })} />
      </Campo>
      <Boton type="submit" $grande>
        Enviar mensaje
      </Boton>
    </Formulario>
  );
};

const Info: React.FC = () => {
  const { slug = '' } = useParams();
  const pagina = infoPorSlug(slug);
  useTitulo(pagina?.titulo ?? 'Página no encontrada');

  if (!pagina) return <NoEncontrada />;

  return (
    <Contenedor>
      <CabeceraPagina>
        <h1>{pagina.titulo}</h1>
        <p>{pagina.intro}</p>
      </CabeceraPagina>

      <Texto>
        {pagina.provisional && (
          <Provisional>Texto provisional: pendiente de revisión legal antes de publicarse.</Provisional>
        )}
        {pagina.secciones?.map((s, i) => (
          <section key={i}>
            {s.titulo && <h2>{s.titulo}</h2>}
            {s.parrafos.map((t, j) => (
              <p key={j}>{t}</p>
            ))}
          </section>
        ))}

        {pagina.extra === 'contacto' && <FormularioContacto />}
        {pagina.extra === 'faq' &&
          faq.map((q) => (
            <Pregunta key={q.p}>
              <summary>{q.p}</summary>
              <p>{q.r}</p>
            </Pregunta>
          ))}

        {pagina.cta && (
          <div style={{ marginTop: '1.5rem' }}>
            <Boton as={Link} to={pagina.cta.a}>
              {pagina.cta.texto}
            </Boton>
          </div>
        )}
      </Texto>
    </Contenedor>
  );
};

export default Info;
