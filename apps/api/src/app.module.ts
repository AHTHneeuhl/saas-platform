import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActivityLogsModule } from './activity-logs/activity-logs.module';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { LabelsModule } from './labels/labels.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { ProjectsModule } from './projects/projects.module';
import { RealtimeGateway } from './realtime/realtime.gateway';
import { SearchModule } from './search/search.module';
import { TasksModule } from './tasks/tasks.module';
import { AttachmentsModule } from './attachments/attachments.module';
import { IntegrationsModule } from './integrations/integrations.module';

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, RealtimeGateway],
})
export class AppModule {}
