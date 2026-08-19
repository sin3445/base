import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty()
  nombre: string;

  @ApiProperty()
  correo: string;

  @ApiProperty()
  contrasena: string;
}
