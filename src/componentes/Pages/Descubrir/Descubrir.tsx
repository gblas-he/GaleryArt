import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTienda } from '../../../context/TiendaContext';
import { categorias, formatoDe, formatos, obras, paletas } from '../../../data/obras';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { useTitulo } from '../../../hooks/useTitulo';
import { Categoria, Formato, Obra, Paleta } from '../../../types';
import { formatEUR } from '../../../utils/format';
import ObraCard from '../../ObraCard/ObraCard';
import { Boton, BotonTexto, CabeceraPagina, Contenedor } from '../../common/ui';
import { Chip, Chips, Colgado, Grupo, Grupos, Muro, PieFiltros, Preferencias, Separador, TituloMuro } from './Descubrir.styles';

interface Prefs {
  cats: Categoria[];
  colores: Paleta[];
  formatos: Formato[];
  presupuesto: number | null;
}

const vacias: Prefs = { cats: [], colores: [], formatos: [], presupuesto: null };
const presupuestos = [1000, 2500, 5000];

function alternar<T>(lista: T[], valor: T): T[] {
  return lista.includes(valor) ? lista.filter((v) => v !== valor) : [...lista, valor];
}

const Descubrir: React.FC = () => {
  useTitulo('Descubrir');
  const { estaVendida } = useTienda();
  const [prefs, setPrefs] = useLocalStorage<Prefs>('galeryart:preferencias', vacias);

  const hayGustos = prefs.cats.length + prefs.colores.length + prefs.formatos.length > 0;
  const hayPrefs = hayGustos || prefs.presupuesto !== null;

  const { coinciden, otras } = useMemo(() => {
    const puntuar = (o: Obra) => {
      let puntos = 0;
      const motivos: string[] = [];
      if (prefs.cats.includes(o.categoria)) {
        puntos += 3;
        motivos.push(o.categoria);
      }
      o.paletas
        .filter((c) => prefs.colores.includes(c))
        .forEach((c) => {
          puntos += 2;
          motivos.push(`colores ${paletas.find((p) => p.id === c)?.nombre.toLowerCase()}`);
        });
      const f = formatoDe(o);
      if (prefs.formatos.includes(f)) {
        puntos += 1;
        motivos.push(`formato ${formatos.find((x) => x.id === f)?.nombre.toLowerCase()}`);
      }
      return { obra: o, puntos, nota: motivos.length ? `Coincide: ${motivos.join(', ')}` : undefined };
    };

    const enPresupuesto = obras
      .filter((o) => (prefs.presupuesto === null ? true : o.precio <= prefs.presupuesto))
      .map(puntuar)
      .sort(
        (a, b) =>
          Number(estaVendida(a.obra)) - Number(estaVendida(b.obra)) ||
          b.puntos - a.puntos ||
          Number(!!b.obra.destacada) - Number(!!a.obra.destacada) ||
          b.obra.alta.localeCompare(a.obra.alta)
      );

    if (!hayGustos) return { coinciden: enPresupuesto, otras: [] as typeof enPresupuesto };
    return {
      coinciden: enPresupuesto.filter((x) => x.puntos > 0),
      otras: enPresupuesto.filter((x) => x.puntos === 0),
    };
  }, [prefs, hayGustos, estaVendida]);

  const cambiar = (parcial: Partial<Prefs>) => setPrefs({ ...prefs, ...parcial });

  return (
    <>
      <Contenedor>
        <CabeceraPagina style={{ borderBottom: 0, paddingBottom: '1rem' }}>
          <h1>Su muro personalizado</h1>
          <p>
            Indique sus preferencias y colgaremos aquí las obras que mejor encajan. Sus elecciones se guardan en este
            navegador, así que las encontrará al volver.
          </p>
        </CabeceraPagina>

        <Preferencias aria-label="Preferencias">
          <Grupos>
            <Grupo>
              <legend>¿Qué le gusta?</legend>
              <Chips>
                {categorias.map((c) => (
                  <Chip
                    key={c}
                    type="button"
                    aria-pressed={prefs.cats.includes(c)}
                    onClick={() => cambiar({ cats: alternar(prefs.cats, c) })}
                  >
                    {c}
                  </Chip>
                ))}
              </Chips>
            </Grupo>

            <Grupo>
              <legend>Colores</legend>
              <Chips>
                {paletas.map((p) => (
                  <Chip
                    key={p.id}
                    type="button"
                    aria-pressed={prefs.colores.includes(p.id)}
                    onClick={() => cambiar({ colores: alternar(prefs.colores, p.id) })}
                  >
                    {p.nombre}
                  </Chip>
                ))}
              </Chips>
            </Grupo>

            <Grupo>
              <legend>Formato</legend>
              <Chips>
                {formatos.map((f) => (
                  <Chip
                    key={f.id}
                    type="button"
                    aria-pressed={prefs.formatos.includes(f.id)}
                    onClick={() => cambiar({ formatos: alternar(prefs.formatos, f.id) })}
                  >
                    {f.nombre}
                  </Chip>
                ))}
              </Chips>
            </Grupo>

            <Grupo>
              <legend>Presupuesto máximo</legend>
              <Chips>
                {presupuestos.map((p) => (
                  <Chip
                    key={p}
                    type="button"
                    aria-pressed={prefs.presupuesto === p}
                    onClick={() => cambiar({ presupuesto: prefs.presupuesto === p ? null : p })}
                  >
                    {formatEUR(p)}
                  </Chip>
                ))}
              </Chips>
            </Grupo>
          </Grupos>

          {hayPrefs && (
            <PieFiltros>
              <Boton type="button" $variante="secundario" onClick={() => setPrefs(vacias)}>
                Empezar de nuevo
              </Boton>
            </PieFiltros>
          )}
        </Preferencias>
      </Contenedor>

      <Muro aria-label="Su muro">
        <Contenedor>
          <TituloMuro>
            <h2>{hayGustos ? 'Su muro' : 'Tendencias en la galería'}</h2>
            <p>
              {hayGustos
                ? coinciden.length === 0
                  ? 'Ninguna obra coincide con esta combinación. Pruebe a quitar alguna preferencia.'
                  : `${coinciden.length === 1 ? '1 obra encaja' : `${coinciden.length} obras encajan`} con lo que ha indicado, de la más afín a la menos.`
                : 'Elija arriba lo que le gusta y este muro se reordenará para usted. Mientras tanto, esto es lo que más se mira.'}
            </p>
          </TituloMuro>

          <Colgado>
            {coinciden.map(({ obra, nota }) => (
              <li key={obra.id}>
                <ObraCard obra={obra} variante="libre" nota={hayGustos ? nota : undefined} />
              </li>
            ))}
          </Colgado>

          {otras.length > 0 && (
            <>
              <Separador />
              <TituloMuro>
                <h2>Otras obras que quizá le sorprendan</h2>
                <p>No coinciden con sus preferencias, pero entran en su presupuesto.</p>
              </TituloMuro>
              <Colgado>
                {otras.map(({ obra }) => (
                  <li key={obra.id}>
                    <ObraCard obra={obra} variante="libre" />
                  </li>
                ))}
              </Colgado>
            </>
          )}

          <div style={{ marginTop: '1rem' }}>
            <BotonTexto as={Link} to="/obras">
              Ver el catálogo completo con filtros
            </BotonTexto>
          </div>
        </Contenedor>
      </Muro>
    </>
  );
};

export default Descubrir;
