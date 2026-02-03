import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  IConsultorRepository,
  CONSULTOR_REPOSITORY,
} from '../repositories/consultor.repository.interface';

@Injectable()
export class DeleteConsultorUseCase {
  constructor(
    @Inject(CONSULTOR_REPOSITORY)
    private readonly consultorRepository: IConsultorRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const deleted = await this.consultorRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Consultor con id "${id}" no encontrado`);
    }
  }
}