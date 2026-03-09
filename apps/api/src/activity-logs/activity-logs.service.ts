import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ActivityLogsService {
  constructor(private prisma: PrismaService) {}

  async logActivity(
    userId: string,
    action: string,
    entity: string,
    entityId: string,
  ) {
    return this.prisma.activityLog.create({
      data: {
        userId,
        action,
        entity,
        entityId,
      },
    });
  }

  async getProjectActivity(
    projectId: string,
    page: number = 1,
    limit: number = 20,
  ) {
    const skip = (page - 1) * limit;

    return this.prisma.activityLog.findMany({
      where: {
        projectId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
      include: {
        user: true,
      },
    });
  }
}
