import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Reserva } from '../models/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  crearReserva(data: {
    programacion_id: number;
    cupos: number;
    observaciones?: string;
  }): Observable<Reserva> {
    return this.http.post<Reserva>(`${this.apiUrl}/reservas`, data);
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
    return this.http.get<Reserva>(`${this.apiUrl}/reservas/${id}`);
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

  // Utilidades
  generarNumeroReserva(): string {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `RES-${timestamp.slice(-6)}${random}`;
  }

  calcularTotal(precioPorCupo: number, cantidad: number): number {
    return precioPorCupo * cantidad;
  }
}
