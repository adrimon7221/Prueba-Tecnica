import { ProyectoEntity } from '../entities/proyecto.entity';
import { PaginationParams, PaginatedResult } from '../../../consultores/domain/repositories/consultor.repository.interface';

export const PROYECTO_REPOSITORY = 'PROYECTO_REPOSITORY';

export interface IProyectoRepository {
  create(proyecto: Partial<ProyectoEntity>): Promise<ProyectoEntity>;
  findAll(params: PaginationParams): Promise<PaginatedResult<ProyectoEntity>>;
  findById(id: string): Promise<ProyectoEntity | null>;
  update(id: string, proyecto: Partial<ProyectoEntity>): Promise<ProyectoEntity | null>;
  delete(id: string): Promise<boolean>;
}