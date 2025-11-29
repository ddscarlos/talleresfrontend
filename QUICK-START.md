# 🚀 Quick Start Guide - Talleres Culturales

## Inicio Rápido

### Paso 1: Instalación
```bash
# Clonar o descargar el proyecto
cd talleres-angular

# Instalar dependencias
npm install
```

### Paso 2: Configuración del Backend
Editar `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'  // Cambiar si es necesario
};
```

### Paso 3: Ejecutar la aplicación
```bash
npm start
```

La aplicación abrirá en `http://localhost:4200`

---

## 📍 Navegación Principal

### Rutas disponibles
| Ruta | Descripción | Protegida |
|------|-------------|-----------|
| `/` | Redirecciona a inicio | ❌ |
| `/inicio` | Página de bienvenida | ❌ |
| `/registro` | Registro de usuario | ❌ |
| `/registro/login` | Inicio de sesión | ❌ |
| `/talleres` | Catálogo de talleres | ✅ |
| `/talleres/:id` | Detalle de taller | ✅ |
| `/reservas` | Mis reservas | ✅ |
| `/reservas/:id` | Detalle de reserva | ✅ |

---

## 👤 Flujo de Usuario Típico

### 1. Primer acceso (nuevo usuario)
```
Inicio → Clic en "Registrarse" → Completa formulario → Sesión iniciada
```

### 2. Explorar talleres
```
/talleres → Busca por nombre → Filtra por categoría → Selecciona taller
```

### 3. Hacer reserva
```
Taller detail → Selecciona sede → Selecciona horario → Verifica edad → Crea reserva
```

### 4. Pagar reserva
```
/reservas → Entra a detalle → Selecciona tipo de pago → Sube comprobante → Procesa
```

---

## 🏗️ Estructura de Componentes

```
src/app/
├── core/
│   └── core.module.ts                    # Servicios singleton
├── features/
│   ├── auth/
│   │   ├── login/
│   │   │   ├── login.component.ts
│   │   │   ├── login.component.html
│   │   │   └── login.component.css
│   │   ├── registro/
│   │   │   ├── registro.component.ts
│   │   │   ├── registro.component.html
│   │   │   └── registro.component.css
│   │   ├── auth.module.ts
│   │   └── auth-routing.module.ts
│   ├── inicio/
│   │   ├── inicio.component.ts
│   │   ├── inicio.component.html
│   │   ├── inicio.component.css
│   │   ├── inicio.module.ts
│   │   └── inicio-routing.module.ts
│   ├── talleres/
│   │   ├── talleres-list/
│   │   │   ├── talleres-list.component.ts
│   │   │   ├── talleres-list.component.html
│   │   │   └── talleres-list.component.css
│   │   ├── taller-detail/
│   │   │   ├── taller-detail.component.ts
│   │   │   ├── taller-detail.component.html
│   │   │   └── taller-detail.component.css
│   │   ├── talleres.module.ts
│   │   └── talleres-routing.module.ts
│   └── reservas/
│       ├── reservas-list/
│       │   ├── reservas-list.component.ts
│       │   ├── reservas-list.component.html
│       │   └── reservas-list.component.css
│       ├── reserva-detail/
│       │   ├── reserva-detail.component.ts
│       │   ├── reserva-detail.component.html
│       │   └── reserva-detail.component.css
│       ├── reservas.module.ts
│       └── reservas-routing.module.ts
├── guards/
│   └── auth.guard.ts
├── models/
│   ├── taller.model.ts
│   ├── user.model.ts
│   └── reserva.model.ts
├── services/
│   ├── auth.service.ts
│   ├── talleres.service.ts
│   ├── reservas.service.ts
│   └── pagos.service.ts
├── shared/
│   ├── components/
│   │   ├── header/
│   │   ├── footer/
│   │   └── loading-spinner/
│   ├── pipes/
│   │   └── filter.pipe.ts
│   └── shared.module.ts
├── app.component.ts
├── app.component.html
├── app.component.css
├── app.module.ts
└── app-routing.module.ts
```

---

