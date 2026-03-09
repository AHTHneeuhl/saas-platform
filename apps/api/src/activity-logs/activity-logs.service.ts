import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ActivityLogsService {
  constructor(private prisma: PrismaService) {}

  private formatMessage(action: string, entity: string) {
    const messages: Record<string, string> = {
      TASK_CREATED: 'created a task',
      TASK_UPDATED: 'updated a task',
      TASK_DELETED: 'deleted a task',
      PROJECT_CREATED: 'created a project',
      PROJECT_UPDATED: 'updated a project',
      COMMENT_CREATED: 'commented on a task',
    };

    return messages[action] || `${action} ${entity}`;
  }

  async logActivity(
    userId: string,
    action: string,
    entity: string,
    entityId: string,
    projectId?: string,
  ) {
    return this.prisma.activityLog.create({
      data: {
        userId,
        action,
        entity,
        entityId,
        projectId,
      },
    });
  }

  async getProjectActivity(
    projectId: string,
    page: number = 1,
    limit: number = 20,
  ) {
    const skip = (page - 1) * limit;

    const logs = await this.prisma.activityLog.findMany({
      where: { projectId },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      include: { user: true },
    });

    return logs.map((log) => ({
      id: log.id,
      message: `${log.user.name} ${this.formatMessage(log.action, log.entity)}`,
      createdAt: log.createdAt,
    }));
  }
}
