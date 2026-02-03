import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { CreateAsignacionUseCase } from '../../domain/use-cases/create-asignacion.use-case';
import { GetAsignacionesUseCase } from '../../domain/use-cases/get-asignaciones.use-case';
import { DeleteAsignacionUseCase } from '../../domain/use-cases/delete-asignacion.use-case';
import { CreateAsignacionDto } from '../../application/dto/create-asignacion.dto';

@Controller('asignaciones')
export class AsignacionController {
  constructor(
    private readonly createAsignacionUseCase: CreateAsignacionUseCase,
    private readonly getAsignacionesUseCase: GetAsignacionesUseCase,
    private readonly deleteAsignacionUseCase: DeleteAsignacionUseCase,
  ) {}

  // POST /asignaciones
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateAsignacionDto) {
    return this.createAsignacionUseCase.execute(dto);
  }

  // GET /asignaciones?page=1&limit=10
  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.getAsignacionesUseCase.execute({
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    });
  }

  // DELETE /asignaciones/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return this.deleteAsignacionUseCase.execute(id);
  }
}