# 🔌 API Endpoints - Talleres Culturales

## Base URL

```
Development:  http://localhost:3000/api
Production:   https://api.talleresculturales.com/api
```

---

## 🔐 Authentication Endpoints

### Register (Registro)
```http
POST /auth/register
Content-Type: application/json

{
  "tipo_documento": "DNI",
  "numero_documento": "12345678",
  "nombres": "Juan",
  "apellidos": "Pérez García",
  "fecha_nacimiento": "1990-05-15",
  "sexo": "M",
  "telefono": "987654321",
  "email": "juan@example.com",
  "password": "SecurePass123",
  "calle": "Av. Principal",
  "numero": "123",
  "distrito": "Miraflores",
  "ciudad": "Lima"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "per_id": 1,
      "email": "juan@example.com",
      "nombres": "Juan",
      "apellidos": "Pérez García"
    }
  }
}
```

---

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "SecurePass123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Inicio de sesión exitoso",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "per_id": 1,
      "email": "juan@example.com",
      "nombres": "Juan",
      "apellidos": "Pérez García",
      "fecha_nacimiento": "1990-05-15"
    }
  }
}
```

---

## 📚 Talleres Endpoints

### Get All Talleres (Listar talleres)
```http
GET /talleres
Authorization: Bearer {token}
```

**Query Parameters (Optional):**
```
?categoria=danza&page=1&limit=10&search=ballet
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Talleres obtenidos",
  "data": [
    {
      "tal_id": 1,
      "tal_nombre": "Ballet Clásico",
      "tal_descripcion": "Aprende los fundamentos del ballet",
      "tal_categoria": "danza",
      "tal_emoji": "💃",
      "tal_edad_min": 5,
      "tal_edad_max": 80,
      "tal_duracion": 60,
      "tal_precio_desde": 150.00,
      "tal_imagen_url": "/assets/ballet.jpg",
      "tal_estado": "activo"
    }
  ],
  "total": 15,
  "page": 1
}
```

---

### Get Taller by ID
```http
GET /talleres/1
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Taller obtenido",
  "data": {
    "tal_id": 1,
    "tal_nombre": "Ballet Clásico",
    "tal_descripcion": "Aprende los fundamentos del ballet",
    "tal_categoria": "danza",
    "tal_emoji": "💃",
    "tal_edad_min": 5,
    "tal_edad_max": 80,
    "tal_duracion": 60,
    "tal_precio_desde": 150.00,
    "tal_imagen_url": "/assets/ballet.jpg",
    "profesores": [
      {
        "per_id": 10,
        "nombres": "María",
        "apellidos": "González",
        "especialidad": "Ballet Clásico",
        "foto_url": "/assets/maria.jpg"
      }
    ]
  }
}
```

---

## 🏢 Sedes Endpoints

### Get All Sedes
```http
GET /sedes
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Sedes obtenidas",
  "data": [
    {
      "sed_id": 1,
      "sed_nombre": "Miraflores",
      "sed_direccion": "Av. Larco 123",
      "sed_distrito": "Miraflores",
      "sed_referencia": "Cerca de Parque Kennedy",
      "sed_estado": "activo"
    },
    {
      "sed_id": 2,
      "sed_nombre": "San Isidro",
      "sed_direccion": "Paseo de la República 456",
      "sed_distrito": "San Isidro",
      "sed_referencia": "Centro comercial",
      "sed_estado": "activo"
    }
  ]
}
```

---

### Get Sede by ID
```http
GET /sedes/1
Authorization: Bearer {token}
```

---

## 🎓 Servicios Endpoints

### Get Available Services
```http
GET /servicios
Authorization: Bearer {token}

