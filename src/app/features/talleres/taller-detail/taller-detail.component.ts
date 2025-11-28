import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TalleresService } from '../../../services/talleres.service';
import { ReservasService } from '../../../services/reservas.service';

@Component({
  selector: 'app-taller-detail',
  templateUrl: './taller-detail.component.html',
  styleUrls: ['./taller-detail.component.css']
})
export class TallerDetailComponent implements OnInit {
  taller: any;
  loading = false;
  errorMessage = '';
  reservando = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private talleresService: TalleresService,
    private reservasService: ReservasService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadTaller(+id);
    }
  }

  loadTaller(id: number): void {
    this.loading = true;
    this.talleresService.getTallerById(id).subscribe(
      data => {
        this.taller = data;
        this.loading = false;
      },
      error => {
        this.errorMessage = 'Error al cargar el taller';
        this.loading = false;
      }
    );
  }

  reservar(): void {
    if (!this.taller) return;

    this.reservando = true;
    this.reservasService.crearReserva({
      programacion_id: this.taller.id,
      cupos: 1,
      observaciones: ''
    }).subscribe(
      response => {
        this.reservando = false;
        this.router.navigate(['/reservas']);
      },
      error => {
        this.reservando = false;
        this.errorMessage = error.error && error.error.message ? error.error.message : 'Error al realizar la reserva';
      }
    );
  }

  volver(): void {
    this.router.navigate(['/talleres']);
  }
}
