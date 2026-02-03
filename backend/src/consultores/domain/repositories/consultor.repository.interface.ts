import { ConsultorEntity } from '../entities/consultor.entity';

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const CONSULTOR_REPOSITORY = 'CONSULTOR_REPOSITORY';

export interface IConsultorRepository {
  create(consultor: Partial<ConsultorEntity>): Promise<ConsultorEntity>;
  findAll(params: PaginationParams): Promise<PaginatedResult<ConsultorEntity>>;
  findById(id: string): Promise<ConsultorEntity | null>;
  update(id: string, consultor: Partial<ConsultorEntity>): Promise<ConsultorEntity | null>;
  delete(id: string): Promise<boolean>;
}