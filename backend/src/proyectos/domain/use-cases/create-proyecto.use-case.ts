import { Inject, Injectable } from '@nestjs/common';
import {
  IProyectoRepository,
  PROYECTO_REPOSITORY,
} from '../repositories/proyecto.repository.interface';
import { ProyectoEntity } from '../entities/proyecto.entity';
import { CreateProyectoDto } from '../../application/dto/create-proyecto.dto';

@Injectable()
export class CreateProyectoUseCase {
  constructor(
    @Inject(PROYECTO_REPOSITORY)
    private readonly proyectoRepository: IProyectoRepository,
  ) {}

  async execute(dto: CreateProyectoDto): Promise<ProyectoEntity> {
    return this.proyectoRepository.create({
      nombre: dto.nombre,
      descripcion: dto.descripcion,
      estado: dto.estado ?? 'activo',
      fechaInicio: new Date(dto.fechaInicio),
      fechaFin: new Date(dto.fechaFin),
    });
  }
}
