import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  IConsultorRepository,
  CONSULTOR_REPOSITORY,
} from '../repositories/consultor.repository.interface';
import { ConsultorEntity } from '../entities/consultor.entity';

@Injectable()
export class GetConsultorByIdUseCase {
  constructor(
    @Inject(CONSULTOR_REPOSITORY)
    private readonly consultorRepository: IConsultorRepository,
  ) {}

  async execute(id: string): Promise<ConsultorEntity> {
    const consultor = await this.consultorRepository.findById(id);
    if (!consultor) {
      throw new NotFoundException(`Consultor con id "${id}" no encontrado`);
    }
    return consultor;
  }
}