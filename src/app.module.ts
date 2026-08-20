import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ClientesModule } from './clientes/clientes.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { DisenosModule } from './disenos/disenos.module';

@Module({
  imports: [PrismaModule, ClientesModule, PedidosModule, UsuariosModule, DisenosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
