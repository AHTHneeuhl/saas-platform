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
    const userId = 'USER_ID'; // replace later with auth
    return this.tasksService.create(projectId, userId, dto);
  }

  @UseGuards(JwtAuthGuard, OrgAccessGuard)
  @Get()
  findAll(@Param('projectId') projectId: string) {
    return this.tasksService.findAll(projectId);
  }

  @UseGuards(JwtAuthGuard, OrgAccessGuard)
  @Patch(':taskId')
  update(@Param('taskId') taskId: string, @Body() dto: UpdateTaskDto) {
    const userId = 'USER_ID'; // replace later with auth
    return this.tasksService.update(taskId, userId, dto);
  }

  @UseGuards(JwtAuthGuard, OrgAccessGuard)
  @Delete(':taskId')
  remove(@Param('taskId') taskId: string) {
    const userId = 'USER_ID'; // replace later with auth
    return this.tasksService.delete(taskId, userId);
  }

  @Patch(':taskId/assign')
  assignTask(@Param('taskId') taskId: string, @Body() dto: AssignTaskDto) {
    const userId = 'USER_ID'; // replace with auth later
    return this.tasksService.assignTask(taskId, dto.assigneeId, userId);
  }

  @Patch(':taskId/unassign')
  unassignTask(@Param('taskId') taskId: string) {
    const userId = 'USER_ID'; // replace with auth later
    return this.tasksService.unassignTask(taskId, userId);
  }
}
