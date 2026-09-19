import { Categoria, Formato, Obra, Paleta } from '../types';

import rioEnCalma from '../assets/obras/rio-en-calma.jpg';
import tormenta from '../assets/obras/tormenta-sobre-el-valle.jpg';
import ritmo from '../assets/obras/ritmo-en-diagonal.jpg';
import campo1 from '../assets/obras/campo-de-umbral-1.jpg';
import campo2 from '../assets/obras/campo-de-umbral-2.jpg';
import campo3 from '../assets/obras/campo-de-umbral-3.jpg';
import horizonte from '../assets/obras/horizonte-de-agosto.jpg';
import marea from '../assets/obras/marea-baja.jpg';
import curvas from '../assets/obras/curvas-de-nivel.jpg';
import sierra from '../assets/obras/sierra-en-tres-capas.jpg';
import circulos from '../assets/obras/circulos-y-arcos.jpg';
import ondas from '../assets/obras/ondas-de-tinta.jpg';

export const categorias: Categoria[] = ['Paisaje', 'Abstracto', 'Marina', 'Obra sobre papel'];

export const paletas: { id: Paleta; nombre: string }[] = [
  { id: 'calidos', nombre: 'Cálidos' },
  { id: 'frios', nombre: 'Fríos' },
  { id: 'vivos', nombre: 'Vivos' },
  { id: 'neutros', nombre: 'Neutros' },
  { id: 'oscuros', nombre: 'Oscuros' },
];

export const formatos: { id: Formato; nombre: string }[] = [
  { id: 'horizontal', nombre: 'Horizontal' },
  { id: 'vertical', nombre: 'Vertical' },
  { id: 'cuadrada', nombre: 'Cuadrado' },
];

