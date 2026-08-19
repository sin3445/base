import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateClienteDto {
  @ApiProperty({ example: 'Juan Pérez', description: 'Nombre del cliente' })
  nombre: string;

  @ApiPropertyOptional({ example: '+123456789', description: 'Teléfono del cliente' })
  telefono?: string;

  @ApiProperty({ example: 1, description: 'ID del usuario creador' })
  usuarioId: number;
}
