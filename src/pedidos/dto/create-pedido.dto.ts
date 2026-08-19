import { ApiProperty } from '@nestjs/swagger';

export class CreatePedidoDto {
  @ApiProperty({ example: 'Silla de roble', description: 'Descripción del pedido' })
  descripcion: string;

  @ApiProperty({ example: 'PENDIENTE', description: 'Estado del pedido', default: 'PENDIENTE' })
  estado?: string;

  @ApiProperty({ example: 150.50, description: 'Total del pedido' })
  total: number;

  @ApiProperty({ example: 1, description: 'ID del cliente' })
  clienteId: number;

  @ApiProperty({ example: 1, description: 'ID del usuario creador' })
  usuarioId: number;
}
