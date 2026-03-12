import { BullModule } from '@nestjs/bull';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-ioredis-yet';
import { HealthController } from './health.controller';
import { CleanupJob } from './jobs/cleanup.job';
import { NotificationsProcessor } from './queues/notifications/notifications.processor';
import { WebhooksProcessor } from './queues/webhooks/webhooks.processor';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: 6379,
      ttl: 60,
      isGlobal: true,
    }),

    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: 6379,
      },
    }),

    BullModule.registerQueue({ name: 'notifications' }, { name: 'webhooks' }),
  ],
  providers: [NotificationsProcessor, WebhooksProcessor, CleanupJob],
  controllers: [HealthController],
})
export class InfraModule {}
