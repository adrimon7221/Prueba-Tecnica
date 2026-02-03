import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  IProyectoRepository,
  PROYECTO_REPOSITORY,
} from '../repositories/proyecto.repository.interface';

@Injectable()
export class DeleteProyectoUseCase {
  constructor(
    @Inject(PROYECTO_REPOSITORY)
    private readonly proyectoRepository: IProyectoRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const deleted = await this.proyectoRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Proyecto con id "${id}" no encontrado`);
    }
  }
}