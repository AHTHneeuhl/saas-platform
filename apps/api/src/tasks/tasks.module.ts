import { Module } from '@nestjs/common';
import { ActivityLogsModule } from 'src/activity-logs/activity-logs.module';
import { ActivityLogsService } from 'src/activity-logs/activity-logs.service';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { NotificationsService } from 'src/notifications/notifications.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RealtimeGateway } from 'src/realtime/realtime.gateway';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [PrismaModule, ActivityLogsModule, NotificationsModule],
  providers: [
    TasksService,
    ActivityLogsService,
    NotificationsService,
    RealtimeGateway,
  ],
  controllers: [TasksController],
})
export class TasksModule {}
