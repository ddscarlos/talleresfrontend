# 🎨 Sistema de Talleres Culturales - Angular 8

Sistema web completo para la reserva de talleres culturales, desarrollado con **Angular 8.2.14** siguiendo las mejores prácticas de arquitectura y diseño.

## 📋 Descripción del Proyecto

Aplicación web que permite a los usuarios:
- Explorar un catálogo de talleres culturales
- Registrarse y autenticarse en el sistema
- Reservar cupos en talleres de su interés
- Seleccionar sedes y horarios
- Realizar pagos en línea
- Gestionar sus reservas

## 🚀 Tecnologías Utilizadas

### Frontend
- **Angular**: 8.2.14
- **Angular CLI**: 8.3.29
- **TypeScript**: 3.5.3
- **RxJS**: 6.4.0
- **Bootstrap**: 5.3.0
- **RemixIcon**: 3.5.0

### Backend (API REST - No incluido)
El proyecto requiere una API REST con los siguientes endpoints:

#### Autenticación
- `POST /api/auth/register` - Registro de usuarios
- `POST /api/auth/login` - Inicio de sesión

#### Talleres
- `GET /api/talleres` - Listar talleres
- `GET /api/talleres/:id` - Obtener taller por ID
- `GET /api/sedes` - Listar sedes
- `GET /api/servicios/disponibles` - Servicios por taller y sede
- `GET /api/programaciones` - Calendario de programaciones

#### Reservas
- `POST /api/reservas` - Crear reserva
- `GET /api/reservas/mis-reservas` - Listar mis reservas
- `PUT /api/reservas/:id/cancelar` - Cancelar reserva

#### Pagos
- `POST /api/pagos` - Registrar pago
- `GET /api/pagos/:id` - Obtener pago por ID

## 📁 Estructura del Proyecto

```
talleres-angular/
├── src/
│   ├── app/
│   │   ├── core/                    # Módulo core (singleton services)
│   │   │   └── core.module.ts
│   │   ├── shared/                  # Módulo compartido (componentes reutilizables)
│   │   │   ├── components/
│   │   │   │   ├── header/          # Header de navegación
│   │   │   │   ├── footer/          # Footer
│   │   │   │   └── loading-spinner/ # Spinner de carga
│   │   │   └── shared.module.ts
│   │   ├── features/                # Módulos de funcionalidades
│   │   │   ├── inicio/              # Página de inicio/landing
│   │   │   ├── auth/                # Autenticación y registro
│   │   │   ├── talleres/            # Catálogo y selección de talleres
│   │   │   └── reservas/            # Gestión de reservas y pagos
│   │   ├── models/                  # Interfaces y tipos
│   │   │   ├── taller.model.ts
│   │   │   ├── reserva.model.ts
│   │   │   └── user.model.ts
│   │   ├── services/                # Servicios
│   │   │   ├── auth.service.ts
│   │   │   ├── talleres.service.ts
│   │   │   ├── reservas.service.ts
│   │   │   └── pagos.service.ts
│   │   ├── guards/                  # Guards de rutas
│   │   │   └── auth.guard.ts
│   │   ├── app-routing.module.ts    # Routing principal
│   │   ├── app.component.ts
│   │   └── app.module.ts
│   ├── assets/                      # Recursos estáticos
│   ├── environments/                # Configuración de entornos
│   │   ├── environment.ts           # Desarrollo
│   │   └── environment.prod.ts      # Producción
│   ├── index.html
│   ├── main.ts
│   ├── polyfills.ts
│   └── styles.css                   # Estilos globales
├── angular.json
├── package.json
├── tsconfig.json
├── tslint.json
└── README.md
```

## 🔧 Instalación y Configuración

### Prerrequisitos

- **Node.js**: 10.24.1 (requerido para Angular 8)
- **npm**: 6.x o superior
- **Angular CLI**: 8.3.29

### Pasos de Instalación

1. **Clonar o descargar el proyecto**
```bash
cd C:\Users\ccuro.os\Downloads\MPL\SISTEMAS\talleres-angular
```

2. **Instalar Angular CLI globalmente** (si no lo tienes)
```bash
npm install -g @angular/cli@8.3.29
```

3. **Instalar dependencias del proyecto**
```bash
npm install
```

4. **Configurar la URL del API**

Edita el archivo `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'  // Cambia esta URL según tu backend
};
```

5. **Ejecutar el proyecto en desarrollo**
```bash
npm start
# o
ng serve
```

La aplicación estará disponible en: `http://localhost:4200`

6. **Compilar para producción**
```bash
npm run build
# o
ng build --prod
```

Los archivos compilados estarán en el directorio `dist/talleres-culturales`

## 🎯 Módulos de la Aplicación

### 1. Módulo Inicio (`/inicio`)
Landing page con:
- Hero section animado
- Categorías de talleres
- Características del sistema
- Estadísticas
- Testimonios
- Call to action

### 2. Módulo Auth (`/registro`)
- Formulario de registro completo
- Validaciones en tiempo real
- Validación de contraseña con requisitos
- Integración con API de autenticación

### 3. Módulo Talleres (`/talleres`)
Componentes:
- **Catálogo**: Listado de talleres con filtros y búsqueda
- **Selección de Sede**: Visualización de sedes disponibles por taller
- **Calendario**: Selección de fecha de inicio

Rutas:
- `/talleres/catalogo` - Catálogo de talleres
- `/talleres/sede/:id` - Selección de sede
- `/talleres/calendario/:servicioId` - Calendario de programación

