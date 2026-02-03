import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  IConsultorRepository,
  CONSULTOR_REPOSITORY,
} from '../repositories/consultor.repository.interface';
import { ConsultorEntity } from '../entities/consultor.entity';
import { UpdateConsultorDto } from '../../application/dto/update-consultor.dto';

@Injectable()
export class UpdateConsultorUseCase {
  constructor(
    @Inject(CONSULTOR_REPOSITORY)
    private readonly consultorRepository: IConsultorRepository,
  ) {}

  async execute(id: string, dto: UpdateConsultorDto): Promise<ConsultorEntity> {
    const updated = await this.consultorRepository.update(id, dto);
    if (!updated) {
      throw new NotFoundException(`Consultor con id "${id}" no encontrado`);
    }
    return updated;
  }
}