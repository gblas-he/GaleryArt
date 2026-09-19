import { Artista } from '../types';

// Datos de ejemplo: sustitúyalos por los artistas reales de la galería.
export const artistas: Artista[] = [
  {
    id: 'lucia-ferrer',
    nombre: 'Lucía Ferrer',
    ciudad: 'Valencia',
    pais: 'España',
    disciplina: 'Pintura al óleo',
    bio: 'Pinta paisajes de luz limpia a partir de apuntes tomados en el campo. Trabaja el óleo en capas finas y prefiere los cielos abiertos a los detalles.',
  },
  {
    id: 'camila-roldan',
    nombre: 'Camila Roldán',
    ciudad: 'Buenos Aires',
    pais: 'Argentina',
    disciplina: 'Pintura y obra sobre papel',
    bio: 'Alterna el óleo expresionista con dibujos de línea fina sobre papel. Su obra parte del paisaje, pero acaba en el gesto y en el mapa.',
  },
  {
    id: 'alvaro-nieto',
    nombre: 'Álvaro Nieto',
    ciudad: 'Sevilla',
    pais: 'España',
    disciplina: 'Abstracción geométrica',
    bio: 'Compone con círculos, diagonales y planos de color. Le interesa que el ojo recorra el cuadro como quien sigue una melodía.',
  },
  {
    id: 'mateo-quispe',
    nombre: 'Mateo Quispe',
    ciudad: 'Lima',
    pais: 'Perú',
    disciplina: 'Campos de color',
    bio: 'Construye superficies de color en bandas de bordes difusos, casi sin figura. Sus series se piensan para verse juntas en una misma pared.',
  },
  {
    id: 'ines-valdivia',
    nombre: 'Inés Valdivia',
    ciudad: 'Madrid',
    pais: 'España',
    disciplina: 'Marinas y horizontes',
    bio: 'Pinta el mar a distintas horas del día con muy pocos elementos: una línea de horizonte, una luz y mucho silencio.',
  },
];

export const artistaPorId = (id: string) => artistas.find((a) => a.id === id);
