import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';
import * as crypto from 'crypto';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ScheduleModule } from '@nestjs/schedule';
import { ActivityLogsModule } from './activity-logs/activity-logs.module';
import { AttachmentsModule } from './attachments/attachments.module';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { InfraModule } from './infra/infra.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { LabelsModule } from './labels/labels.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsModule } from './projects/projects.module';
import { SearchModule } from './search/search.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60,
          limit: 100,
        },
      ],
    }),

    ScheduleModule.forRoot(),

    LoggerModule.forRoot({
      pinoHttp: {
        level: 'info',
        genReqId: (req) => req.headers['x-request-id'] || crypto.randomUUID(),
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty' }
            : undefined,
      },
    }),

    AuthModule,
    PrismaModule,
    ProjectsModule,
    TasksModule,
    ActivityLogsModule,
    CommentsModule,
    LabelsModule,
    SearchModule,
    AttachmentsModule,
    IntegrationsModule,
    InfraModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
