import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Pago } from '../models/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class PagosService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  registrarPago(data: {
    reserva_id: number;
    tipo_pago_id: number;
    monto: number;
    moneda: string;
    codigo_autorizacion?: string;
    codigo_operacion?: string;
    voucher_file?: File;
  }): Observable<Pago> {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        if (key === 'voucher_file' && data[key] instanceof File) {
          formData.append(key, data[key], data[key].name);
        } else {
          formData.append(key, data[key].toString());
        }
      }
    });

    return this.http.post<Pago>(`${this.apiUrl}/pagos`, formData);
  }

  getPagoById(id: number): Observable<Pago> {
    return this.http.get<Pago>(`${this.apiUrl}/pagos/${id}`);
  }

  getPagosByReserva(reservaId: number): Observable<Pago[]> {
    return this.http.get<Pago[]>(`${this.apiUrl}/pagos/reserva/${reservaId}`);
  }

  procesarPago(data: { reservaId: number }): Observable<any> {
    return this.registrarPago({
      reserva_id: data.reservaId,
      tipo_pago_id: 1,
      monto: 0,
      moneda: 'PEN',
      codigo_operacion: this.generarCodigoOperacion()
    });
  }

  // Generar código de operación (temporal para pruebas)
  generarCodigoOperacion(): string {
    return 'OP' + Date.now().toString() + Math.floor(Math.random() * 1000);
  }
}
