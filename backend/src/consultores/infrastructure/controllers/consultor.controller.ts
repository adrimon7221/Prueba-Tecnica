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
import { CreateConsultorUseCase } from '../../domain/use-cases/create-consultor.use-case';
import { GetConsultoresUseCase } from '../../domain/use-cases/get-consultores.use-case';
import { GetConsultorByIdUseCase } from '../../domain/use-cases/get-consultor-by-id.use-case';
import { UpdateConsultorUseCase } from '../../domain/use-cases/update-consultor.use-case';
import { DeleteConsultorUseCase } from '../../domain/use-cases/delete-consultor.use-case';
import { CreateConsultorDto } from '../../application/dto/create-consultor.dto';
import { UpdateConsultorDto } from '../../application/dto/update-consultor.dto';

@Controller('consultores')
export class ConsultorController {
  constructor(
    private readonly createConsultorUseCase: CreateConsultorUseCase,
    private readonly getConsultoresUseCase: GetConsultoresUseCase,
    private readonly getConsultorByIdUseCase: GetConsultorByIdUseCase,
    private readonly updateConsultorUseCase: UpdateConsultorUseCase,
    private readonly deleteConsultorUseCase: DeleteConsultorUseCase,
  ) {}

  // POST /consultores
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateConsultorDto) {
    return this.createConsultorUseCase.execute(dto);
  }

  // GET /consultores?page=1&limit=10
  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.getConsultoresUseCase.execute({
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    });
  }

  // GET /consultores/:id
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.getConsultorByIdUseCase.execute(id);
  }

  // PUT /consultores/:id
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateConsultorDto) {
    return this.updateConsultorUseCase.execute(id, dto);
  }

  // DELETE /consultores/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return this.deleteConsultorUseCase.execute(id);
  }
}