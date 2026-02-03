import { IsString, IsOptional, IsDateString, IsIn } from 'class-validator';

export class UpdateProyectoDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @IsIn(['activo', 'inactivo', 'completado'], { message: 'Estado inválido' })
  @IsOptional()
  estado?: string;

  @IsDateString({}, { message: 'La fecha de inicio debe ser una fecha válida' })
  @IsOptional()
  fechaInicio?: string;

  @IsDateString({}, { message: 'La fecha de fin debe ser una fecha válida' })
  @IsOptional()
  fechaFin?: string;
}