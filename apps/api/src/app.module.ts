import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { ActivityLogsModule } from './activity-logs/activity-logs.module';
import { CommentsModule } from './comments/comments.module';
import { LabelsModule } from './labels/labels.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ProjectsModule,
    TasksModule,
    ActivityLogsModule,
    CommentsModule,
    LabelsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
