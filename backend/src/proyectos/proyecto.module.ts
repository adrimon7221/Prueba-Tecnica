import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoEntity } from './domain/entities/proyecto.entity';
import { PROYECTO_REPOSITORY } from './domain/repositories/proyecto.repository.interface';
import { ProyectoTypeOrmRepository } from './infrastructure/adapters/proyecto-typeorm.repository';
import { ProyectoController } from './infrastructure/controllers/proyecto.controller';
import { CreateProyectoUseCase } from './domain/use-cases/create-proyecto.use-case';
import { GetProyectosUseCase } from './domain/use-cases/get-proyectos.use-case';
import { GetProyectoByIdUseCase } from './domain/use-cases/get-proyecto-by-id.use-case';
import { UpdateProyectoUseCase } from './domain/use-cases/update-proyecto.use-case';
import { DeleteProyectoUseCase } from './domain/use-cases/delete-proyecto.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([ProyectoEntity])],
  controllers: [ProyectoController],
  providers: [
    {
      provide: PROYECTO_REPOSITORY,
      useClass: ProyectoTypeOrmRepository,
    },
    CreateProyectoUseCase,
    GetProyectosUseCase,
    GetProyectoByIdUseCase,
    UpdateProyectoUseCase,
    DeleteProyectoUseCase,
  ],
  exports: [
    GetProyectoByIdUseCase,
    GetProyectosUseCase,
  ],
})
export class ProyectoModule {}