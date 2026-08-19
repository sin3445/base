import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('pedidos')
@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo pedido' })
  @ApiResponse({ status: 201, description: 'El pedido ha sido creado exitosamente.' })
  create(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidosService.create(createPedidoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los pedidos' })
  findAll(@Query('usuarioId') usuarioId?: string) {
    return this.pedidosService.findAll(usuarioId ? +usuarioId : undefined);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un pedido por id' })
  findOne(@Param('id') id: string) {
    return this.pedidosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un pedido por id' })
  update(@Param('id') id: string, @Body() updatePedidoDto: Partial<CreatePedidoDto>) {
    return this.pedidosService.update(+id, updatePedidoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un pedido por id' })
  remove(@Param('id') id: string) {
    return this.pedidosService.remove(+id);
  }
}
