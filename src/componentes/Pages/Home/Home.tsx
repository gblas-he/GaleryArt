import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import banner from '../../../assets/banner.jpg';
import { artistas } from '../../../data/artistas';
import { categorias, obras } from '../../../data/obras';
import { useTitulo } from '../../../hooks/useTitulo';
import { iniciales } from '../../../utils/format';
import ObraCard from '../../ObraCard/ObraCard';
import { Boton, BotonTexto, Contenedor, Monograma, RejillaObras, Seccion } from '../../common/ui';
import CustomCarousel from './organims/Carousel/CustomCarousel';
import {
  Artista,
  Banda,
  BandaContenido,
  Categoria,
  Categorias,
  Encabezado,
  Hero,
  HeroAcciones,
  HeroTexto,
  ListaArtistas,
} from './Home.styles';

const Home: React.FC = () => {
  useTitulo();

  const destacadas = useMemo(() => obras.filter((o) => o.destacada), []);
  const recientes = useMemo(() => [...obras].sort((a, b) => b.alta.localeCompare(a.alta)).slice(0, 4), []);

  return (
    <>
      <Hero style={{ backgroundImage: `url(${banner})` }}>
        <Contenedor>
          <HeroTexto>
            <h1>Descubra el arte</h1>
            <p>
              Explore su muro personalizado para descubrir las obras de arte más recientes y las últimas
              tendencias. Indique sus preferencias y encuentre la inspiración que busca. ¡Seguro que su próxima
              obra favorita está un poco más abajo!
            </p>
            <HeroAcciones>
              <Boton as={Link} to="/obras" $variante="claro" $grande>
                Explorar obras
              </Boton>
              <Boton as={Link} to="/descubrir" $variante="contorno-claro" $grande>
                Crear mi muro
              </Boton>
            </HeroAcciones>
          </HeroTexto>
        </Contenedor>
      </Hero>

      <Seccion>
        <Contenedor>
          <Encabezado>
            <h2>Obras destacadas</h2>
            <BotonTexto as={Link} to="/obras">
              Ver todas las obras
            </BotonTexto>
          </Encabezado>
          <CustomCarousel obras={destacadas} />
        </Contenedor>
      </Seccion>

      <Seccion $muro>
        <Contenedor>
          <Encabezado>
            <h2>Explorar por categoría</h2>
          </Encabezado>
          <Categorias>
            {categorias.map((cat) => {
              const deLaCategoria = obras.filter((o) => o.categoria === cat);
              return (
                <li key={cat}>
                  <Categoria to={`/obras?cat=${encodeURIComponent(cat)}`}>
                    <img src={deLaCategoria[0].imagen} alt="" loading="lazy" />
                    <strong>{cat}</strong>
                    <span>{deLaCategoria.length === 1 ? '1 obra' : `${deLaCategoria.length} obras`}</span>
                  </Categoria>
                </li>
              );
            })}
          </Categorias>
        </Contenedor>
      </Seccion>

      <Seccion>
        <Contenedor>
          <Encabezado>
            <h2>Recién llegadas</h2>
            <BotonTexto as={Link} to="/obras?orden=novedades">
              Ver novedades
            </BotonTexto>
          </Encabezado>
          <RejillaObras>
            {recientes.map((obra) => (
              <li key={obra.id}>
                <ObraCard obra={obra} />
              </li>
            ))}
          </RejillaObras>
        </Contenedor>
      </Seccion>

      <Seccion $muro>
        <Contenedor>
          <Encabezado>
            <h2>Artistas de la galería</h2>
            <BotonTexto as={Link} to="/artistas">
              Ver todos los artistas
            </BotonTexto>
          </Encabezado>
          <ListaArtistas>
            {artistas.map((a) => (
              <li key={a.id}>
                <Artista to={`/artistas/${a.id}`}>
                  <Monograma $tam={56} aria-hidden>
                    {iniciales(a.nombre)}
                  </Monograma>
                  <div>
                    <strong>{a.nombre}</strong>
                    <span>
                      {a.ciudad}, {a.pais}
                    </span>
                  </div>
                </Artista>
              </li>
            ))}
          </ListaArtistas>
        </Contenedor>
      </Seccion>

      <Banda>
        <Contenedor>
          <BandaContenido>
            <div>
              <h2>¿Es usted artista?</h2>
              <p>
                Muestre su obra a compradores de toda España. Cuéntenos quién es y qué crea, y le responderemos con
                los siguientes pasos.
              </p>
            </div>
            <Boton as={Link} to="/vender" $variante="claro" $grande>
              Vender mis obras
            </Boton>
          </BandaContenido>
        </Contenedor>
      </Banda>
    </>
  );
};

export default Home;
