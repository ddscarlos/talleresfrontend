# 📘 Guía de Implementación - Componentes Pendientes

Esta guía te ayudará a completar los componentes de features que faltan en el proyecto.

## ✅ Lo que YA está implementado:

1. ✅ Estructura base del proyecto Angular 8
2. ✅ Configuración de TypeScript y Angular CLI
3. ✅ Módulos Core y Shared
4. ✅ Routing principal con lazy loading
5. ✅ Modelos e interfaces de datos (Taller, Reserva, User)
6. ✅ Servicios para integración con API:
   - AuthService
   - TalleresService
   - ReservasService
   - PagosService
7. ✅ AuthGuard para protección de rutas
8. ✅ Componentes compartidos:
   - HeaderComponent
   - FooterComponent
   - LoadingSpinnerComponent

## 🔨 Lo que FALTA implementar:

### 1. Módulo Inicio

**Archivo**: `src/app/features/inicio/inicio.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio.component';

const routes: Routes = [
  { path: '', component: InicioComponent }
];

@NgModule({
  declarations: [InicioComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class InicioModule { }
```

**Archivo**: `src/app/features/inicio/inicio.component.ts`

```typescript
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  constructor(private router: Router) { }

  explorarTalleres(): void {
    this.router.navigate(['/talleres/catalogo']);
  }

  registrarse(): void {
    this.router.navigate(['/registro']);
  }
}
```

**Archivo**: `src/app/features/inicio/inicio.component.html`

Copia el contenido del archivo `talleres-inicio.html` y adapta:
- Cambia los `<a href>` por `[routerLink]` o `(click)="metodo()"`
- Mantén todos los estilos dentro de `inicio.component.css`

### 2. Módulo Auth (Registro)

**Archivo**: `src/app/features/auth/auth.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  { path: '', component: RegistroComponent }
];

@NgModule({
  declarations: [RegistroComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
```

**Archivo**: `src/app/features/auth/registro/registro.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { TIPOS_DOCUMENTO } from '../../../models/user.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup;
  tiposDocumento = TIPOS_DOCUMENTO;
  loading = false;
  error: string = '';

  // Indicadores de validación de contraseña
  passwordValidations = {
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      tipo_documento: ['DNI', Validators.required],
      numero_documento: ['', [Validators.required, Validators.minLength(8)]],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      sexo: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      terminos: [false, Validators.requiredTrue],
      // Campos opcionales
      departamento: [''],
      provincia: [''],
      distrito: [''],
      direccion: [''],
      referencia: ['']
    }, { validators: this.passwordMatchValidator });

    // Escuchar cambios en el campo password
    this.registroForm.get('password').valueChanges.subscribe(value => {
      this.validatePassword(value);
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null : { mismatch: true };
  }

  validatePassword(password: string): void {
    this.passwordValidations.minLength = password.length >= 8;
    this.passwordValidations.hasUpperCase = /[A-Z]/.test(password);
    this.passwordValidations.hasLowerCase = /[a-z]/.test(password);
    this.passwordValidations.hasNumber = /[0-9]/.test(password);
  }

  get isPasswordValid(): boolean {
    return Object.values(this.passwordValidations).every(v => v);
  }

  onSubmit(): void {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';

    const formData = { ...this.registroForm.value };
    delete formData.confirmPassword;
    delete formData.terminos;

    this.authService.register(formData).subscribe(
      response => {
        this.loading = false;
        this.router.navigate(['/talleres/catalogo']);
      },
      error => {
        this.loading = false;
        this.error = error.error?.message || 'Error al registrar usuario';
      }
    );
  }
}
```

### 3. Módulo Talleres

**Estructura de carpetas:**
```
features/talleres/
├── talleres.module.ts
├── catalogo/
│   ├── catalogo.component.ts
│   ├── catalogo.component.html
│   └── catalogo.component.css
├── seleccion-sede/
│   ├── seleccion-sede.component.ts
│   ├── seleccion-sede.component.html
│   └── seleccion-sede.component.css
└── calendario/
    ├── calendario.component.ts
    ├── calendario.component.html
    └── calendario.component.css
```

**Archivo**: `src/app/features/talleres/talleres.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { SeleccionSedeComponent } from './seleccion-sede/seleccion-sede.component';
import { CalendarioComponent } from './calendario/calendario.component';

const routes: Routes = [
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'sede/:tallerId', component: SeleccionSedeComponent },
  { path: 'calendario/:servicioId', component: CalendarioComponent }
];

@NgModule({
  declarations: [
    CatalogoComponent,
    SeleccionSedeComponent,
    CalendarioComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class TalleresModule { }
```

