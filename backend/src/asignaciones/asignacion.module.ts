import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsignacionEntity } from './domain/entities/asignacion.entity';
import { ASIGNACION_REPOSITORY } from './domain/repositories/asignacion.repository.interface';
import { AsignacionTypeOrmRepository } from './infrastructure/adapters/asignacion-typeorm.repository';
import { AsignacionController } from './infrastructure/controllers/asignacion.controller';
import { CreateAsignacionUseCase } from './domain/use-cases/create-asignacion.use-case';
import { GetAsignacionesUseCase } from './domain/use-cases/get-asignaciones.use-case';
import { DeleteAsignacionUseCase } from './domain/use-cases/delete-asignacion.use-case';
import { ConsultorModule } from '../consultores/consultor.module';
import { ProyectoModule } from '../proyectos/proyecto.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AsignacionEntity]),
    ConsultorModule,
    ProyectoModule,
  ],
  controllers: [AsignacionController],
  providers: [
    {
      provide: ASIGNACION_REPOSITORY,
      useClass: AsignacionTypeOrmRepository,
    },
    CreateAsignacionUseCase,
    GetAsignacionesUseCase,
    DeleteAsignacionUseCase,
  ],
})
export class AsignacionModule {}