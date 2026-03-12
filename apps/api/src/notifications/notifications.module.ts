import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { PrismaModule } from 'src/prisma/prisma.module';
import { RealtimeModule } from 'src/realtime/realtime.module';

import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [
    PrismaModule,
    RealtimeModule,
    BullModule.registerQueue({
      name: 'notifications',
    }),
  ],
  providers: [NotificationsService],
  controllers: [NotificationsController],
  exports: [NotificationsService],
})
export class NotificationsModule {}
