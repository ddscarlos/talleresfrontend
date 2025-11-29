import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Taller, Servicio, Programacion, Sede, Horario } from '../models/taller.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TalleresService {
  private apiUrl = environment.apiUrl;
  private servicioSeleccionadoSubject = new BehaviorSubject<Servicio | null>(null);
  private programacionSeleccionadaSubject = new BehaviorSubject<Programacion | null>(null);

  public servicioSeleccionado$ = this.servicioSeleccionadoSubject.asObservable();
  public programacionSeleccionada$ = this.programacionSeleccionadaSubject.asObservable();

  constructor(private http: HttpClient) { }

  // GETTERS
  get servicioSeleccionado(): Servicio | null {
    return this.servicioSeleccionadoSubject.value;
  }

  get programacionSeleccionada(): Programacion | null {
    return this.programacionSeleccionadaSubject.value;
  }

  // SETTERS
  setServicioSeleccionado(servicio: Servicio | null): void {
    this.servicioSeleccionadoSubject.next(servicio);
  }

  setProgramacionSeleccionada(programacion: Programacion | null): void {
    this.programacionSeleccionadaSubject.next(programacion);
  }

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

  getSedesPorTaller(tallerId: number): Observable<Sede[]> {
    return this.http.get<Sede[]>(`${this.apiUrl}/talleres/${tallerId}/sedes`);
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
    ).pipe(
      tap(servicio => this.setServicioSeleccionado(servicio))
    );
  }

  // HORARIOS
  getHorarios(servicioId: number): Observable<Horario[]> {
    return this.http.get<Horario[]>(`${this.apiUrl}/servicios/${servicioId}/horarios`);
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

  getProgramacionById(id: number): Observable<Programacion> {
    return this.http.get<Programacion>(`${this.apiUrl}/programaciones/${id}`);
  }

  verificarDisponibilidad(programacionId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/programaciones/${programacionId}/disponibilidad`);
  }

  // VALIDACIONES
  validarEdadUsuario(edadUsuario: number, edadMin: number, edadMax: number): boolean {
    return edadUsuario >= edadMin && edadUsuario <= edadMax;
  }

  calcularEdad(fechaNacimiento: string): number {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }

    return edad;
  }

  // GENERAR DATOS DE PRUEBA (Para desarrollo)
  generarTalleresDePrueba(): Taller[] {
    return [
      {
        tal_id: 1,
        tal_nombre: 'Danza Contemporánea',
        tal_descripcion: 'Aprende movimientos modernos de danza',
        tal_categoria: 'danza',
        tal_emoji: '💃',
        tal_edad_min: 6,
        tal_edad_max: 70,
        tal_duracion: 60,
        tal_precio_desde: 150,
        tal_estado: 'A'
      },
      {
        tal_id: 2,
        tal_nombre: 'Guitarra Acústica',
        tal_descripcion: 'Aprende a tocar guitarra desde cero',
        tal_categoria: 'musica',
        tal_emoji: '🎸',
        tal_edad_min: 8,
        tal_edad_max: 65,
        tal_duracion: 90,
        tal_precio_desde: 200,
        tal_estado: 'A'
      },
      {
        tal_id: 3,
        tal_nombre: 'Pintura al Óleo',
        tal_descripcion: 'Técnicas clásicas de pintura',
        tal_categoria: 'artes-plasticas',
        tal_emoji: '🎨',
        tal_edad_min: 10,
        tal_edad_max: 80,
        tal_duracion: 120,
        tal_precio_desde: 180,
        tal_estado: 'A'
      },
      {
        tal_id: 4,
        tal_nombre: 'Teatro para Principiantes',
        tal_descripcion: 'Expresión dramática y actuación',
        tal_categoria: 'teatro',
        tal_emoji: '🎭',
        tal_edad_min: 7,
        tal_edad_max: 60,
        tal_duracion: 90,
        tal_precio_desde: 160,
        tal_estado: 'A'
      }
    ];
  }
}
