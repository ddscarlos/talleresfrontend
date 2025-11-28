import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservasService } from '../../../services/reservas.service';
import { PagosService } from '../../../services/pagos.service';

@Component({
  selector: 'app-reserva-detail',
  templateUrl: './reserva-detail.component.html',
  styleUrls: ['./reserva-detail.component.css']
})
export class ReservaDetailComponent implements OnInit {
  reserva: any;
  loading = false;
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
        this.loading = false;
      },
      error => {
        this.errorMessage = 'Error al cargar la reserva';
        this.loading = false;
      }
    );
  }

  realizarPago(): void {
    if (!this.reserva) return;

    this.procesandoPago = true;
    this.pagosService.procesarPago({ reservaId: this.reserva.id }).subscribe(
      response => {
        this.procesandoPago = false;
        alert('Pago realizado con éxito');
        this.loadReserva(this.reserva.id);
      },
      error => {
        this.procesandoPago = false;
        this.errorMessage = error.error && error.error.message ? error.error.message : 'Error al procesar el pago';
      }
    );
  }

  volver(): void {
    this.router.navigate(['/reservas']);
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
