import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ActivityLogsController } from './activity-logs.controller';
import { ActivityLogsService } from './activity-logs.service';

@Module({
  imports: [PrismaModule],
  providers: [ActivityLogsService],
  controllers: [ActivityLogsController],
})
export class ActivityLogsModule {}
