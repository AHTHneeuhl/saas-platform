import { Injectable } from '@nestjs/common';
import { ActivityLogsService } from 'src/activity-logs/activity-logs.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    private prisma: PrismaService,
    private activityLogsService: ActivityLogsService,
  ) {}

  async create(projectId: string, userId: string, dto: CreateTaskDto) {
    const task = await this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status,
        priority: dto.priority,
        projectId,
      },
    });

    await this.activityLogsService.logActivity(
      userId,
      'TASK_CREATED',
      'task',
      task.id,
      task.projectId,
    );

    return task;
  }

  async findAll(projectId: string) {
    return this.prisma.task.findMany({
      where: {
        projectId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async update(taskId: string, userId: string, dto: UpdateTaskDto) {
    const task = await this.prisma.task.update({
      where: { id: taskId },
      data: dto,
    });

    await this.activityLogsService.logActivity(
      userId,
      'TASK_UPDATED',
      'task',
      task.id,
      task.projectId,
    );

    return task;
  }

  async delete(taskId: string, userId: string) {
    const task = await this.prisma.task.delete({
      where: { id: taskId },
    });

    await this.activityLogsService.logActivity(
      userId,
      'TASK_DELETED',
      'task',
      task.id,
      task.projectId,
    );

    return task;
  }

  async assignTask(taskId: string, assigneeId: string, userId: string) {
    const task = await this.prisma.task.update({
      where: { id: taskId },
      data: {
        assigneeId,
      },
      include: {
        assignee: true,
      },
    });

    await this.activityLogsService.logActivity(
      userId,
      'TASK_ASSIGNED',
      'task',
      task.id,
      task.projectId,
    );

    return task;
  }

  async unassignTask(taskId: string, userId: string) {
    const task = await this.prisma.task.update({
      where: { id: taskId },
      data: {
        assigneeId: null,
      },
    });

    await this.activityLogsService.logActivity(
      userId,
      'TASK_UNASSIGNED',
      'task',
      task.id,
      task.projectId,
    );

    return task;
  }
}
