import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RealtimeGateway } from 'src/realtime/realtime.gateway';
import { GithubController } from './github/github.controller';
import { GithubService } from './github/github.service';

@Module({
  providers: [GithubService, PrismaService, RealtimeGateway],
  controllers: [GithubController],
})
export class IntegrationsModule {}
