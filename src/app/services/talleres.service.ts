import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Taller, Servicio, Programacion, Sede } from '../models/taller.model';

@Injectable({
  providedIn: 'root'
})
export class TalleresService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // TALLERES
  getTalleres(filtros?: any): Observable<Taller[]> {
    let params = new HttpParams();
    if (filtros) {
      Object.keys(filtros).forEach(key => {
        if (filtros[key]) {
          params = params.append(key, filtros[key]);
        }
      });
    }
    return this.http.get<Taller[]>(`${this.apiUrl}/talleres`, { params });
  }

  getTallerById(id: number): Observable<Taller> {
    return this.http.get<Taller>(`${this.apiUrl}/talleres/${id}`);
  }

  // SEDES
  getSedes(): Observable<Sede[]> {
    return this.http.get<Sede[]>(`${this.apiUrl}/sedes`);
  }

  getSedeById(id: number): Observable<Sede> {
    return this.http.get<Sede>(`${this.apiUrl}/sedes/${id}`);
  }

  // SERVICIOS (Taller + Sede)
  getServiciosDisponibles(tallerId: number, sedeId?: number): Observable<Servicio[]> {
    let params = new HttpParams().set('taller_id', tallerId.toString());
    if (sedeId) {
      params = params.append('sede_id', sedeId.toString());
    }
    return this.http.get<Servicio[]>(`${this.apiUrl}/servicios/disponibles`, { params });
  }

  getServicioById(id: number): Observable<Servicio> {
    return this.http.get<Servicio>(`${this.apiUrl}/servicios/${id}`);
  }

  getServicioConHorarios(tallerId: number, sedeId: number): Observable<Servicio> {
    return this.http.get<Servicio>(
      `${this.apiUrl}/servicios/horarios?taller_id=${tallerId}&sede_id=${sedeId}`
    );
  }

  // PROGRAMACIONES (Calendario)
  getProgramaciones(servicioId: number, fechaInicio?: string, fechaFin?: string): Observable<Programacion[]> {
    let params = new HttpParams().set('servicio_id', servicioId.toString());
    if (fechaInicio) {
      params = params.append('fecha_inicio', fechaInicio);
    }
    if (fechaFin) {
      params = params.append('fecha_fin', fechaFin);
    }
    return this.http.get<Programacion[]>(`${this.apiUrl}/programaciones`, { params });
  }

  verificarDisponibilidad(programacionId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/programaciones/${programacionId}/disponibilidad`);
  }

  // Utilidad: Validar edad
  validarEdadUsuario(edadUsuario: number, edadMin: number, edadMax: number): boolean {
    return edadUsuario >= edadMin && edadUsuario <= edadMax;
  }
}
