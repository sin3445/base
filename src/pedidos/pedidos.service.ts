import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';

@Injectable()
export class PedidosService {
  constructor(private prisma: PrismaService) {}

  async create(createPedidoDto: CreatePedidoDto) {
    // Verificar que el usuario existe
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: createPedidoDto.usuarioId },
    });

    if (!usuario) {
      throw new HttpException(
        'Usuario no encontrado. Por favor, cierra sesión y vuelve a iniciar.',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Verificar que el cliente existe
    const cliente = await this.prisma.cliente.findUnique({
      where: { id: createPedidoDto.clienteId },
    });

    if (!cliente) {
      throw new HttpException(
        'Cliente no encontrado.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.prisma.pedido.create({
      data: createPedidoDto,
    });
  }

  findAll(usuarioId?: number) {
    const where = usuarioId ? { usuarioId } : {};
    return this.prisma.pedido.findMany({
      where,
      include: { cliente: true },
    });
  }

  findOne(id: number) {
    return this.prisma.pedido.findUnique({
      where: { id },
      include: { cliente: true },
    });
  }

  update(id: number, updatePedidoDto: Partial<CreatePedidoDto>) {
    return this.prisma.pedido.update({
      where: { id },
      data: updatePedidoDto,
    });
  }

  remove(id: number) {
    return this.prisma.pedido.delete({
      where: { id },
    });
  }
}
