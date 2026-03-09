import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(orgId: string, dto: CreateProjectDto) {
    return this.prisma.project.create({
      data: {
        name: dto.name,
        orgId,
      },
    });
  }

  async findAll(orgId: string) {
    return this.prisma.project.findMany({
      where: { orgId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(projectId: string, orgId: string) {
    return this.prisma.project.findFirst({
      where: { id: projectId, orgId },
    });
  }

  async update(orgId: string, projectId: string, dto: UpdateProjectDto) {
    return this.prisma.project.updateMany({
      where: {
        id: projectId,
        orgId,
      },
      data: dto,
    });
  }

  async delete(orgId: string, projectId: string) {
    return this.prisma.project.deleteMany({
      where: {
        id: projectId,
        orgId,
      },
    });
  }
}
