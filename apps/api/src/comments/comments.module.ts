import { Module } from '@nestjs/common';
import { ActivityLogsModule } from 'src/activity-logs/activity-logs.module';
import { ActivityLogsService } from 'src/activity-logs/activity-logs.service';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { NotificationsService } from 'src/notifications/notifications.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RealtimeGateway } from 'src/realtime/realtime.gateway';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  imports: [PrismaModule, ActivityLogsModule, NotificationsModule],
  providers: [
    CommentsService,
    ActivityLogsService,
    NotificationsService,
    RealtimeGateway,
  ],
  controllers: [CommentsController],
})
export class CommentsModule {}
