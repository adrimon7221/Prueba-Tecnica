import { Inject, Injectable } from '@nestjs/common';
import {
  IProyectoRepository,
  PROYECTO_REPOSITORY,
} from '../repositories/proyecto.repository.interface';
import { ProyectoEntity } from '../entities/proyecto.entity';
import { PaginationParams, PaginatedResult } from '../../../consultores/domain/repositories/consultor.repository.interface';

@Injectable()
export class GetProyectosUseCase {
  constructor(
    @Inject(PROYECTO_REPOSITORY)
    private readonly proyectoRepository: IProyectoRepository,
  ) {}

  async execute(params: PaginationParams): Promise<PaginatedResult<ProyectoEntity>> {
    return this.proyectoRepository.findAll(params);
  }
}