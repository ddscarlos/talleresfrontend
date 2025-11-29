import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  usuarioAutenticado = false;
  nombreUsuario = '';

  categorias = [
    { id: 'danza', nombre: 'Danza', emoji: '💃', descripcion: 'Aprende movimientos y expresión corporal' },
    { id: 'musica', nombre: 'Música', emoji: '🎵', descripcion: 'Domina instrumentos musicales' },
    { id: 'artes-plasticas', nombre: 'Artes Plásticas', emoji: '🎨', descripcion: 'Desarrolla tu creatividad artística' },
    { id: 'teatro', nombre: 'Teatro', emoji: '🎭', descripcion: 'Expresión dramática y actuación' },
    { id: 'bienestar', nombre: 'Bienestar', emoji: '🧘', descripcion: 'Yoga, meditación y mindfulness' },
    { id: 'literatura', nombre: 'Literatura', emoji: '📚', descripcion: 'Escritura creativa y lectura' }
  ];

  caracteristicas = [
    {
      icono: 'ri-presentation-2-line',
      titulo: 'Clases Profesionales',
      descripcion: 'Impartidas por instructores experimentados'
    },
    {
      icono: 'ri-group-2-line',
      titulo: 'Comunidad Activa',
      descripcion: 'Aprende con otros apasionados por el arte'
    },
    {
      icono: 'ri-calendar-2-line',
      titulo: 'Horarios Flexibles',
      descripcion: 'Elige el horario que mejor se adapte a ti'
    },
    {
      icono: 'ri-award-line',
      titulo: 'Certificados',
      descripcion: 'Obtén reconocimiento por tu participación'
    },
    {
      icono: 'ri-price-tag-3-line',
      titulo: 'Precios Accesibles',
      descripcion: 'Opciones asequibles para todos'
    },
    {
      icono: 'ri-contacts-line',
      titulo: 'Soporte Personalizado',
      descripcion: 'Atención al cliente 24/7'
    }
  ];

  testimonios = [
    {
      nombre: 'María López',
      rol: 'Estudiante de Danza',
      comentario: '¡Excelente plataforma! He mejorado mis habilidades de danza significativamente.',
      rating: 5
    },
    {
      nombre: 'Juan García',
      rol: 'Estudiante de Música',
      comentario: 'Los instructores son muy profesionales y dedicados. Muy recomendado.',
      rating: 5
    },
    {
      nombre: 'Laura Rodríguez',
      rol: 'Estudiante de Artes Plásticas',
      comentario: 'Ambiente muy acogedor y clases de calidad. Definitivamente vuelvo.',
      rating: 4
    }
  ];

  estadisticas = [
    { numero: '500+', label: 'Estudiantes Activos' },
    { numero: '30+', label: 'Talleres Disponibles' },
    { numero: '15+', label: 'Instructores Certificados' },
    { numero: '4.8★', label: 'Calificación Promedio' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const usuario = this.authService.currentUserValue;
    this.usuarioAutenticado = !!usuario;
    if (usuario) {
      this.nombreUsuario = usuario.nombres || 'Usuario';
    }
  }

  explorarTalleres(): void {
    if (this.usuarioAutenticado) {
      this.router.navigate(['/talleres']);
    } else {
      this.router.navigate(['/registro']);
    }
  }

  irALogin(): void {
    this.router.navigate(['/registro/login']);
  }

  irARegistro(): void {
    this.router.navigate(['/registro']);
  }

  verMasCategorias(): void {
    this.explorarTalleres();
  }
}
