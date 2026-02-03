import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { CreateProyectoUseCase } from '../../domain/use-cases/create-proyecto.use-case';
import { GetProyectosUseCase } from '../../domain/use-cases/get-proyectos.use-case';
import { GetProyectoByIdUseCase } from '../../domain/use-cases/get-proyecto-by-id.use-case';
import { UpdateProyectoUseCase } from '../../domain/use-cases/update-proyecto.use-case';
import { DeleteProyectoUseCase } from '../../domain/use-cases/delete-proyecto.use-case';
import { CreateProyectoDto } from '../../application/dto/create-proyecto.dto';
import { UpdateProyectoDto } from '../../application/dto/update-proyecto.dto';

@Controller('proyectos')
export class ProyectoController {
  constructor(
    private readonly createProyectoUseCase: CreateProyectoUseCase,
    private readonly getProyectosUseCase: GetProyectosUseCase,
    private readonly getProyectoByIdUseCase: GetProyectoByIdUseCase,
    private readonly updateProyectoUseCase: UpdateProyectoUseCase,
    private readonly deleteProyectoUseCase: DeleteProyectoUseCase,
  ) {}

  // POST /proyectos
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateProyectoDto) {
    return this.createProyectoUseCase.execute(dto);
  }

  // GET /proyectos?page=1&limit=10
  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.getProyectosUseCase.execute({
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    });
  }

  // GET /proyectos/:id
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.getProyectoByIdUseCase.execute(id);
  }

  // PUT /proyectos/:id
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateProyectoDto) {
    return this.updateProyectoUseCase.execute(id, dto);
  }

  // DELETE /proyectos/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return this.deleteProyectoUseCase.execute(id);
  }
}