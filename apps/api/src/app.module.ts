import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ActivityLogsModule } from './activity-logs/activity-logs.module';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { LabelsModule } from './labels/labels.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsModule } from './projects/projects.module';
import { SearchModule } from './search/search.module';
import { TasksModule } from './tasks/tasks.module';
import { AttachmentsModule } from './attachments/attachments.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { InfraModule } from './infra/infra.module';

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
