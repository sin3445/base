import { Controller, Post, Body, Patch, Param, HttpException, HttpStatus } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('register')
  async register(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.register(createUsuarioDto);
  }

  @Post('login')
  async login(@Body() body: any) {
    const { correo, contrasena } = body;
    if (!correo || !contrasena) {
      throw new HttpException('Faltan credenciales', HttpStatus.BAD_REQUEST);
    }
    return this.usuariosService.login(correo, contrasena);
  }

  @Patch(':id')
  async updateProfile(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.updateProfile(+id, updateUsuarioDto);
  }
}
