export interface User {
  per_id: number;
  tipo_documento: string; // 'DNI', 'CE', etc.
  numero_documento: string;
  nombres: string;
  apellidos: string;
  nombre_completo?: string;
  fecha_nacimiento: string;
  sexo: string; // 'M', 'F'
  telefono: string;
  email: string;
  edad?: number;
  estado?: string;
  fecha_registro?: string;

  // Dirección (opcional)
  departamento?: string;
  provincia?: string;
  distrito?: string;
  direccion?: string;
  referencia?: string;

  // Auth
  token?: string;
  refresh_token?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refresh_token: string;
  message?: string;
}

export interface RegisterRequest {
  tipo_documento: string;
  numero_documento: string;
  nombres: string;
  apellidos: string;
  fecha_nacimiento: string;
  sexo: string;
  telefono: string;
  email: string;
  password: string;
  confirmar_password?: string;
  departamento?: string;
  provincia?: string;
  distrito?: string;
  direccion?: string;
  referencia?: string;
}

export const TIPOS_DOCUMENTO = [
  { id: 'DNI', nombre: 'DNI', longitud: 8 },
  { id: 'CE', nombre: 'Carnet de Extranjería', longitud: 12 },
  { id: 'PASAPORTE', nombre: 'Pasaporte', longitud: 12 }
];
