import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservasService } from '../../../services/reservas.service';

@Component({
  selector: 'app-reservas-list',
  templateUrl: './reservas-list.component.html',
  styleUrls: ['./reservas-list.component.css']
})
export class ReservasListComponent implements OnInit {
  reservas: any[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private reservasService: ReservasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadReservas();
  }

  loadReservas(): void {
    this.loading = true;
    this.reservasService.getReservas().subscribe(
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

  verDetalle(id: number): void {
    this.router.navigate(['/reservas', id]);
  }

  cancelarReserva(id: number): void {
    if (confirm('¿Está seguro de cancelar esta reserva?')) {
      this.reservasService.cancelarReserva(id).subscribe(
        () => {
          this.loadReservas();
        },
        error => {
          this.errorMessage = 'Error al cancelar la reserva';
        }
      );
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
