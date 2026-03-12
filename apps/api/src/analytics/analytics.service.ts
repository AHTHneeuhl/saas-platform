import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}
  async getProjectMetrics(projectId: string) {
    const total = await this.prisma.task.count({
      where: { projectId },
    });

    const completed = await this.prisma.task.count({
      where: { projectId, status: 'DONE' },
    });

    const pending = await this.prisma.task.count({
      where: { projectId, status: 'TODO' },
    });

    return {
      total,
      completed,
      pending,
    };
  }

  async getTaskCompletionRate(projectId: string) {
    const total = await this.prisma.task.count({
      where: { projectId },
    });

    const completed = await this.prisma.task.count({
      where: { projectId, status: 'DONE' },
    });

    const rate = total === 0 ? 0 : (completed / total) * 100;

    return { total, completed, rate };
  }

  async getTasksCreatedPerDay(projectId: string) {
    return this.prisma.$queryRaw`
    SELECT DATE("createdAt") as date, COUNT(*) as count
    FROM "Task"
    WHERE "projectId" = ${projectId}
    GROUP BY DATE("createdAt")
    ORDER BY date ASC
  `;
  }
}
