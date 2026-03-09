import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ActivityLogsService } from './activity-logs.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrgAccessGuard } from '../common/guards/org-access.guard';

@Controller('org/:orgId/projects/:projectId/activity')
export class ActivityLogsController {
  constructor(private activityLogsService: ActivityLogsService) {}

  @UseGuards(JwtAuthGuard, OrgAccessGuard)
  @Get()
  getProjectActivity(
    @Param('projectId') projectId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.activityLogsService.getProjectActivity(
      projectId,
      Number(page) || 1,
      Number(limit) || 20,
    );
  }
}
