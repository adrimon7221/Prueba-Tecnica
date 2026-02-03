import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { AsignacionEntity } from '../../../asignaciones/domain/entities/asignacion.entity';

@Entity('proyectos')
export class ProyectoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column({ nullable: true, type: 'text' })
  descripcion: string;

  @Column({ type: 'varchar', nullable: true })
  estado: string; // 'activo' | 'inactivo' | 'completado'

  @Column({ type: 'timestamp' })
  fechaInicio: Date;

  @Column({ type: 'timestamp' })
  fechaFin: Date;

  @OneToMany(() => AsignacionEntity, (asignacion) => asignacion.proyecto)
  asignaciones: AsignacionEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}