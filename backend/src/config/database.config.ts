import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { ConsultorEntity } from '../consultores/domain/entities/consultor.entity';
import { ProyectoEntity } from '../proyectos/domain/entities/proyecto.entity';
import { AsignacionEntity } from '../asignaciones/domain/entities/asignacion.entity';

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  entities: [ConsultorEntity, ProyectoEntity, AsignacionEntity],
  synchronize: true,
  logging: true,
});