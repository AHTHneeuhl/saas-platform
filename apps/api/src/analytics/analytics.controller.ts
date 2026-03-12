import { Controller, Get, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Get('projects/:projectId/metrics')
  getProjectMetrics(@Param('projectId') projectId: string) {
    return this.analyticsService.getProjectMetrics(projectId);
  }

  @Get('projects/:projectId/dashboard')
  getProjectDashboard(@Param('projectId') projectId: string) {
    return this.analyticsService.getProjectDashboard(projectId);
  }
}
