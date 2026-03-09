import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrgAccessGuard } from '../common/guards/org-access.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';
import { AssignTaskDto } from './dto/assign-task.dto';

@Controller('org/:orgId/projects/:projectId/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard, OrgAccessGuard)
  @Post()
  create(@Param('projectId') projectId: string, @Body() dto: CreateTaskDto) {
    return this.tasksService.create(projectId, dto);
  }

  @UseGuards(JwtAuthGuard, OrgAccessGuard)
  @Get()
  findAll(@Param('projectId') projectId: string) {
    return this.tasksService.findAll(projectId);
  }

  @UseGuards(JwtAuthGuard, OrgAccessGuard)
  @Patch(':taskId')
  update(@Param('taskId') taskId: string, @Body() dto: UpdateTaskDto) {
    return this.tasksService.update(taskId, dto);
  }

  @UseGuards(JwtAuthGuard, OrgAccessGuard)
  @Delete(':taskId')
  remove(@Param('taskId') taskId: string) {
    return this.tasksService.delete(taskId);
  }

  @Patch(':taskId/assign')
  assignTask(@Param('taskId') taskId: string, @Body() dto: AssignTaskDto) {
    const userId = 'USER_ID'; // replace with auth later
    return this.tasksService.assignTask(taskId, dto.assigneeId, userId);
  }
}
