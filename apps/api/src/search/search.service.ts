import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}
  async searchProjects(
    orgId: string,
    query: string,
    page: number,
    limit: number,
  ) {
    const skip = (page - 1) * limit;

    return this.prisma.project.findMany({
      where: {
        orgId,
        deletedAt: null,
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async searchTasks(orgId: string, query: string, page: number, limit: number) {
    const skip = (page - 1) * limit;

    return this.prisma.task.findMany({
      where: {
        deletedAt: null,
        project: {
          orgId,
        },
        OR: [
          {
            title: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
      include: {
        project: true,
        assignee: true,
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async searchComments(
    orgId: string,
    query: string,
    page: number,
    limit: number,
  ) {
    const skip = (page - 1) * limit;

    return this.prisma.comment.findMany({
      where: {
        deletedAt: null,
        content: {
          contains: query,
          mode: 'insensitive',
        },
        task: {
          project: {
            orgId,
          },
        },
      },
      include: {
        user: true,
        task: true,
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
