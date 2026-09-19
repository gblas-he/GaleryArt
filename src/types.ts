export type Categoria = 'Paisaje' | 'Abstracto' | 'Marina' | 'Obra sobre papel';
export type Paleta = 'calidos' | 'frios' | 'vivos' | 'neutros' | 'oscuros';
export type Formato = 'horizontal' | 'vertical' | 'cuadrada';

export interface Artista {
  id: string;
  nombre: string;
  ciudad: string;
  pais: string;
  disciplina: string;
  bio: string;
}

export interface Obra {
  id: string;
  titulo: string;
  artistaId: string;
  anio: number;
  tecnica: string;
  categoria: Categoria;
  paletas: Paleta[];
  /** Medidas en centímetros */
  ancho: number;
  alto: number;
  /** Precio en euros, IVA incluido */
  precio: number;
  imagen: string;
  descripcion: string;
  /** Fecha de alta en la galería (ISO) */
  alta: string;
  destacada?: boolean;
  vendida?: boolean;
}

export interface DatosEnvio {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  codigoPostal: string;
  pais: string;
}

export interface LineaPedido {
  obraId: string;
  titulo: string;
  artista: string;
  precio: number;
}

export interface Pedido {
  numero: string;
  fecha: string;
  usuarioId?: string;
  lineas: LineaPedido[];
  total: number;
  envio: DatosEnvio;
}

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  creadoEn: string;
}
