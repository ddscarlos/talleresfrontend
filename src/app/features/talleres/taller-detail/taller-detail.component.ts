import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TalleresService } from '../../../services/talleres.service';
import { AuthService } from '../../../services/auth.service';
import { Taller } from '../../../models/taller.model';

@Component({
  selector: 'app-taller-detail',
  templateUrl: './taller-detail.component.html',
  styleUrls: ['./taller-detail.component.css']
})
export class TallerDetailComponent implements OnInit {
  taller: Taller | null = null;
  loading = false;
  errorMessage = '';
  usuarioEdad = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private talleresService: TalleresService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.calcularEdadUsuario();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadTaller(+id);
    }
  }

  calcularEdadUsuario(): void {
    const usuario = this.authService.currentUserValue;
    if (usuario && usuario.fecha_nacimiento) {
      this.usuarioEdad = this.talleresService.calcularEdad(usuario.fecha_nacimiento);
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

  puedeTomar(): boolean {
    if (!this.taller || this.usuarioEdad === 0) return true;
    return this.talleresService.validarEdadUsuario(
      this.usuarioEdad,
      this.taller.tal_edad_min,
      this.taller.tal_edad_max
    );
  }

  irASedes(): void {
    if (!this.taller) return;
    this.router.navigate(['/talleres', this.taller.tal_id, 'sedes']);
  }

  volver(): void {
    this.router.navigate(['/talleres']);
  }
}
