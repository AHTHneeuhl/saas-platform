import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import type { Cache } from 'cache-manager';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER)
    private cache: Cache,
  ) {}

  async create(orgId: string, dto: CreateProjectDto) {
    const project = await this.prisma.project.create({
      data: {
        name: dto.name,
        orgId,
      },
    });

    await this.cache.del(`projects:${orgId}`);

    return project;
  }

  async findAll(orgId: string) {
    const cacheKey = `projects:${orgId}`;

    const cached = await this.cache.get(cacheKey);
    if (cached) return cached;

    const projects = await this.prisma.project.findMany({
      where: { orgId },
      orderBy: { createdAt: 'desc' },
    });

    await this.cache.set(cacheKey, projects, 60);

    return projects;
  }

  async findOne(projectId: string, orgId: string) {
    return this.prisma.project.findFirst({
      where: { id: projectId, orgId },
    });
  }

  async update(orgId: string, projectId: string, dto: UpdateProjectDto) {
    const result = await this.prisma.project.updateMany({
      where: {
        id: projectId,
        orgId,
      },
      data: dto,
    });

    await this.cache.del(`projects:${orgId}`);

    return result;
  }

  async delete(orgId: string, projectId: string) {
    const result = await this.prisma.project.deleteMany({
      where: {
        id: projectId,
        orgId,
      },
    });

    await this.cache.del(`projects:${orgId}`);

    return result;
  }
}
