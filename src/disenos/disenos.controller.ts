import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { DisenosService } from './disenos.service';
import { CreateDisenoDto } from './dto/create-diseno.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('disenos')
@Controller('disenos')
export class DisenosController {
  constructor(private readonly disenosService: DisenosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo diseño 3D y vincularlo a un pedido' })
  @ApiResponse({ status: 201, description: 'El diseño 3D ha sido creado y vinculado al pedido exitosamente.' })
  @ApiResponse({ status: 400, description: 'Pedido no encontrado o JSON inválido.' })
  create(@Body() createDisenoDto: CreateDisenoDto) {
    return this.disenosService.create(createDisenoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los diseños 3D, opcionalmente filtrados por pedido' })
  @ApiQuery({ name: 'pedidoId', required: false, description: 'Filtrar diseños por ID de pedido' })
  findAll(@Query('pedidoId') pedidoId?: string) {
    return this.disenosService.findAll(pedidoId ? +pedidoId : undefined);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un diseño 3D por su ID' })
  @ApiResponse({ status: 200, description: 'Diseño encontrado.' })
  @ApiResponse({ status: 404, description: 'Diseño no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.disenosService.findOne(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un diseño 3D por su ID' })
  @ApiResponse({ status: 200, description: 'Diseño eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Diseño no encontrado.' })
  remove(@Param('id') id: string) {
    return this.disenosService.remove(+id);
  }
}