### 4. Módulo Reservas (`/reservas`)
Componentes:
- **Confirmación**: Resumen y confirmación de reserva
- **Pago**: Proceso de pago con múltiples métodos
- **Comprobante**: Comprobante de reserva confirmada
- **Mis Reservas**: Gestión de reservas del usuario

Rutas:
- `/reservas/confirmar` - Confirmar reserva
- `/reservas/pago/:id` - Procesar pago
- `/reservas/comprobante/:id` - Ver comprobante
- `/reservas/mis-reservas` - Listar reservas

## 🔐 Autenticación

El sistema utiliza **JWT (JSON Web Tokens)** para la autenticación:

1. Al registrarse o iniciar sesión, el usuario recibe un token
2. El token se almacena en `localStorage`
3. El `AuthGuard` protege las rutas que requieren autenticación
4. El `AuthService` maneja el estado del usuario actual

## 📊 Modelos de Datos

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
  tal_estado: string;
}
```

### Servicio
```typescript
interface Servicio {
  ser_id: number;
  tal_id: number;
  sed_id: number;
  per_id_profesor: number;
  ser_precio: number;
  ser_aforo: number;
  ser_talento_requerido: boolean;
  ser_estado: string;
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
  res_observaciones?: string;
  esr_id: number;
  res_fecha_registro: string;
}
```

## 🎨 Diseño y UX

### Paleta de Colores
- **Primario**: `#667eea` → `#764ba2` (Gradiente azul-morado)
- **Éxito**: `#28a745` (Verde)
- **Advertencia**: `#ffc107` (Amarillo)
- **Peligro**: `#dc3545` (Rojo)

### Características de Diseño
- ✅ Diseño responsivo (Mobile-first)
- ✅ Gradientes modernos
- ✅ Animaciones suaves
- ✅ Iconografía consistente (RemixIcon)
- ✅ Cards con efectos hover
- ✅ Estados visuales claros

## 🔄 Flujo del Usuario

```
1. INICIO/LANDING PAGE
   ↓
2. REGISTRO/LOGIN
   ↓
3. CATÁLOGO DE TALLERES
   ↓
4. SELECCIÓN DE SEDE
   ↓
5. CALENDARIO DE PROGRAMACIÓN
   ↓
6. CONFIRMACIÓN DE RESERVA
   ↓
7. PROCESO DE PAGO
   ↓
8. COMPROBANTE DE RESERVA
   ↓
9. MIS RESERVAS (Gestión)
```

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm start                 # Ejecutar en modo desarrollo
ng serve --open          # Ejecutar y abrir navegador

# Compilación
npm run build            # Build de producción
ng build --prod          # Build de producción con optimizaciones

# Testing
npm test                 # Ejecutar tests unitarios
ng test                  # Tests con Karma

# Linting
npm run lint             # Verificar calidad de código
ng lint                  # TSLint
```

## 🚦 Estados de Reserva

| Estado ID | Nombre      | Color    | Descripción                    |
|-----------|-------------|----------|--------------------------------|
| 1         | PENDIENTE   | Amarillo | Esperando pago                 |
| 2         | CONFIRMADA  | Verde    | Pago realizado, reserva activa |
| 3         | CANCELADA   | Rojo     | Reserva cancelada              |

## 💳 Métodos de Pago Soportados

1. **Transferencia Bancaria** 🏦
2. **Tarjeta de Débito** 💳
3. **Tarjeta de Crédito** 💳
4. **Yape** 📱
5. **Plin** 📱
6. **Efectivo en Sede** 💵

## 📦 Dependencias Principales

```json
{
  "@angular/core": "8.2.14",
  "@angular/router": "8.2.14",
  "@angular/forms": "8.2.14",
  "@angular/common": "8.2.14",
  "rxjs": "6.4.0",
  "typescript": "3.5.3"
}
```

## 🛠️ Próximos Pasos de Desarrollo

Para completar el proyecto, debes:

1. **Crear los componentes de features**:
   - `features/inicio/inicio.component.ts`
   - `features/auth/registro/registro.component.ts`
   - `features/talleres/catalogo/catalogo.component.ts`
   - `features/talleres/seleccion-sede/seleccion-sede.component.ts`
   - `features/talleres/calendario/calendario.component.ts`
   - `features/reservas/confirmacion/confirmacion.component.ts`
   - `features/reservas/pago/pago.component.ts`
   - `features/reservas/comprobante/comprobante.component.ts`
   - `features/reservas/mis-reservas/mis-reservas.component.ts`

2. **Copiar los estilos y assets desde los prototipos HTML**:
   - Copiar imágenes a `src/assets/images/`
   - Adaptar los estilos CSS a los componentes Angular

3. **Implementar el Backend API**:
   - Node.js + Express + PostgreSQL
   - Implementar los stored procedures mencionados
   - Configurar CORS y autenticación JWT

4. **Testing**:
   - Tests unitarios con Jasmine/Karma
   - Tests end-to-end con Protractor

## 📞 Soporte

Para cualquier consulta o soporte:
- **Email**: soporte@talleresculturales.com
- **Teléfono**: (01) 234-5678

## 📄 Licencia

Este proyecto está desarrollado para el sistema de Talleres Culturales.

---

**Desarrollado con** ❤️ **para la cultura**

© 2025 Talleres Culturales. Todos los derechos reservados.
# talleresfrontend
