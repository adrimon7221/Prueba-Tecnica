import { Inject, Injectable } from '@nestjs/common';
import {
  IAsignacionRepository,
  ASIGNACION_REPOSITORY,
} from '../repositories/asignacion.repository.interface';
import { AsignacionEntity } from '../entities/asignacion.entity';
import { PaginationParams, PaginatedResult } from '../../../consultores/domain/repositories/consultor.repository.interface';

@Injectable()
export class GetAsignacionesUseCase {
  constructor(
    @Inject(ASIGNACION_REPOSITORY)
    private readonly asignacionRepository: IAsignacionRepository,
  ) {}

  async execute(params: PaginationParams): Promise<PaginatedResult<AsignacionEntity>> {
    return this.asignacionRepository.findAll(params);
  }
}