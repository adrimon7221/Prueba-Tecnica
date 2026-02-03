import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  IAsignacionRepository,
  ASIGNACION_REPOSITORY,
} from '../repositories/asignacion.repository.interface';

@Injectable()
export class DeleteAsignacionUseCase {
  constructor(
    @Inject(ASIGNACION_REPOSITORY)
    private readonly asignacionRepository: IAsignacionRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const deleted = await this.asignacionRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Asignación con id "${id}" no encontrada`);
    }
  }
}