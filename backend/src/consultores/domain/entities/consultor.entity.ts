import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { AsignacionEntity } from '../../../asignaciones/domain/entities/asignacion.entity';

@Entity('consultores')
export class ConsultorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  telefono: string;

  @Column({ nullable: true })
  especialidad: string;

  @OneToMany(() => AsignacionEntity, (asignacion) => asignacion.consultor)
  asignaciones: AsignacionEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}