import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  IProyectoRepository,
  PROYECTO_REPOSITORY,
} from '../repositories/proyecto.repository.interface';
import { ProyectoEntity } from '../entities/proyecto.entity';
import { UpdateProyectoDto } from '../../application/dto/update-proyecto.dto';

@Injectable()
export class UpdateProyectoUseCase {
  constructor(
    @Inject(PROYECTO_REPOSITORY)
    private readonly proyectoRepository: IProyectoRepository,
  ) {}

  async execute(id: string, dto: UpdateProyectoDto): Promise<ProyectoEntity> {
    const updated = await this.proyectoRepository.update(id, {
      nombre: dto.nombre,
      descripcion: dto.descripcion,
      estado: dto.estado,
      fechaInicio: dto.fechaInicio ? new Date(dto.fechaInicio) : undefined,
      fechaFin: dto.fechaFin ? new Date(dto.fechaFin) : undefined,
    });
    if (!updated) {
      throw new NotFoundException(`Proyecto con id "${id}" no encontrado`);
    }
    return updated;
  }
}
