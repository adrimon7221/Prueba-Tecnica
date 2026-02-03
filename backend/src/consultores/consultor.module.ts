import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultorEntity } from './domain/entities/consultor.entity';
import { CONSULTOR_REPOSITORY } from './domain/repositories/consultor.repository.interface';
import { ConsultorTypeOrmRepository } from './infrastructure/adapters/consultor-typeorm.repository';
import { ConsultorController } from './infrastructure/controllers/consultor.controller';
import { CreateConsultorUseCase } from './domain/use-cases/create-consultor.use-case';
import { GetConsultoresUseCase } from './domain/use-cases/get-consultores.use-case';
import { GetConsultorByIdUseCase } from './domain/use-cases/get-consultor-by-id.use-case';
import { UpdateConsultorUseCase } from './domain/use-cases/update-consultor.use-case';
import { DeleteConsultorUseCase } from './domain/use-cases/delete-consultor.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([ConsultorEntity])],
  controllers: [ConsultorController],
  providers: [
    {
      provide: CONSULTOR_REPOSITORY,
      useClass: ConsultorTypeOrmRepository,
    },
    CreateConsultorUseCase,
    GetConsultoresUseCase,
    GetConsultorByIdUseCase,
    UpdateConsultorUseCase,
    DeleteConsultorUseCase,
  ],
  exports: [
    GetConsultorByIdUseCase,
    GetConsultoresUseCase,
  ],
})
export class ConsultorModule {}