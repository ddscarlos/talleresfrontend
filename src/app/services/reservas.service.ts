import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Reserva, Pago } from '../models/reserva.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  private apiUrl = environment.apiUrl;
  private reservaSeleccionadaSubject = new BehaviorSubject<Reserva | null>(null);
  public reservaSeleccionada$ = this.reservaSeleccionadaSubject.asObservable();

  constructor(private http: HttpClient) { }

  get reservaSeleccionada(): Reserva | null {
    return this.reservaSeleccionadaSubject.value;
  }

  setReservaSeleccionada(reserva: Reserva | null): void {
    this.reservaSeleccionadaSubject.next(reserva);
  }

  crearReserva(data: {
    programacion_id: number;
    cupos: number;
    observaciones?: string;
  }): Observable<Reserva> {
    return this.http.post<Reserva>(`${this.apiUrl}/reservas`, data).pipe(
      tap(reserva => this.setReservaSeleccionada(reserva))
    );
  }

  getMisReservas(filtros?: any): Observable<Reserva[]> {
    let params = new HttpParams();
    if (filtros) {
      Object.keys(filtros).forEach(key => {
        if (filtros[key] !== null && filtros[key] !== undefined) {
          params = params.append(key, filtros[key]);
        }
      });
    }
    return this.http.get<Reserva[]>(`${this.apiUrl}/reservas/mis-reservas`, { params });
  }

  getReservas(filtros?: any): Observable<Reserva[]> {
    return this.getMisReservas(filtros);
  }

  getReservaById(id: number): Observable<Reserva> {
    return this.http.get<Reserva>(`${this.apiUrl}/reservas/${id}`).pipe(
      tap(reserva => this.setReservaSeleccionada(reserva))
    );
  }

  cancelarReserva(id: number, motivo?: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/reservas/${id}/cancelar`, { motivo });
  }

  actualizarEstado(id: number, estadoId: number, motivo?: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/reservas/${id}/estado`, {
      estado_id: estadoId,
      motivo
    });
  }

  // Obtener pagos de una reserva
  getPagosReserva(reservaId: number): Observable<Pago[]> {
    return this.http.get<Pago[]>(`${this.apiUrl}/reservas/${reservaId}/pagos`);
  }

  // UTILIDADES
  generarNumeroReserva(): string {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `RES-${timestamp.slice(-6)}${random}`;
  }

  calcularTotal(precioPorCupo: number, cantidad: number): number {
    return precioPorCupo * cantidad;
  }

  // Estados de reserva
  getEstadosReserva(): any[] {
    return [
      { esr_id: 1, esr_nombre: 'PENDIENTE', esr_color: '#ffc107' },
      { esr_id: 2, esr_nombre: 'CONFIRMADA', esr_color: '#28a745' },
      { esr_id: 3, esr_nombre: 'CANCELADA', esr_color: '#dc3545' },
      { esr_id: 4, esr_nombre: 'COMPLETADA', esr_color: '#17a2b8' }
    ];
  }
}
