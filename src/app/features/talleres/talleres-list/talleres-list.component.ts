import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TalleresService } from '../../../services/talleres.service';
import { AuthService } from '../../../services/auth.service';
import { Taller, CATEGORIAS } from '../../../models/taller.model';

@Component({
  selector: 'app-talleres-list',
  templateUrl: './talleres-list.component.html',
  styleUrls: ['./talleres-list.component.css']
})
export class TalleresListComponent implements OnInit {
  talleres: Taller[] = [];
  talleresFilters: Taller[] = [];
  loading = false;
  errorMessage = '';
  categorias = CATEGORIAS;
  filtroCategoria: string = '';
  filtroSearch: string = '';
  usuarioEdad: number = 0;
  Math = Math;

  paginacion = {
    pagina: 1,
    itemsPorPagina: 6,
    total: 0
  };

  constructor(
    private talleresService: TalleresService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.calcularEdadUsuario();
    this.loadTalleres();
  }

  calcularEdadUsuario(): void {
    const usuario = this.authService.currentUserValue;
    if (usuario && usuario.fecha_nacimiento) {
      this.usuarioEdad = this.talleresService.calcularEdad(usuario.fecha_nacimiento);
    }
  }

  loadTalleres(): void {
    this.loading = true;
    this.talleresService.getTalleres().subscribe(
      data => {
        this.talleres = data;
        this.aplicarFiltros();
        this.loading = false;
      },
      error => {
        this.errorMessage = 'Error al cargar los talleres';
        console.error(error);
        // Cargar datos de prueba si hay error
        this.talleres = this.talleresService.generarTalleresDePrueba();
        this.aplicarFiltros();
        this.loading = false;
      }
    );
  }

  aplicarFiltros(): void {
    this.talleresFilters = this.talleres.filter(taller => {
      // Filtro por categoría
      if (this.filtroCategoria && taller.tal_categoria !== this.filtroCategoria) {
        return false;
      }

      // Filtro por búsqueda
      if (this.filtroSearch) {
        const search = this.filtroSearch.toLowerCase();
        return taller.tal_nombre.toLowerCase().includes(search) ||
               taller.tal_descripcion.toLowerCase().includes(search);
      }

      return true;
    });

    this.paginacion.total = this.talleresFilters.length;
  }

  filtrarPorCategoria(categoria: string): void {
    this.filtroCategoria = this.filtroCategoria === categoria ? '' : categoria;
    this.paginacion.pagina = 1;
    this.aplicarFiltros();
  }

  buscar(termino: string): void {
    this.filtroSearch = termino;
    this.paginacion.pagina = 1;
    this.aplicarFiltros();
  }

  obtenerTalleresPaginados(): Taller[] {
    const inicio = (this.paginacion.pagina - 1) * this.paginacion.itemsPorPagina;
    const fin = inicio + this.paginacion.itemsPorPagina;
    return this.talleresFilters.slice(inicio, fin);
  }

  obtenerNumerosPaginas(): number[] {
    const totalPaginas = Math.ceil(this.paginacion.total / this.paginacion.itemsPorPagina);
    return Array.from({ length: totalPaginas }, (_, i) => i + 1);
  }

  irAPagina(pagina: number): void {
    this.paginacion.pagina = pagina;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  verDetalle(id: number): void {
    this.router.navigate(['/talleres', id]);
  }

  puedeTomar(taller: Taller): boolean {
    if (this.usuarioEdad === 0) return true;
    return this.talleresService.validarEdadUsuario(
      this.usuarioEdad,
      taller.tal_edad_min,
      taller.tal_edad_max
    );
  }

  obtenerEmoji(categoria: string): string {
    const cat = CATEGORIAS.find(c => c.id === categoria);
    return cat ? cat.emoji : '🎨';
  }
}
