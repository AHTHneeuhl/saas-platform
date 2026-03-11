import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RealtimeGateway } from 'src/realtime/realtime.gateway';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [PrismaModule],
  providers: [NotificationsService, RealtimeGateway],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
