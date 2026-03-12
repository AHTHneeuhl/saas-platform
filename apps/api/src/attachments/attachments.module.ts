import { Module } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { AttachmentsController } from './attachments.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [AttachmentsService, PrismaService],
  controllers: [AttachmentsController],
})
export class AttachmentsModule {}
