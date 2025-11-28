export interface Reserva {
  res_id: number;
  per_id: number;
  prg_id: number;
  res_numero: string; // Número único de reserva
  res_cupos: number;
  res_precio_total: number;
  res_observaciones?: string;
  esr_id: number; // ID estado reserva
  res_fecha_registro: string;
  res_fecha_actualizacion?: string;
  res_usuario_registro: string;

  // Datos relacionados
  programacion?: any;
  participante?: any;
  estado?: EstadoReserva;
  pago?: Pago;
}

export interface EstadoReserva {
  esr_id: number;
  esr_nombre: string;
  esr_descripcion: string;
  esr_color: string; // Para la UI
}

export interface Pago {
  pag_id: number;
  res_id: number;
  tpa_id: number; // Tipo de pago
  pag_monto: number;
  pag_moneda: string; // 'PEN', 'USD'
  pag_codigo_autorizacion?: string;
  pag_codigo_operacion?: string;
  pag_fecha_pago: string;
  pag_voucher_url?: string;
  pag_estado: string;

  // Datos relacionados
  tipo_pago?: TipoPago;
}

export interface TipoPago {
  tpa_id: number;
  tpa_nombre: string;
  tpa_descripcion?: string;
  tpa_icono?: string;
}

export const ESTADOS_RESERVA = [
  { id: 1, nombre: 'PENDIENTE', color: 'warning', descripcion: 'Esperando pago' },
  { id: 2, nombre: 'CONFIRMADA', color: 'success', descripcion: 'Pago realizado, reserva activa' },
  { id: 3, nombre: 'CANCELADA', color: 'danger', descripcion: 'Reserva cancelada' }
];

export const TIPOS_PAGO = [
  { id: 1, nombre: 'Transferencia Bancaria', icono: '🏦' },
  { id: 2, nombre: 'Tarjeta de Débito', icono: '💳' },
  { id: 3, nombre: 'Tarjeta de Crédito', icono: '💳' },
  { id: 4, nombre: 'Yape', icono: '📱' },
  { id: 5, nombre: 'Plin', icono: '📱' },
  { id: 6, nombre: 'Efectivo en Sede', icono: '💵' }
];
