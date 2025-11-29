import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservasService } from '../../../services/reservas.service';
import { Reserva } from '../../../models/reserva.model';

@Component({
  selector: 'app-reservas-list',
  templateUrl: './reservas-list.component.html',
  styleUrls: ['./reservas-list.component.css']
})
export class ReservasListComponent implements OnInit {
  reservas: Reserva[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';
  filtroEstado: string = '';

  estados = [
    { id: '', nombre: 'Todas' },
    { id: 'PENDIENTE', nombre: 'Pendientes' },
    { id: 'CONFIRMADA', nombre: 'Confirmadas' },
    { id: 'COMPLETADA', nombre: 'Completadas' },
    { id: 'CANCELADA', nombre: 'Canceladas' }
  ];

  constructor(
    private reservasService: ReservasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadReservas();
  }

  loadReservas(): void {
    this.loading = true;
    this.errorMessage = '';
    this.reservasService.getMisReservas().subscribe(
      data => {
        this.reservas = data;
        this.loading = false;
      },
      error => {
        this.errorMessage = 'Error al cargar las reservas';
        this.loading = false;
      }
    );
  }

  obtenerReservasFiltradas(): Reserva[] {
    if (!this.filtroEstado) {
      return this.reservas;
    }
    return this.reservas.filter(r => r.estado && r.estado.esr_nombre === this.filtroEstado);
  }

  verDetalle(id: number): void {
    this.router.navigate(['/reservas', id]);
  }

  descargarPDF(id: number): void {
    // TODO: Implementar descarga de PDF
    alert('Función en desarrollo');
  }

  cancelarReserva(id: number): void {
    if (confirm('¿Estás seguro de que deseas cancelar esta reserva? Esta acción no se puede deshacer.')) {
      this.reservasService.cancelarReserva(id, 'Cancelado por usuario').subscribe(
        () => {
          this.successMessage = 'Reserva cancelada correctamente';
          setTimeout(() => {
            this.successMessage = '';
            this.loadReservas();
          }, 2000);
        },
        error => {
          this.errorMessage = 'Error al cancelar la reserva';
        }
      );
    }
  }

  realizarPago(id: number): void {
    this.router.navigate(['/reservas', id, 'pago']);
  }

  getColorEstado(estado: string): string {
    switch (estado) {
      case 'PENDIENTE': return '#ffc107';
      case 'CONFIRMADA': return '#28a745';
      case 'COMPLETADA': return '#17a2b8';
      case 'CANCELADA': return '#dc3545';
      default: return '#6c757d';
    }
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'confirmada':
        return 'estado-confirmada';
      case 'pendiente':
        return 'estado-pendiente';
      case 'cancelada':
        return 'estado-cancelada';
      default:
        return '';
    }
  }
}
