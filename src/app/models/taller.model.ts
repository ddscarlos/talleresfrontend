export interface Taller {
  tal_id: number;
  tal_nombre: string;
  tal_descripcion: string;
  tal_categoria: string;
  tal_emoji: string;
  tal_edad_min: number;
  tal_edad_max: number;
  tal_duracion: number; // en minutos
  tal_precio_desde: number;
  tal_estado: string; // 'A' activo, 'I' inactivo
  tal_imagen_url?: string;
}

export interface Sede {
  sed_id: number;
  sed_nombre: string;
  sed_direccion: string;
  sed_distrito: string;
  sed_referencia?: string;
  sed_estado: string;
}

export interface Servicio {
  ser_id: number;
  tal_id: number;
  sed_id: number;
  per_id_profesor: number;
  ser_precio: number;
  ser_aforo: number;
  ser_talento_requerido: boolean;
  ser_estado: string;
  taller?: Taller;
  sede?: Sede;
  profesor?: Profesor;
  horarios?: Horario[];
  cupos_disponibles?: number;
}

export interface Profesor {
  per_id: number;
  nombres: string;
  apellidos: string;
  nombre_completo?: string;
  especialidad?: string;
  foto_url?: string;
}

export interface Horario {
  hor_id: number;
  ser_id: number;
  hor_dia_semana: number; // 1=Lunes, 7=Domingo
  hor_hora_inicio: string; // formato HH:mm
  hor_hora_fin: string;
  hor_estado: string;
}

export interface Programacion {
  prg_id: number;
  ser_id: number;
  prg_fecha_inicio: string; // formato YYYY-MM-DD
  prg_fecha_fin?: string;
  prg_aforo_disponible: number;
  prg_bloqueado: boolean;
  prg_estado: string;
  servicio?: Servicio;
}

export const CATEGORIAS = [
  { id: 'danza', nombre: 'Danza', emoji: '💃' },
  { id: 'teatro', nombre: 'Teatro', emoji: '🎭' },
  { id: 'musica', nombre: 'Música', emoji: '🎵' },
  { id: 'artes-plasticas', nombre: 'Artes Plásticas', emoji: '🎨' },
  { id: 'bienestar', nombre: 'Bienestar', emoji: '🧘' },
  { id: 'literatura', nombre: 'Literatura', emoji: '📚' }
];

export const DIAS_SEMANA = [
  { id: 1, nombre: 'Lunes', abrev: 'LUN' },
  { id: 2, nombre: 'Martes', abrev: 'MAR' },
  { id: 3, nombre: 'Miércoles', abrev: 'MIÉ' },
  { id: 4, nombre: 'Jueves', abrev: 'JUE' },
  { id: 5, nombre: 'Viernes', abrev: 'VIE' },
  { id: 6, nombre: 'Sábado', abrev: 'SÁB' },
  { id: 7, nombre: 'Domingo', abrev: 'DOM' }
];