**Ejemplo**: `catalogo.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { TalleresService } from '../../../services/talleres.service';
import { Taller, CATEGORIAS } from '../../../models/taller.model';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  talleres: Taller[] = [];
  talleresFiltrados: Taller[] = [];
  categorias = CATEGORIAS;
  categoriaSeleccionada = 'todos';
  busqueda = '';
  loading = false;

  constructor(private talleresService: TalleresService) { }

  ngOnInit(): void {
    this.cargarTalleres();
  }

  cargarTalleres(): void {
    this.loading = true;
    this.talleresService.getTalleres().subscribe(
      data => {
        this.talleres = data;
        this.talleresFiltrados = data;
        this.loading = false;
      },
      error => {
        console.error('Error al cargar talleres:', error);
        this.loading = false;
      }
    );
  }

  filtrarPorCategoria(categoria: string): void {
    this.categoriaSeleccionada = categoria;
    this.aplicarFiltros();
  }

  buscar(): void {
    this.aplicarFiltros();
  }

  private aplicarFiltros(): void {
    let resultado = [...this.talleres];

    // Filtrar por categoría
    if (this.categoriaSeleccionada !== 'todos') {
      resultado = resultado.filter(t => t.tal_categoria === this.categoriaSeleccionada);
    }

    // Filtrar por búsqueda
    if (this.busqueda) {
      const termino = this.busqueda.toLowerCase();
      resultado = resultado.filter(t =>
        t.tal_nombre.toLowerCase().includes(termino) ||
        t.tal_descripcion.toLowerCase().includes(termino)
      );
    }

    this.talleresFiltrados = resultado;
  }
}
```

### 4. Módulo Reservas

Similar al módulo Talleres, crea:
- `confirmacion.component.ts`
- `pago.component.ts`
- `comprobante.component.ts`
- `mis-reservas.component.ts`

## 🎨 Migración de Estilos HTML a Angular

Para cada componente:

1. **Copia el HTML**:
   - Del archivo `.html` original
   - Pega en el `.component.html` de Angular

2. **Adapta las directivas**:
   - `<a href="...">` → `<a routerLink="...">` o `<a (click)="metodo()">`
   - `onclick="..."` → `(click)="metodo()"`
   - Añade `*ngIf`, `*ngFor` para lógica de template

3. **Copia los estilos**:
   - Del `<style>` en el HTML original
   - Pega en el `.component.css`

4. **Mueve la lógica JavaScript**:
   - Del `<script>` en el HTML original
   - Conviértelo a métodos TypeScript en el `.component.ts`

## 📦 Assets a Copiar

Copia desde los prototipos HTML a `src/assets/`:
```
src/assets/
├── css/
│   ├── bootstrap.min.css
│   ├── icons.min.css
│   └── custom.min.css
├── images/
│   ├── favicon.ico
│   ├── small/
│   │   ├── img-1.jpg
│   │   ├── img-2.jpg
│   │   └── ...
│   └── users/
│       ├── avatar-1.jpg
│       ├── avatar-2.jpg
│       └── ...
└── js/
    └── (si es necesario)
```

## 🧪 Testing

Para cada componente, crea su archivo de test:

```typescript
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogoComponent } from './catalogo.component';

describe('CatalogoComponent', () => {
  let component: CatalogoComponent;
  let fixture: ComponentFixture<CatalogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

## 🚀 Orden de Implementación Recomendado

1. **Módulo Inicio** (más simple)
2. **Módulo Auth** (registro)
3. **Módulo Talleres** (catálogo → sede → calendario)
4. **Módulo Reservas** (confirmación → pago → comprobante → mis reservas)

## 💡 Consejos

1. Usa los archivos HTML originales como referencia visual
2. Implementa un componente a la vez
3. Prueba cada componente antes de continuar
4. Usa el `LoadingSpinnerComponent` durante las llamadas HTTP
5. Maneja errores con mensajes claros al usuario

## 📞 Recursos Adicionales

- [Angular 8 Docs](https://v8.angular.io/docs)
- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.3)
- [RemixIcon](https://remixicon.com/)
- [RxJS 6 Docs](https://rxjs-dev.firebaseapp.com/)

---

¡Buena suerte con la implementación! 🚀
