import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(private prisma: PrismaService) {}

  async create(createClienteDto: CreateClienteDto) {
    // Verificar que el usuario existe antes de crear el cliente
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: createClienteDto.usuarioId },
    });

    if (!usuario) {
      throw new HttpException(
        'Usuario no encontrado. Por favor, cierra sesión y vuelve a iniciar.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.prisma.cliente.create({
      data: createClienteDto,
    });
  }

  findAll(usuarioId?: number) {
    if (usuarioId) {
      return this.prisma.cliente.findMany({ where: { usuarioId } });
    }
    return this.prisma.cliente.findMany();
  }

  findOne(id: number) {
    return this.prisma.cliente.findUnique({
      where: { id },
      include: { pedidos: true },
    });
  }

  update(id: number, updateClienteDto: Partial<CreateClienteDto>) {
    return this.prisma.cliente.update({
      where: { id },
      data: updateClienteDto,
    });
  }

  remove(id: number) {
    return this.prisma.cliente.delete({
      where: { id },
    });
  }
}
