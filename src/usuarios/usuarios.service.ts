import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async register(createUsuarioDto: CreateUsuarioDto) {
    const existingUser = await this.prisma.usuario.findUnique({
      where: { correo: createUsuarioDto.correo },
    });
    
    if (existingUser) {
      throw new HttpException('El correo ya está registrado', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.prisma.usuario.create({
      data: {
        nombre: createUsuarioDto.nombre,
        correo: createUsuarioDto.correo,
        contrasena: createUsuarioDto.contrasena,
      },
    });

    return {
      success: true,
      usuario: { id: newUser.id, nombre: newUser.nombre, correo: newUser.correo, rol: newUser.rol }
    };
  }

  async login(correo: string, contrasena: string) {
    const user = await this.prisma.usuario.findUnique({
      where: { correo },
    });

    if (!user || user.contrasena !== contrasena) {
      throw new HttpException('Credenciales incorrectas', HttpStatus.UNAUTHORIZED);
    }

    return {
      success: true,
      usuario: { id: user.id, nombre: user.nombre, correo: user.correo, rol: user.rol }
    };
  }

  async updateProfile(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    // Solo permitimos actualizar nombre y contrasena, el correo se ignora si viene
    const dataToUpdate: any = {};
    if (updateUsuarioDto.nombre) dataToUpdate.nombre = updateUsuarioDto.nombre;
    if (updateUsuarioDto.contrasena) dataToUpdate.contrasena = updateUsuarioDto.contrasena;

    const updatedUser = await this.prisma.usuario.update({
      where: { id },
      data: dataToUpdate,
    });

    return {
      success: true,
      usuario: { id: updatedUser.id, nombre: updatedUser.nombre, correo: updatedUser.correo, rol: updatedUser.rol }
    };
  }
}
