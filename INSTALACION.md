# 🚀 Guía de Instalación Rápida

## ⚡ Instalación Express (5 minutos)

### 1. Instalar Node.js 10.24.1

**Importante**: Angular 8 requiere Node.js 10.x

Descarga desde: https://nodejs.org/download/release/v10.24.1/

Para Windows, descarga: `node-v10.24.1-x64.msi`

### 2. Verificar instalación

```bash
node --version
# Debe mostrar: v10.24.1

npm --version
# Debe mostrar: 6.x.x
```

### 3. Instalar Angular CLI

```bash
npm install -g @angular/cli@8.3.29
```

Verifica:
```bash
ng version
```

### 4. Instalar dependencias del proyecto

```bash
cd C:\Users\ccuro.os\Downloads\MPL\SISTEMAS\talleres-angular
npm install
```

**Nota**: La instalación puede tomar 5-10 minutos dependiendo de tu conexión.

### 5. Configurar la URL del API

Edita: `src/environments/environment.ts`

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'  // ← Cambia esto
};
```

### 6. Ejecutar el proyecto

```bash
npm start
```

O alternativamente:
```bash
ng serve
```

La aplicación estará disponible en: **http://localhost:4200**

## 🐛 Solución de Problemas Comunes

### Error: "ng: command not found"

**Solución**: Reinstalar Angular CLI globalmente
```bash
npm install -g @angular/cli@8.3.29
```

### Error: Node version mismatch

**Solución**: Asegúrate de usar Node.js 10.24.1
```bash
node --version
```

Si tienes otra versión, desinstala Node.js y descarga la versión 10.24.1

### Error: "Cannot find module"

**Solución**: Eliminar node_modules y reinstalar
```bash
rmdir /s /q node_modules
npm install
```

### Error: Puerto 4200 en uso

**Solución**: Usar otro puerto
```bash
ng serve --port 4201
```

### Error de permisos en npm install

**Solución**: Ejecutar CMD como Administrador

## 📦 Compilar para Producción

```bash
npm run build
```

Los archivos estarán en: `dist/talleres-culturales/`

Para servir estos archivos, puedes usar:
- **IIS** (Windows Server)
- **Apache**
- **Nginx**
- Cualquier servidor web estático

## 🔧 Comandos Útiles

```bash
# Iniciar desarrollo
npm start

# Compilar para producción
npm run build

# Ejecutar tests
npm test

# Verificar código
npm run lint

# Limpiar instalación
npm cache clean --force
rmdir /s /q node_modules
npm install
```

## 📝 Siguiente Paso

Después de la instalación, lee:
- [README.md](README.md) - Documentación completa
- [GUIA-IMPLEMENTACION.md](GUIA-IMPLEMENTACION.md) - Guía para completar componentes

---

¿Problemas con la instalación? Verifica:
1. Versión de Node.js correcta (10.24.1)
2. Angular CLI instalado globalmente
3. Conexión a internet para descargar dependencias
4. Permisos de administrador si es necesario
