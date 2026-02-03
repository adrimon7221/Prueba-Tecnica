import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConsultorEntity } from '../../domain/entities/consultor.entity';
import {
  IConsultorRepository,
  PaginationParams,
  PaginatedResult,
} from '../../domain/repositories/consultor.repository.interface';

@Injectable()
export class ConsultorTypeOrmRepository implements IConsultorRepository {
  constructor(
    @InjectRepository(ConsultorEntity)
    private readonly repository: Repository<ConsultorEntity>,
  ) {}

  async create(consultor: Partial<ConsultorEntity>): Promise<ConsultorEntity> {
    const entity = this.repository.create(consultor);
    return this.repository.save(entity);
  }

  async findAll(params: PaginationParams): Promise<PaginatedResult<ConsultorEntity>> {
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

  async findById(id: string): Promise<ConsultorEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: string, consultor: Partial<ConsultorEntity>): Promise<ConsultorEntity | null> {
    const existing = await this.findById(id);
    if (!existing) return null;

    Object.assign(existing, consultor);
    return this.repository.save(existing);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}