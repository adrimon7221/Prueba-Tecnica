import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProyectoEntity } from '../../domain/entities/proyecto.entity';
import { IProyectoRepository } from '../../domain/repositories/proyecto.repository.interface';
import { PaginationParams, PaginatedResult } from '../../../consultores/domain/repositories/consultor.repository.interface';

@Injectable()
export class ProyectoTypeOrmRepository implements IProyectoRepository {
  constructor(
    @InjectRepository(ProyectoEntity)
    private readonly repository: Repository<ProyectoEntity>,
  ) {}

  async create(proyecto: Partial<ProyectoEntity>): Promise<ProyectoEntity> {
    const entity = this.repository.create(proyecto);
    return this.repository.save(entity);
  }

  async findAll(params: PaginationParams): Promise<PaginatedResult<ProyectoEntity>> {
    const { page, limit } = params;
    const skip = (page - 1) * limit;

    const [data, total] = await this.repository.findAndCount({
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string): Promise<ProyectoEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: string, proyecto: Partial<ProyectoEntity>): Promise<ProyectoEntity | null> {
    const existing = await this.findById(id);
    if (!existing) return null;

    Object.assign(existing, proyecto);
    return this.repository.save(existing);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}