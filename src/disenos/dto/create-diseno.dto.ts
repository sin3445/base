import { ApiProperty } from '@nestjs/swagger';

export class CreateDisenoDto {
  @ApiProperty({
    example: 'Diseño mesa de roble v1',
    description: 'Nombre descriptivo del diseño 3D',
  })
  nombre: string;

  @ApiProperty({
    example: '{"mueble":"mesa","material":"roble","dimensiones":{"ancho":120,"alto":75,"profundidad":80},"color":"#8B4513"}',
    description: 'JSON con la configuración completa del diseño 3D exportada desde Unity',
  })
  configuracionJson: string;

  @ApiProperty({
    example: 1,
    description: 'ID del pedido al que se vincula este diseño',
  })
  pedidoId: number;
}
