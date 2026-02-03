import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  IProyectoRepository,
  PROYECTO_REPOSITORY,
} from '../repositories/proyecto.repository.interface';
import { ProyectoEntity } from '../entities/proyecto.entity';

@Injectable()
export class GetProyectoByIdUseCase {
  constructor(
    @Inject(PROYECTO_REPOSITORY)
    private readonly proyectoRepository: IProyectoRepository,
  ) {}

  async execute(id: string): Promise<ProyectoEntity> {
    const proyecto = await this.proyectoRepository.findById(id);
    if (!proyecto) {
      throw new NotFoundException(`Proyecto con id "${id}" no encontrado`);
    }
    return proyecto;
  }
}