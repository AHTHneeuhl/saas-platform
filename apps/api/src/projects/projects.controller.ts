import { Body, Controller, Post, Param, UseGuards, Get } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrgAccessGuard } from '../common/guards/org-access.guard';

@Controller('org/:orgId/projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @UseGuards(JwtAuthGuard, OrgAccessGuard)
  @Post()
  create(@Param('orgId') orgId: string, @Body() dto: CreateProjectDto) {
    return this.projectsService.create(orgId, dto);
  }

  @UseGuards(JwtAuthGuard, OrgAccessGuard)
  @Get()
  findAll(@Param('orgId') orgId: string) {
    return this.projectsService.findAll(orgId);
  }

  @Get(':projectId')
  @UseGuards(JwtAuthGuard, OrgAccessGuard)
  findOne(
    @Param('orgId') orgId: string,
    @Param('projectId') projectId: string,
  ) {
    return this.projectsService.findOne(orgId, projectId);
  }
}
