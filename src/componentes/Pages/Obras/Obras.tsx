import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSliders, FiX } from 'react-icons/fi';
import { useTienda } from '../../../context/TiendaContext';
import { artistaPorId } from '../../../data/artistas';
import { categorias, formatoDe, formatos, obras, paletas } from '../../../data/obras';
import { useTitulo } from '../../../hooks/useTitulo';
import { Categoria, Formato, Paleta } from '../../../types';
import { normalizar } from '../../../utils/format';
import ObraCard from '../../ObraCard/ObraCard';
import { Boton, CabeceraPagina, Contenedor, EstadoVacio, RejillaObras } from '../../common/ui';
import { BarraResultados, BotonFiltros, Cuerpo, Etiqueta, Etiquetas, Grupo, Opcion, PanelFiltros } from './Obras.styles';

const rangosPrecio: Record<string, { nombre: string; ok: (p: number) => boolean }> = {
  'hasta-1000': { nombre: 'Hasta 1.000 €', ok: (p) => p <= 1000 },
  '1000-2500': { nombre: 'De 1.000 € a 2.500 €', ok: (p) => p > 1000 && p <= 2500 },
  'mas-2500': { nombre: 'Más de 2.500 €', ok: (p) => p > 2500 },
};

const ordenes: Record<string, string> = {
  recomendadas: 'Recomendadas',
  novedades: 'Novedades',
  'precio-asc': 'Precio: de menor a mayor',
  'precio-desc': 'Precio: de mayor a menor',
};

