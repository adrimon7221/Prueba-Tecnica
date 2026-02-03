import { Inject, Injectable } from '@nestjs/common';
import {
  IConsultorRepository,
  CONSULTOR_REPOSITORY,
} from '../repositories/consultor.repository.interface';
import { ConsultorEntity } from '../entities/consultor.entity';
import { CreateConsultorDto } from '../../application/dto/create-consultor.dto';

@Injectable()
export class CreateConsultorUseCase {
  constructor(
    @Inject(CONSULTOR_REPOSITORY)
    private readonly consultorRepository: IConsultorRepository,
  ) {}

  async execute(dto: CreateConsultorDto): Promise<ConsultorEntity> {
    return this.consultorRepository.create(dto);
  }
}