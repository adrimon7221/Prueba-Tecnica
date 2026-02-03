import { Inject, Injectable } from '@nestjs/common';
import type { IAsignacionRepository } from '../repositories/asignacion.repository.interface';
import { ASIGNACION_REPOSITORY } from '../repositories/asignacion.repository.interface';
import { AsignacionEntity } from '../entities/asignacion.entity';
import { CreateAsignacionDto } from '../../application/dto/create-asignacion.dto';
import { ConflictException } from '../../../shared/exceptions/conflict.exception';
import { GetConsultorByIdUseCase } from '../../../consultores/domain/use-cases/get-consultor-by-id.use-case';
import { GetProyectoByIdUseCase } from '../../../proyectos/domain/use-cases/get-proyecto-by-id.use-case';

@Injectable()
export class CreateAsignacionUseCase {
  constructor(
    @Inject(ASIGNACION_REPOSITORY)
    private readonly asignacionRepository: IAsignacionRepository,
    private readonly getConsultorByIdUseCase: GetConsultorByIdUseCase,
    private readonly getProyectoByIdUseCase: GetProyectoByIdUseCase,
  ) {}

  async execute(dto: CreateAsignacionDto): Promise<AsignacionEntity> {
    // 1. Validar que el consultor existe
    await this.getConsultorByIdUseCase.execute(dto.consultorId);

    // 2. Validar que el proyecto existe
    await this.getProyectoByIdUseCase.execute(dto.proyectoId);

    const horaInicio = new Date(dto.horaInicio);
    const horaFin = new Date(dto.horaFin);

    // 3. Validar que horaFin > horaInicio
    if (horaFin <= horaInicio) {
      throw new ConflictException('La hora de fin debe ser mayor que la hora de inicio');
    }

    // 4. LÓGICA DE NEGOCIO: buscar conflictos de horario
    const conflictos = await this.asignacionRepository.findConflictingAssignments(
      dto.consultorId,
      horaInicio,
      horaFin,
    );

    if (conflictos.length > 0) {
      const proyectosConflicto = conflictos
        .map((c) => c.proyecto?.nombre || c.proyectoId)
        .join(', ');
      throw new ConflictException(
        `El consultor ya tiene asignaciones en ese horario en los proyectos: ${proyectosConflicto}`,
      );
    }

    // 5. Crear la asignación
    return this.asignacionRepository.create({
      consultorId: dto.consultorId,
      proyectoId: dto.proyectoId,
      horaInicio,
      horaFin,
      notas: dto.notas,
    });
  }
}