const Obras: React.FC = () => {
  useTitulo('Obras de arte');
  const { estaVendida } = useTienda();
  const [params, setParams] = useSearchParams();
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);

  const q = params.get('q') ?? '';
  const cats = params.getAll('cat') as Categoria[];
  const colores = params.getAll('color') as Paleta[];
  const formatosSel = params.getAll('formato') as Formato[];
  const precio = params.get('precio') ?? '';
  const soloDisponibles = params.get('disp') === '1';
  const orden = ordenes[params.get('orden') ?? ''] ? (params.get('orden') as string) : 'recomendadas';

  const alternar = (clave: string, valor: string) => {
    const next = new URLSearchParams(params);
    const actuales = next.getAll(clave);
    next.delete(clave);
    (actuales.includes(valor) ? actuales.filter((v) => v !== valor) : [...actuales, valor]).forEach((v) =>
      next.append(clave, v)
    );
    setParams(next, { replace: true });
  };

  const fijar = (clave: string, valor: string | null) => {
    const next = new URLSearchParams(params);
    if (valor) next.set(clave, valor);
    else next.delete(clave);
    setParams(next, { replace: true });
  };

  const hayFiltros = !!(q || cats.length || colores.length || formatosSel.length || precio || soloDisponibles);

  const resultado = useMemo(() => {
    const palabras = normalizar(q).split(/\s+/).filter(Boolean);
    const lista = obras.filter((o) => {
      if (palabras.length) {
        const texto = normalizar(
          [o.titulo, artistaPorId(o.artistaId)?.nombre, o.categoria, o.tecnica, o.descripcion].join(' ')
        );
        if (!palabras.every((p) => texto.includes(p))) return false;
      }
      if (cats.length && !cats.includes(o.categoria)) return false;
      if (colores.length && !o.paletas.some((p) => colores.includes(p))) return false;
      if (formatosSel.length && !formatosSel.includes(formatoDe(o))) return false;
      if (precio && rangosPrecio[precio] && !rangosPrecio[precio].ok(o.precio)) return false;
      if (soloDisponibles && estaVendida(o)) return false;
      return true;
    });

    const porFecha = (a: typeof lista[number], b: typeof lista[number]) => b.alta.localeCompare(a.alta);
    if (orden === 'precio-asc') lista.sort((a, b) => a.precio - b.precio);
    else if (orden === 'precio-desc') lista.sort((a, b) => b.precio - a.precio);
    else if (orden === 'novedades') lista.sort(porFecha);
    else
      lista.sort(
        (a, b) =>
          Number(estaVendida(a)) - Number(estaVendida(b)) ||
          Number(!!b.destacada) - Number(!!a.destacada) ||
          porFecha(a, b)
      );
    return lista;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, params.toString(), estaVendida]);

  const nombreColor = (id: string) => paletas.find((p) => p.id === id)?.nombre ?? id;
  const nombreFormato = (id: string) => formatos.find((f) => f.id === id)?.nombre ?? id;

  return (
    <Contenedor>
      <CabeceraPagina>
        <h1>{q ? `Resultados para «${q}»` : 'Obras de arte'}</h1>
        <p>Originales de artistas contemporáneos, cada uno con su cartela: autor, técnica, medidas y precio.</p>
      </CabeceraPagina>

      <Cuerpo>
        <div>
          <BotonFiltros
            type="button"
            onClick={() => setFiltrosAbiertos((v) => !v)}
            aria-expanded={filtrosAbiertos}
            aria-controls="filtros"
          >
            <FiSliders aria-hidden /> {filtrosAbiertos ? 'Ocultar filtros' : 'Filtros'}
          </BotonFiltros>

          <PanelFiltros id="filtros" $abierto={filtrosAbiertos} aria-label="Filtros">
            <Grupo>
              <legend>Categoría</legend>
              {categorias.map((c) => (
                <Opcion key={c}>
                  <input type="checkbox" checked={cats.includes(c)} onChange={() => alternar('cat', c)} />
                  {c}
                </Opcion>
              ))}
            </Grupo>

            <Grupo>
              <legend>Color</legend>
              {paletas.map((p) => (
                <Opcion key={p.id}>
                  <input type="checkbox" checked={colores.includes(p.id)} onChange={() => alternar('color', p.id)} />
                  {p.nombre}
                </Opcion>
              ))}
            </Grupo>

            <Grupo>
              <legend>Precio</legend>
              {Object.entries(rangosPrecio).map(([id, r]) => (
                <Opcion key={id}>
                  <input
                    type="radio"
                    name="precio"
                    checked={precio === id}
                    onChange={() => fijar('precio', id)}
                  />
                  {r.nombre}
                </Opcion>
              ))}
              <Opcion>
                <input type="radio" name="precio" checked={!precio} onChange={() => fijar('precio', null)} />
                Cualquier precio
              </Opcion>
            </Grupo>

            <Grupo>
              <legend>Formato</legend>
              {formatos.map((f) => (
                <Opcion key={f.id}>
                  <input
                    type="checkbox"
                    checked={formatosSel.includes(f.id)}
                    onChange={() => alternar('formato', f.id)}
                  />
                  {f.nombre}
                </Opcion>
              ))}
            </Grupo>

            <Grupo>
              <legend>Disponibilidad</legend>
              <Opcion>
                <input
                  type="checkbox"
                  checked={soloDisponibles}
                  onChange={() => fijar('disp', soloDisponibles ? null : '1')}
                />
                Ocultar obras vendidas
              </Opcion>
            </Grupo>

            {hayFiltros && (
              <Boton type="button" $variante="secundario" $bloque onClick={() => setParams({}, { replace: true })}>
                Quitar todos los filtros
              </Boton>
            )}
          </PanelFiltros>
        </div>

        <div>
          <BarraResultados>
            <p aria-live="polite">{resultado.length === 1 ? '1 obra' : `${resultado.length} obras`}</p>
            <label>
              Ordenar por
              <select value={orden} onChange={(e) => fijar('orden', e.target.value === 'recomendadas' ? null : e.target.value)}>
                {Object.entries(ordenes).map(([id, nombre]) => (
                  <option key={id} value={id}>
                    {nombre}
                  </option>
                ))}
              </select>
            </label>
          </BarraResultados>

          {hayFiltros && (
            <Etiquetas aria-label="Filtros activos">
              {q && (
                <Etiqueta>
                  <button type="button" onClick={() => fijar('q', null)} aria-label={`Quitar la búsqueda «${q}»`}>
                    Búsqueda: {q} <FiX aria-hidden />
                  </button>
                </Etiqueta>
              )}
              {cats.map((c) => (
                <Etiqueta key={c}>
                  <button type="button" onClick={() => alternar('cat', c)} aria-label={`Quitar filtro ${c}`}>
                    {c} <FiX aria-hidden />
                  </button>
                </Etiqueta>
              ))}
              {colores.map((c) => (
                <Etiqueta key={c}>
                  <button type="button" onClick={() => alternar('color', c)} aria-label={`Quitar filtro ${nombreColor(c)}`}>
                    {nombreColor(c)} <FiX aria-hidden />
                  </button>
                </Etiqueta>
              ))}
              {formatosSel.map((f) => (
                <Etiqueta key={f}>
                  <button type="button" onClick={() => alternar('formato', f)} aria-label={`Quitar filtro ${nombreFormato(f)}`}>
                    {nombreFormato(f)} <FiX aria-hidden />
                  </button>
                </Etiqueta>
              ))}
              {precio && rangosPrecio[precio] && (
                <Etiqueta>
                  <button type="button" onClick={() => fijar('precio', null)} aria-label="Quitar filtro de precio">
                    {rangosPrecio[precio].nombre} <FiX aria-hidden />
                  </button>
                </Etiqueta>
              )}
              {soloDisponibles && (
                <Etiqueta>
                  <button type="button" onClick={() => fijar('disp', null)} aria-label="Mostrar también las obras vendidas">
                    Solo disponibles <FiX aria-hidden />
                  </button>
                </Etiqueta>
              )}
            </Etiquetas>
          )}

          {resultado.length === 0 ? (
            <EstadoVacio>
              <h2>No hay obras con estos criterios</h2>
              <p>Pruebe con otras palabras o quite alguno de los filtros para ver más obras.</p>
              <Boton type="button" onClick={() => setParams({}, { replace: true })}>
                Ver todas las obras
              </Boton>
            </EstadoVacio>
          ) : (
            <RejillaObras>
              {resultado.map((obra) => (
                <li key={obra.id}>
                  <ObraCard obra={obra} />
                </li>
              ))}
            </RejillaObras>
          )}
        </div>
      </Cuerpo>
    </Contenedor>
  );
};

export default Obras;
