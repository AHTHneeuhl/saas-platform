import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AttachmentsService {
  constructor(private prisma: PrismaService) {}

  async uploadAttachment(taskId: string, file: Express.Multer.File) {
    return this.prisma.attachment.create({
      data: {
        fileName: file.originalname,
        fileUrl: file.path,
        fileSize: file.size,
        mimeType: file.mimetype,
        taskId,
        uploadedById: 'USER_ID', // temporary
      },
    });
  }
}
