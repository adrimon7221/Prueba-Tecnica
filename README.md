# TynpuAllocations

Mini-aplicación para gestionar la asignación de desarrolladores a proyectos.

## Descripción del Proyecto

TynpuAllocations es una aplicación full-stack que permite gestionar la asignación de consultores a proyectos, con validación de cruces de horarios para evitar conflictos en las asignaciones.

## Arquitectura

El proyecto sigue una arquitectura separada en:

- **Backend**: API REST construida con NestJS y PostgreSQL
- **Mobile**: Aplicación móvil desarrollada con React Native y TypeScript

## Requisimientos Técnicos Implementados

### Backend (NestJS + PostgreSQL)
- ✅ API REST con CRUD para Consultores y Proyectos
- ✅ Lógica de negocio que previene asignaciones simultáneas
- ✅ Base de datos PostgreSQL con TypeORM
- ✅ Arquitectura Hexagonal/Clean Architecture
- ✅ Validación de cruces de horarios

### Mobile (React Native + TypeScript)
- ✅ Listado con scroll infinito para proyectos y consultores
- ✅ Formularios con React Hook Form para asignaciones
- ✅ UI/UX limpia con TailwindCSS
- ✅ Navegación con Expo Router
- ✅ Manejo de estado y caching

## Estructura del Proyecto

```
TynpuAllocations/
├── backend/                 # API NestJS
│   ├── src/
│   │   ├── consultores/     # Módulo de consultores
│   │   ├── proyectos/       # Módulo de proyectos
│   │   ├── asignaciones/    # Módulo de asignaciones
│   │   ├── config/          # Configuración de base de datos
│   │   └── shared/          # Componentes compartidos
│   ├── package.json
│   └── README.md
└── mobile/                  # App React Native
    ├── app/                 # Navegación y pantallas principales
    ├── components/          # Componentes UI reutilizables
    ├── services/            # Servicios de API
    ├── hooks/               # Custom hooks
    ├── types/               # Definiciones TypeScript
    └── package.json
```

## Configuración y Ejecución

### Backend

1. **Instalar dependencias**
   ```bash
   cd backend
   npm install
   ```

2. **Configurar variables de entorno**
   ```bash
   # Crear archivo .env con la configuración de PostgreSQL
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=tynpu
   DB_PASSWORD=tynpu
   DB_DATABASE=tynpu_allocations
   ```

3. **Ejecutar la aplicación**
   ```bash
   # Modo desarrollo
   npm run start:dev
   
   # Modo producción
   npm run build
   npm run start:prod
   ```

4. **Ejecutar tests**
   ```bash
   npm run test
   npm run test:e2e
   npm run test:cov
   ```

### Mobile

1. **Instalar dependencias**
   ```bash
   cd mobile
   npm install
   ```

2. **Iniciar la aplicación**
   ```bash
   npm start
   ```

3. **Ejecutar en plataformas específicas**
   ```bash
   npm run android    # Para Android
   npm run ios        # Para iOS
   npm run web        # Para web
   ```

## Características Principales

### Gestión de Consultores
- Crear, leer, actualizar y eliminar consultores
- Información de disponibilidad y horarios

### Gestión de Proyectos
- CRUD completo para proyectos
- Información de fechas y requerimientos

### Sistema de Asignaciones
- Asignación de consultores a proyectos
- Validación automática de cruces de horarios
- Prevención de sobreasignaciones

### Interfaz Móvil
- Navegación intuitiva con tabs
- Scroll infinito para listados grandes
- Formularios optimizados con validación
- Diseño responsivo con TailwindCSS

## Tecnologías Utilizadas

### Backend
- **NestJS**: Framework para Node.js
- **TypeScript**: Tipado estático
- **PostgreSQL**: Base de datos relacional
- **TypeORM**: ORM para TypeScript
- **Class Validator**: Validación de datos
- **Jest**: Testing framework

### Mobile
- **React Native**: Framework para apps móviles
- **TypeScript**: Tipado estático
- **Expo**: Plataforma de desarrollo
- **React Hook Form**: Manejo de formularios
- **TailwindCSS**: Framework de estilos
- **Axios**: Cliente HTTP
- **React Navigation**: Navegación

## API Endpoints

### Consultores
- `GET /consultores` - Listar consultores
- `POST /consultores` - Crear consultor
- `GET /consultores/:id` - Obtener consultor
- `PUT /consultores/:id` - Actualizar consultor
- `DELETE /consultores/:id` - Eliminar consultor

### Proyectos
- `GET /proyectos` - Listar proyectos
- `POST /proyectos` - Crear proyecto
- `GET /proyectos/:id` - Obtener proyecto
- `PUT /proyectos/:id` - Actualizar proyecto
- `DELETE /proyectos/:id` - Eliminar proyecto

### Asignaciones
- `GET /asignaciones` - Listar asignaciones
- `POST /asignaciones` - Crear asignación
- `GET /asignaciones/:id` - Obtener asignación
- `PUT /asignaciones/:id` - Actualizar asignación
- `DELETE /asignaciones/:id` - Eliminar asignación

## Validaciones de Negocio

El sistema implementa las siguientes validaciones:

1. **Cruce de horarios**: Un consultor no puede ser asignado a dos proyectos en el mismo período
2. **Disponibilidad**: Validación de fechas de inicio y fin
3. **Integridad referencial**: Verificación de existencia de consultores y proyectos

## Contribución

1. Fork del proyecto
2. Crear rama de características (`git checkout -b feature/nueva-caracteristica`)
3. Commit de cambios (`git commit -am 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Crear Pull Request

## Licencia

Este proyecto es parte de una prueba técnica y está licenciado bajo los términos especificados.
