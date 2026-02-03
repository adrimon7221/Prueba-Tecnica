import { AsignacionEntity } from '../entities/asignacion.entity';
import { PaginationParams, PaginatedResult } from '../../../consultores/domain/repositories/consultor.repository.interface';

export const ASIGNACION_REPOSITORY = 'ASIGNACION_REPOSITORY';

export interface IAsignacionRepository {
  create(asignacion: Partial<AsignacionEntity>): Promise<AsignacionEntity>;
  findAll(params: PaginationParams): Promise<PaginatedResult<AsignacionEntity>>;
  findById(id: string): Promise<AsignacionEntity | null>;
  delete(id: string): Promise<boolean>;

  // Método clave: busca asignaciones existentes de un consultor que se solapan con un horario dado
  findConflictingAssignments(
    consultorId: string,
    horaInicio: Date,
    horaFin: Date,
    excludeAsignacionId?: string,
  ): Promise<AsignacionEntity[]>;
}