// Datos de ejemplo: sustitúyalos por el catálogo real (imagen, precio, medidas...).
export const obras: Obra[] = [
  {
    id: 'tormenta-sobre-el-valle',
    titulo: 'Tormenta sobre el valle',
    artistaId: 'camila-roldan',
    anio: 2024,
    tecnica: 'Óleo sobre lienzo',
    categoria: 'Paisaje',
    paletas: ['vivos', 'calidos'],
    ancho: 120,
    alto: 120,
    precio: 3800,
    imagen: tormenta,
    descripcion:
      'Un valle atravesado por un río se enciende bajo un cielo que aún no ha decidido si romper. Pincelada ancha y espátula en los cielos, más contenida en el primer plano.',
    alta: '2026-09-12',
    destacada: true,
  },
  {
    id: 'horizonte-de-agosto',
    titulo: 'Horizonte de agosto',
    artistaId: 'ines-valdivia',
    anio: 2025,
    tecnica: 'Óleo sobre lienzo',
    categoria: 'Marina',
    paletas: ['calidos', 'oscuros'],
    ancho: 150,
    alto: 100,
    precio: 2900,
    imagen: horizonte,
    descripcion:
      'El sol toca el mar justo antes de desaparecer. Un degradado sin cortes, de índigo a naranja, y una estela de luz que baja hasta el borde del cuadro.',
    alta: '2026-09-09',
    destacada: true,
  },
  {
    id: 'ondas-de-tinta',
    titulo: 'Ondas de tinta',
    artistaId: 'camila-roldan',
    anio: 2025,
    tecnica: 'Tinta y pigmento sobre papel',
    categoria: 'Obra sobre papel',
    paletas: ['oscuros', 'frios'],
    ancho: 100,
    alto: 70,
    precio: 1450,
    imagen: ondas,
    descripcion:
      'Más de cien líneas trazadas una a una sobre fondo oscuro. Del azul al oro, dibujan una ola que solo se ve cuando la luz entra de lado.',
    alta: '2026-09-04',
  },
  {
    id: 'campo-de-umbral-3',
    titulo: 'Campo de umbral III',
    artistaId: 'mateo-quispe',
    anio: 2025,
    tecnica: 'Acrílico sobre lienzo',
    categoria: 'Abstracto',
    paletas: ['calidos', 'oscuros'],
    ancho: 80,
    alto: 100,
    precio: 1200,
    imagen: campo3,
    descripcion:
      'Ocre y verde musgo separados por una franja de luz. Tercera pieza de la serie «Campo de umbral», pensada para colgarse junto a las otras dos.',
    alta: '2026-08-29',
    destacada: true,
  },
  {
    id: 'sierra-en-tres-capas',
    titulo: 'Sierra en tres capas',
    artistaId: 'lucia-ferrer',
    anio: 2025,
    tecnica: 'Acrílico sobre tabla',
    categoria: 'Paisaje',
    paletas: ['calidos', 'frios'],
    ancho: 75,
    alto: 100,
    precio: 780,
    imagen: sierra,
    descripcion:
      'Cinco cordilleras que se apagan hacia el primer plano, como las ve quien camina al amanecer con la niebla todavía baja.',
    alta: '2026-08-21',
  },
  {
    id: 'ritmo-en-diagonal',
    titulo: 'Ritmo en diagonal',
    artistaId: 'alvaro-nieto',
    anio: 2024,
    tecnica: 'Técnica mixta sobre lienzo',
    categoria: 'Abstracto',
    paletas: ['calidos', 'vivos'],
    ancho: 90,
    alto: 90,
    precio: 1650,
    imagen: ritmo,
    descripcion:
      'Arcos, diagonales y discos de naranja, azul y rojo que se cruzan sin chocar. Una pieza con mucho movimiento para una pared tranquila.',
    alta: '2026-08-14',
    destacada: true,
  },
  {
    id: 'marea-baja',
    titulo: 'Marea baja',
    artistaId: 'ines-valdivia',
    anio: 2024,
    tecnica: 'Óleo sobre lienzo',
    categoria: 'Marina',
    paletas: ['frios'],
    ancho: 120,
    alto: 80,
    precio: 980,
    imagen: marea,
    descripcion:
      'Ocho bandas de azul, del agua más clara a la más profunda. Una marina casi geométrica que funciona igual de bien en un salón que en un despacho.',
    alta: '2026-08-02',
  },
  {
    id: 'rio-en-calma',
    titulo: 'Río en calma',
    artistaId: 'lucia-ferrer',
    anio: 2023,
    tecnica: 'Óleo sobre lienzo',
    categoria: 'Paisaje',
    paletas: ['frios', 'vivos'],
    ancho: 100,
    alto: 100,
    precio: 2400,
    imagen: rioEnCalma,
    descripcion:
      'Un río sereno entre montañas y praderas, con las nubes altas reflejadas en el agua. Un paisaje clásico, luminoso y muy fácil de vivir.',
    alta: '2026-07-18',
    destacada: true,
  },
  {
    id: 'circulos-y-arcos',
    titulo: 'Círculos y arcos',
    artistaId: 'alvaro-nieto',
    anio: 2025,
    tecnica: 'Acrílico sobre lienzo',
    categoria: 'Abstracto',
    paletas: ['vivos', 'neutros'],
    ancho: 70,
    alto: 70,
    precio: 890,
    imagen: circulos,
    descripcion:
      'Rojo, azul y amarillo sobre un fondo de piedra clara. Una composición de formas simples con un ritmo muy marcado, de herencia bauhausiana.',
    alta: '2026-07-05',
  },
  {
    id: 'campo-de-umbral-1',
    titulo: 'Campo de umbral I',
    artistaId: 'mateo-quispe',
    anio: 2023,
    tecnica: 'Acrílico sobre lienzo',
    categoria: 'Abstracto',
    paletas: ['calidos', 'oscuros'],
    ancho: 80,
    alto: 100,
    precio: 1200,
    imagen: campo1,
    descripcion:
      'Naranja y rojo intenso sobre un fondo granate. Los bordes difusos hacen que el color parezca vibrar a distancia.',
    alta: '2026-06-20',
  },
  {
    id: 'curvas-de-nivel',
    titulo: 'Curvas de nivel',
    artistaId: 'camila-roldan',
    anio: 2022,
    tecnica: 'Tinta sobre papel',
    categoria: 'Obra sobre papel',
    paletas: ['neutros'],
    ancho: 60,
    alto: 80,
    precio: 640,
    imagen: curvas,
    descripcion:
      'Un mapa de un territorio inventado, dibujado con línea negra fina. Se lee como paisaje desde lejos y como dibujo de cerca.',
    alta: '2026-06-02',
  },
  {
    id: 'campo-de-umbral-2',
    titulo: 'Campo de umbral II',
    artistaId: 'mateo-quispe',
    anio: 2023,
    tecnica: 'Acrílico sobre lienzo',
    categoria: 'Abstracto',
    paletas: ['frios', 'neutros'],
    ancho: 80,
    alto: 100,
    precio: 1200,
    imagen: campo2,
    descripcion:
      'Azul de prusia y gris pizarra sobre un fondo claro. La pieza más serena de la serie.',
    alta: '2026-05-16',
    vendida: true,
  },
];

export const obraPorId = (id: string) => obras.find((o) => o.id === id);

export const formatoDe = (o: Obra): Formato => {
  const r = o.ancho / o.alto;
  if (r > 1.08) return 'horizontal';
  if (r < 0.92) return 'vertical';
  return 'cuadrada';
};
