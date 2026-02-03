import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ConsultorEntity } from '../../../consultores/domain/entities/consultor.entity';
import { ProyectoEntity } from '../../../proyectos/domain/entities/proyecto.entity';

@Entity('asignaciones')
export class AsignacionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ConsultorEntity, (consultor) => consultor.asignaciones, { eager: true })
  @JoinColumn({ name: 'consultor_id' })
  consultor: ConsultorEntity;

  @Column({ name: 'consultor_id' })
  consultorId: string;

  @ManyToOne(() => ProyectoEntity, (proyecto) => proyecto.asignaciones, { eager: true })
  @JoinColumn({ name: 'proyecto_id' })
  proyecto: ProyectoEntity;

  @Column({ name: 'proyecto_id' })
  proyectoId: string;

  // Horario de la asignación (inicio y fin)
  @Column({ type: 'timestamp', name: 'hora_inicio' })
  horaInicio: Date;

  @Column({ type: 'timestamp', name: 'hora_fin' })
  horaFin: Date;

  @Column({ type: 'varchar', nullable: true })
  notas: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}