?tallerID=1&sedeID=1
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Servicios obtenidos",
  "data": [
    {
      "ser_id": 1,
      "tal_id": 1,
      "sed_id": 1,
      "per_id_profesor": 10,
      "ser_precio": 180.00,
      "ser_aforo": 20,
      "ser_talento_requerido": false,
      "ser_estado": "activo",
      "profesor": {
        "per_id": 10,
        "nombres": "María",
        "apellidos": "González",
        "especialidad": "Ballet"
      },
      "horarios": [
        {
          "hor_id": 1,
          "hor_dia_semana": "Lunes",
          "hor_hora_inicio": "18:00",
          "hor_hora_fin": "19:30",
          "hor_estado": "activo"
        }
      ]
    }
  ]
}
```

---

### Get Service by ID
```http
GET /servicios/1
Authorization: Bearer {token}
```

---

## 📅 Programaciones Endpoints

### Get Programaciones
```http
GET /programaciones
Authorization: Bearer {token}

?serID=1&fechaInicio=2025-01-01&fechaFin=2025-12-31
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Programaciones obtenidas",
  "data": [
    {
      "prg_id": 1,
      "ser_id": 1,
      "prg_fecha_inicio": "2025-01-15",
      "prg_fecha_fin": "2025-02-15",
      "prg_aforo_disponible": 15,
      "prg_bloqueado": false,
      "prg_estado": "activo"
    }
  ]
}
```

---

## 📋 Reservas Endpoints

### Create Reserva
```http
POST /reservas
Authorization: Bearer {token}
Content-Type: application/json

{
  "per_id": 1,
  "prg_id": 1,
  "res_cupos": 2,
  "res_observaciones": "Sin restricciones dietéticas"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Reserva creada exitosamente",
  "data": {
    "res_id": 1,
    "per_id": 1,
    "prg_id": 1,
    "res_numero": "RES-2025-00001",
    "res_cupos": 2,
    "res_precio_total": 360.00,
    "esr_id": 1,
    "res_observaciones": "Sin restricciones dietéticas",
    "usuario_registro": "2025-01-10T10:30:00Z"
  }
}
```

---

### Get My Reservas
```http
GET /reservas/mis-reservas
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Mis reservas",
  "data": [
    {
      "res_id": 1,
      "res_numero": "RES-2025-00001",
      "taller": {
        "tal_nombre": "Ballet Clásico",
        "tal_emoji": "💃"
      },
      "sede": {
        "sed_nombre": "Miraflores"
      },
      "programacion": {
        "prg_fecha_inicio": "2025-01-15",
        "prg_fecha_fin": "2025-02-15"
      },
      "res_cupos": 2,
      "res_precio_total": 360.00,
      "estado": {
        "esr_id": 1,
        "esr_nombre": "Confirmada",
        "esr_color": "success"
      }
    }
  ]
}
```

---

### Get Reserva by ID
```http
GET /reservas/1
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Reserva obtenida",
  "data": {
    "res_id": 1,
    "res_numero": "RES-2025-00001",
    "per_id": 1,
    "prg_id": 1,
    "res_cupos": 2,
    "res_precio_total": 360.00,
    "res_observaciones": "Sin restricciones",
    "usuario_registro": "2025-01-10T10:30:00Z",
    "estado": {
      "esr_id": 1,
      "esr_nombre": "Confirmada",
      "esr_descripcion": "Reserva confirmada",
      "esr_color": "success"
    },
    "taller": {
      "tal_id": 1,
      "tal_nombre": "Ballet Clásico",
      "tal_precio_desde": 150.00
    },
    "profesor": {
      "per_id": 10,
      "nombres": "María",
      "apellidos": "González"
    },
    "pagos": [
      {
        "pag_id": 1,
        "monto": 360.00,
        "estado": "procesado",
        "fecha_pago": "2025-01-10T11:00:00Z"
      }
    ]
  }
}
```

---

### Cancel Reserva
```http
PUT /reservas/1/cancelar
Authorization: Bearer {token}
Content-Type: application/json

{}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Reserva cancelada exitosamente",
  "data": {
    "res_id": 1,
    "estado": {
      "esr_id": 3,
      "esr_nombre": "Cancelada"
    }
  }
}
```

---

### Update Reserva Estado
```http
PUT /reservas/1/estado
Authorization: Bearer {token}
Content-Type: application/json

{
  "esr_id": 2
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Estado de reserva actualizado",
  "data": {
    "res_id": 1,
    "estado": {
      "esr_id": 2,
      "esr_nombre": "Pendiente"
    }
  }
}
```

---

## 💳 Pagos Endpoints

### Create/Register Pago
```http
POST /pagos
Authorization: Bearer {token}
Content-Type: multipart/form-data

