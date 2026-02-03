export interface Consultor {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  especialidad: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Proyecto {
  id: number;
  nombre: string;
  descripcion: string;
  estado: 'activo' | 'completado' | 'pausado';
  fechaInicio: string;
  fechaFin: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Asignacion {
  id: number;
  consultorId: number;
  proyectoId: number;
  horaInicio: string;
  horaFin: string;
  notas?: string;
  consultor?: Consultor;
  proyecto?: Proyecto;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateConsultorDto {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  especialidad: string;
}

export interface UpdateConsultorDto {
  nombre?: string;
  apellido?: string;
  email?: string;
  telefono?: string;
  especialidad?: string;
}

export interface CreateProyectoDto {
  nombre: string;
  descripcion: string;
  estado: 'activo' | 'completado' | 'pausado';
  fechaInicio: string;
  fechaFin: string;
}

export interface UpdateProyectoDto {
  nombre?: string;
  descripcion?: string;
  estado?: 'activo' | 'completado' | 'pausado';
  fechaInicio?: string;
  fechaFin?: string;
}

export interface CreateAsignacionDto {
  consultorId: number;
  proyectoId: number;
  horaInicio: string;
  horaFin: string;
  notas?: string;
}
