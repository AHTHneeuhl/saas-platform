import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RealtimeGateway } from 'src/realtime/realtime.gateway';

@Injectable()
export class AttachmentsService {
  constructor(
    private prisma: PrismaService,
    private realtimeGateway: RealtimeGateway,
  ) {}

  async uploadAttachment(
    taskId: string,
    file: Express.Multer.File,
    userId: string,
  ) {
    const attachment = await this.prisma.attachment.create({
      data: {
        fileName: file.originalname,
        fileUrl: file.path,
        fileSize: file.size,
        mimeType: file.mimetype,
        taskId,
        uploadedById: userId,
      },
    });

    this.realtimeGateway.server.emit('attachment.created', attachment);

    return attachment;
  }

  async getTaskAttachments(taskId: string) {
    return this.prisma.attachment.findMany({
      where: { taskId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async deleteAttachment(id: string) {
    return this.prisma.attachment.delete({
      where: { id },
    });
  }
}
