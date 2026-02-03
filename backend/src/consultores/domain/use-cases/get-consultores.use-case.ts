import { Inject, Injectable } from '@nestjs/common';
import {
  IConsultorRepository,
  CONSULTOR_REPOSITORY,
  PaginationParams,
  PaginatedResult,
} from '../repositories/consultor.repository.interface';
import { ConsultorEntity } from '../entities/consultor.entity';

@Injectable()
export class GetConsultoresUseCase {
  constructor(
    @Inject(CONSULTOR_REPOSITORY)
    private readonly consultorRepository: IConsultorRepository,
  ) {}

  async execute(params: PaginationParams): Promise<PaginatedResult<ConsultorEntity>> {
    return this.consultorRepository.findAll(params);
  }
}