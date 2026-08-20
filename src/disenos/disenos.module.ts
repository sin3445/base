import { Module } from '@nestjs/common';
import { DisenosService } from './disenos.service';
import { DisenosController } from './disenos.controller';

@Module({
  controllers: [DisenosController],
  providers: [DisenosService],
})
export class DisenosModule {}
