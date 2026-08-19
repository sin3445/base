import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('clientes')
@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo cliente' })
  @ApiResponse({
    status: 201,
    description: 'El cliente ha sido creado exitosamente.',
  })
  create(@Body() createClienteDto: CreateClienteDto): any {
    return this.clientesService.create(createClienteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los clientes' })
  findAll(@Query('usuarioId') usuarioId?: string): any {
    return this.clientesService.findAll(usuarioId ? +usuarioId : undefined);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un cliente por id' })
  findOne(@Param('id') id: string): any {
    return this.clientesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un cliente por id' })
  update(@Param('id') id: string, @Body() updateClienteDto: Partial<CreateClienteDto>): any {
    return this.clientesService.update(+id, updateClienteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un cliente por id' })
  remove(@Param('id') id: string): any {
    return this.clientesService.remove(+id);
  }
}
