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
}