## 🔧 Servicios Disponibles

### AuthService
```typescript
// Login
login(email: string, password: string): Observable<LoginResponse>

// Registro
register(data: RegisterRequest): Observable<LoginResponse>

// Logout
logout(): void

// Verificar autenticación
isAuthenticated(): boolean

// Obtener token
getToken(): string | null

// Obtener usuario actual
getCurrentUser(): User | null
```

### TalleresService
```typescript
// Obtener todos los talleres
getTalleres(params?: any): Observable<Taller[]>

// Obtener taller por ID
getTallerById(id: number): Observable<Taller>

// Obtener sedes
getSedes(): Observable<Sede[]>

// Obtener servicios disponibles
getServiciosDisponibles(tallerID?: number): Observable<Servicio[]>

// Obtener programaciones
getProgramaciones(serID: number, fechaInicio: Date, fechaFin: Date): Observable<Programacion[]>

// Verificar disponibilidad
verificarDisponibilidad(prgID: number): Observable<boolean>
```

### ReservasService
```typescript
// Crear reserva
criarReserva(data: any): Observable<Reserva>

// Obtener mis reservas
getMisReservas(): Observable<Reserva[]>

// Obtener reserva por ID
getReservaById(id: number): Observable<Reserva>

// Cancelar reserva
cancelarReserva(id: number): Observable<any>

// Actualizar estado
actualizarEstado(id: number, estado: number): Observable<any>
```

### PagosService
```typescript
// Registrar pago
registrarPago(resID: number, data: FormData): Observable<Pago>

// Obtener pago por ID
getPagoById(id: number): Observable<Pago>

// Procesar pago
procesarPago(pagID: number): Observable<any>
```

---

## 🎨 Componentes Clave

### Header
- Navegación responsiva
- Usuario dropdown
- Logout
- Links condicionales según autenticación

### Footer
- 4 secciones (info, enlaces, sedes, contacto)
- Redes sociales
- Copyright

### Loading Spinner
- Overlay semi-transparente
- Animación de carga
- Muestra durante operaciones HTTP

### Filter Pipe
- Filtra talleres por búsqueda
- Busca en nombre, descripción, categoría
- Case-insensitive

---

## 📝 Modelos de Datos

### User
```typescript
interface User {
  per_id: number;
  tipo_documento: string;
  numero_documento: string;
  nombres: string;
  apellidos: string;
  fecha_nacimiento: Date;
  sexo: string;
  telefono: string;
  email: string;
  calle: string;
  numero: string;
  distrito: string;
  ciudad: string;
}
```

### Taller
```typescript
interface Taller {
  tal_id: number;
  tal_nombre: string;
  tal_descripcion: string;
  tal_categoria: string;
  tal_emoji: string;
  tal_edad_min: number;
  tal_edad_max: number;
  tal_duracion: number;
  tal_precio_desde: number;
  tal_imagen_url: string;
}
```

### Reserva
```typescript
interface Reserva {
  res_id: number;
  per_id: number;
  prg_id: number;
  res_numero: string;
  res_cupos: number;
  res_precio_total: number;
  esr_id: number;
  res_observaciones: string;
}
```

---

## 🌐 Integración con Backend

### Headers esperados en requests
```typescript
headers: {
  'Authorization': 'Bearer ' + token,
  'Content-Type': 'application/json'
}
```

### Formato de respuesta esperado
```typescript
{
  success: boolean;
  message: string;
  data: any;
  errors?: string[];
}
```

### Endpoints requeridos
```
POST   /auth/register          → LoginResponse
POST   /auth/login             → LoginResponse
GET    /talleres               → Taller[]
GET    /talleres/:id           → Taller
GET    /sedes                  → Sede[]
GET    /servicios              → Servicio[]
GET    /servicios/:id          → Servicio
GET    /programaciones         → Programacion[]
GET    /reservas/mis-reservas  → Reserva[]
GET    /reservas/:id           → Reserva
POST   /reservas               → Reserva
PUT    /reservas/:id/cancelar  → { success: boolean }
PUT    /reservas/:id/estado    → { success: boolean }
POST   /pagos                  → Pago (con FormData)
GET    /pagos/:id              → Pago
PUT    /pagos/:id/procesar     → { success: boolean }
```