resID: 1
tpa_id: 1
monto: 360.00
moneda: PEN
codigo_autorizacion: AUTH123456
voucher: [file object]
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Pago registrado exitosamente",
  "data": {
    "pag_id": 1,
    "res_id": 1,
    "tpa_id": 1,
    "monto": 360.00,
    "moneda": "PEN",
    "codigo_autorizacion": "AUTH123456",
    "codigo_operacion": "OP-2025-00001",
    "voucher_url": "/uploads/voucher_2025_01_10.pdf",
    "estado": "pendiente",
    "fecha_registro": "2025-01-10T11:00:00Z"
  }
}
```

---

### Get Pago by ID
```http
GET /pagos/1
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Pago obtenido",
  "data": {
    "pag_id": 1,
    "res_id": 1,
    "monto": 360.00,
    "moneda": "PEN",
    "tipo_pago": {
      "tpa_id": 1,
      "tpa_nombre": "Transferencia Bancaria",
      "tpa_icono": "ri-bank-card-line"
    },
    "codigo_autorizacion": "AUTH123456",
    "codigo_operacion": "OP-2025-00001",
    "voucher_url": "/uploads/voucher_2025_01_10.pdf",
    "estado": "pendiente",
    "fecha_registro": "2025-01-10T11:00:00Z"
  }
}
```

---

### Get Pagos by Reserva
```http
GET /pagos?resID=1
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Pagos obtenidos",
  "data": [
    {
      "pag_id": 1,
      "res_id": 1,
      "monto": 360.00,
      "estado": "procesado",
      "fecha_pago": "2025-01-10T11:00:00Z"
    }
  ]
}
```

---

### Process Pago
```http
PUT /pagos/1/procesar
Authorization: Bearer {token}
Content-Type: application/json

{
  "codigo_confirmacion": "CONF123456"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Pago procesado exitosamente",
  "data": {
    "pag_id": 1,
    "estado": "procesado",
    "fecha_pago": "2025-01-10T11:15:00Z",
    "recibo_url": "/receipts/REC-2025-00001.pdf"
  }
}
```

---

## 🔄 Request/Response Format Standards

### Success Response (200, 201)
```json
{
  "success": true,
  "message": "Descripción del éxito",
  "data": { }
}
```

### Error Response (4xx, 5xx)
```json
{
  "success": false,
  "message": "Descripción del error",
  "errors": ["Error detail 1", "Error detail 2"]
}
```

### Status Codes
| Code | Meaning |
|------|---------|
| 200 | OK - Exitoso |
| 201 | Created - Recurso creado |
| 400 | Bad Request - Datos inválidos |
| 401 | Unauthorized - Token inválido/expirado |
| 403 | Forbidden - Sin permisos |
| 404 | Not Found - Recurso no existe |
| 500 | Internal Server Error - Error del servidor |

---

## 🔐 Authentication Headers

Todos los endpoints protegidos requieren:

```http
Authorization: Bearer {token}
```

**Donde `{token}` es el JWT recibido en login/register**

---

## 📝 Tipos de Documento Válidos

```
DNI
PASAPORTE
CARNET_EXTRANJERIA
RUC
```

---

## 🏷️ Estados de Reserva

```
1: Pendiente
2: Confirmada
3: Cancelada
4: Completada
```

---

## 💰 Tipos de Pago

```
1: Efectivo
2: Tarjeta Crédito/Débito
3: Transferencia Bancaria
4: Billetera Digital
```

---

## 📱 Monedas Soportadas

```
PEN: Soles peruanos
USD: Dólares estadounidenses
```

---

## 🏷️ Categorías de Talleres

```
danza
teatro
musica
artes_visuales
bienestar
literatura
```

---

## 📞 Support

Para dudas sobre los endpoints, contactar:
- Email: api-support@talleresculturales.com
- Documentación: [URL de Swagger/OpenAPI]

---

**Versión de API**: 1.0.0  
**Última actualización**: 2025
