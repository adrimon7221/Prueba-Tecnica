import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './config/database.config';
import { ConsultorModule } from './consultores/consultor.module';
import { ProyectoModule } from './proyectos/proyecto.module';
import { AsignacionModule } from './asignaciones/asignacion.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => getDatabaseConfig(configService),
      inject: [ConfigService],
    }),
    ConsultorModule,
    ProyectoModule,
    AsignacionModule,
  ],
})
export class AppModule {}