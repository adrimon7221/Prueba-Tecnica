import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AsignacionEntity } from '../../domain/entities/asignacion.entity';
import type { IAsignacionRepository } from '../../domain/repositories/asignacion.repository.interface';
import type { PaginationParams, PaginatedResult } from '../../../consultores/domain/repositories/consultor.repository.interface';

@Injectable()
export class AsignacionTypeOrmRepository implements IAsignacionRepository {
  constructor(
    @InjectRepository(AsignacionEntity)
    private readonly repository: Repository<AsignacionEntity>,
  ) {}

  async create(asignacion: Partial<AsignacionEntity>): Promise<AsignacionEntity> {
    const entity = this.repository.create(asignacion);
    return this.repository.save(entity);
  }

  async findAll(params: PaginationParams): Promise<PaginatedResult<AsignacionEntity>> {
    const { page, limit } = params;
    const skip = (page - 1) * limit;

    const [data, total] = await this.repository.findAndCount({
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
      relations: ['consultor', 'proyecto'],
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string): Promise<AsignacionEntity | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['consultor', 'proyecto'],
    });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  /**
   * Solapamiento: dos rangos [A_inicio, A_fin] y [B_inicio, B_fin] se solapan si:
   *   A_inicio < B_fin  AND  A_fin > B_inicio
   */
  async findConflictingAssignments(
    consultorId: string,
    horaInicio: Date,
    horaFin: Date,
    excludeAsignacionId?: string,
  ): Promise<AsignacionEntity[]> {
    const queryBuilder = this.repository
      .createQueryBuilder('asignacion')
      .leftJoinAndSelect('asignacion.proyecto', 'proyecto')
      .where('asignacion.consultor_id = :consultorId', { consultorId })
      .andWhere('asignacion.hora_inicio < :horaFin', { horaFin })
      .andWhere('asignacion.hora_fin > :horaInicio', { horaInicio });

    if (excludeAsignacionId) {
      queryBuilder.andWhere('asignacion.id != :excludeId', { excludeId: excludeAsignacionId });
    }

    return queryBuilder.getMany();
  }
}