---

## 🔐 Autenticación

### Tokens JWT
Los tokens se guardan en `localStorage` con key `authToken`

### Validar token
```typescript
const token = localStorage.getItem('authToken');
const isValid = !!token && !this.isTokenExpired(token);
```

### Limpiar sesión
```typescript
localStorage.removeItem('authToken');
localStorage.removeItem('currentUser');
```

---

## 🐛 Debugging

### Console logs útiles
```typescript
// Ver usuario actual
console.log(this.authService.getCurrentUser());

// Ver token
console.log(localStorage.getItem('authToken'));

// Ver observables
this.talleresService.getTalleres().subscribe(
  data => console.log('Talleres:', data)
);
```

### En DevTools
1. Pestaña **Network**: Ver requests a API
2. Pestaña **Storage**: Ver localStorage
3. Pestaña **Console**: Errores y logs

---

## 📱 Responsive Design

El proyecto usa Bootstrap 5 con breakpoints:
- **xs**: < 576px (mobile)
- **sm**: ≥ 576px (small tablet)
- **md**: ≥ 768px (tablet)
- **lg**: ≥ 992px (desktop)
- **xl**: ≥ 1200px (large desktop)

Clases útiles:
```html
<div class="container-fluid">          <!-- Full width -->
<div class="row g-3">                   <!-- Grid row con gap -->
<div class="col-md-6 col-lg-4">         <!-- Responsive columns -->
<div class="d-none d-md-block">         <!-- Hidden en móvil -->
<div class="d-md-none">                 <!-- Solo en móvil -->
```

---

## 🚀 Compilación para Producción

```bash
npm run build
# o
ng build --prod
```

Archivos compilados en: `dist/talleres-culturales/`

Para servir:
```bash
# Con servidor estático (ej: http-server)
npx http-server dist/talleres-culturales/

# O desplegar en hosting (Vercel, Netlify, etc)
```

---

## 📋 Checklist de Implementación

- [x] Modelos de datos completos
- [x] Servicios con métodos CRUD
- [x] Autenticación (login/registro)
- [x] Catálogo de talleres
- [x] Detalle de taller con reserva
- [x] Sistema de reservas
- [x] Sistema de pagos
- [x] Navegación responsiva
- [x] Guards de protección
- [x] Lazy loading de módulos
- [x] Formularios reactivos
- [x] Validación de datos
- [x] Loading spinner
- [x] Footer con contacto
- [x] Filtrado de talleres
- [x] Responsive design

---

## ❓ FAQ

**P: ¿Dónde está la API?**  
R: El proyecto es frontend solamente. Se debe implementar una API REST en el backend que implemente los endpoints listados arriba.

**P: ¿Cómo cambio el color principal?**  
R: Busca `#667eea` en los archivos CSS y templates. Es el color principal usado en el diseño.

**P: ¿Cómo agrego más categorías?**  
R: En `src/app/models/taller.model.ts`, actualiza la constante `CATEGORIAS`.

**P: ¿Cómo personalizo el footer?**  
R: Edita `src/app/shared/components/footer/footer.component.html`

**P: ¿Cómo agrego más campos al registro?**  
R: En `src/app/features/auth/registro/registro.component.ts`, agrega los FormControls y en el HTML los inputs.

---

## 🆘 Troubleshooting

| Problema | Solución |
|----------|----------|
| Módulos no encuentran servicios | Verificar que CoreModule esté importado en AppModule |
| Componentes no cargan | Verificar lazy loading en routing modules |
| Estilos de Bootstrap no aplican | Verificar que Bootstrap esté en angular.json styles |
| Token no persiste | Verificar que localStorage esté habilitado en browser |
| API retorna 404 | Verificar URL en environment.ts |

---

**Última actualización**: 2025  
**Versión**: 1.0.0  
**Status**: ✅ Listo para desarrollo
