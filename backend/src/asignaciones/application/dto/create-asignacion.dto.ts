import { IsString, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class CreateAsignacionDto {
  @IsString()
  @IsNotEmpty({ message: 'El consultorId es requerido' })
  consultorId: string;

  @IsString()
  @IsNotEmpty({ message: 'El proyectoId es requerido' })
  proyectoId: string;

  @IsDateString({}, { message: 'La hora de inicio debe ser una fecha válida' })
  @IsNotEmpty({ message: 'La hora de inicio es requerida' })
  horaInicio: string;

  @IsDateString({}, { message: 'La hora de fin debe ser una fecha válida' })
  @IsNotEmpty({ message: 'La hora de fin es requerida' })
  horaFin: string;

  @IsString()
  @IsOptional()
  notas?: string;
}