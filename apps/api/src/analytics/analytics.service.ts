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
}
