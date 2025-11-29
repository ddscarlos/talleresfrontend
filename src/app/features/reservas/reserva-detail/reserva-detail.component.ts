import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservasService } from '../../../services/reservas.service';
import { PagosService } from '../../../services/pagos.service';
import { Reserva, Pago } from '../../../models/reserva.model';

@Component({
  selector: 'app-reserva-detail',
  templateUrl: './reserva-detail.component.html',
  styleUrls: ['./reserva-detail.component.css']
})
export class ReservaDetailComponent implements OnInit {
  reserva: Reserva | null = null;
  pagos: Pago[] = [];
  loading = false;
  loadingPagos = false;
  errorMessage = '';
  procesandoPago = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reservasService: ReservasService,
    private pagosService: PagosService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadReserva(+id);
    }
  }

  loadReserva(id: number): void {
    this.loading = true;
    this.reservasService.getReservaById(id).subscribe(
      data => {
        this.reserva = data;
        this.loadPagos(id);
        this.loading = false;
      },
      error => {
        this.errorMessage = 'Error al cargar la reserva';
        this.loading = false;
      }
    );
  }

  loadPagos(reservaId: number): void {
    this.loadingPagos = true;
    this.reservasService.getPagosReserva(reservaId).subscribe(
      data => {
        this.pagos = data;
        this.loadingPagos = false;
      },
      error => {
        this.loadingPagos = false;
      }
    );
  }

  realizarPago(): void {
    if (!this.reserva) return;
    this.router.navigate(['/reservas', this.reserva.res_id, 'pago']);
  }

  descargarComprobante(): void {
    // TODO: Implementar descarga de comprobante
    alert('Función en desarrollo');
  }

  volver(): void {
    this.router.navigate(['/reservas']);
  }

  cancelarReserva(): void {
    if (!this.reserva) return;
    if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      this.reservasService.cancelarReserva(this.reserva.res_id, 'Cancelado por usuario').subscribe(
        () => {
          alert('Reserva cancelada correctamente');
          this.volver();
        },
        error => {
          this.errorMessage = 'Error al cancelar la reserva';
        }
      );
    }
  }

  getColorEstado(): string {
    if (!this.reserva || !this.reserva.estado) return '#6c757d';

    switch (this.reserva.estado.esr_nombre) {
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
