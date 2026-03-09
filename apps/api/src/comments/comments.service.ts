import { Injectable } from '@nestjs/common';
import { ActivityLogsService } from 'src/activity-logs/activity-logs.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    private prisma: PrismaService,
    private activityLogsService: ActivityLogsService,
  ) {}

  async createComment(taskId: string, userId: string, dto: CreateCommentDto) {
    const comment = await this.prisma.comment.create({
      data: {
        content: dto.content,
        taskId,
        userId,
      },
      include: {
        user: true,
        task: true,
      },
    });

    await this.activityLogsService.logActivity(
      userId,
      'COMMENT_CREATED',
      'comment',
      comment.id,
      comment.task.projectId,
    );

    return comment;
  }

  async getTaskComments(taskId: string) {
    return this.prisma.comment.findMany({
      where: {
        taskId,
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        user: true,
      },
    });
  }

  async deleteComment(commentId: string) {
    return this.prisma.comment.update({
      where: { id: commentId },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
