import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LabelsController } from './labels.controller';
import { LabelsService } from './labels.service';

@Module({
  imports: [PrismaModule],
  providers: [LabelsService],
  controllers: [LabelsController],
})
export class LabelsModule {}
