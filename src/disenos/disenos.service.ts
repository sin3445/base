import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDisenoDto } from './dto/create-diseno.dto';

@Injectable()
export class DisenosService {
  constructor(private prisma: PrismaService) {}

  async create(createDisenoDto: CreateDisenoDto) {
    // Verificar que el pedido existe
    const pedido = await this.prisma.pedido.findUnique({
      where: { id: createDisenoDto.pedidoId },
    });

    if (!pedido) {
      throw new HttpException(
        'Pedido no encontrado. Verifica que el ID del pedido sea correcto.',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Validar que configuracionJson sea un JSON válido
    try {
      JSON.parse(createDisenoDto.configuracionJson);
    } catch {
      throw new HttpException(
        'El campo configuracionJson debe ser un JSON válido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.prisma.diseno3D.create({
      data: createDisenoDto,
      include: { pedido: true },
    });
  }

  findAll(pedidoId?: number) {
    const where = pedidoId ? { pedidoId } : {};
    return this.prisma.diseno3D.findMany({
      where,
      include: { pedido: true },
    });
  }

  async findOne(id: number) {
    const diseno = await this.prisma.diseno3D.findUnique({
      where: { id },
      include: { pedido: true },
    });

    if (!diseno) {
      throw new HttpException(
        'Diseño no encontrado.',
        HttpStatus.NOT_FOUND,
      );
    }

    return diseno;
  }

  async remove(id: number) {
    const diseno = await this.prisma.diseno3D.findUnique({
      where: { id },
    });

    if (!diseno) {
      throw new HttpException(
        'Diseño no encontrado.',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.prisma.diseno3D.delete({
      where: { id },
    });
  }
}
