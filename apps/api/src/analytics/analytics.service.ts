import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}
  async getProjectMetrics(projectId: string) {
    const stats = await this.prisma.task.groupBy({
      by: ['status'],
      where: { projectId },
      _count: {
        id: true,
      },
    });

    let total = 0;
    let completed = 0;
    let pending = 0;

    for (const s of stats) {
      total += s._count.id;

      if (s.status === 'DONE') completed = s._count.id;
      if (s.status === 'TODO') pending = s._count.id;
    }

    return { total, completed, pending };
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

  async getUserProductivity(projectId: string) {
    return this.prisma.task.groupBy({
      by: ['assigneeId'],
      where: {
        projectId,
        status: 'DONE',
      },
      _count: {
        id: true,
      },
    });
  }

  async getProjectDashboard(projectId: string) {
    const metrics = await this.getProjectMetrics(projectId);
    const completion = await this.getTaskCompletionRate(projectId);
    const productivity = await this.getUserProductivity(projectId);

    return {
      metrics,
      completion,
      productivity,
    };
  }
}
