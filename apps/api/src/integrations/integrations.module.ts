import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RealtimeGateway } from 'src/realtime/realtime.gateway';
import { GithubController } from './github/github.controller';
import { GithubService } from './github/github.service';
import { SlackService } from './slack/slack.service';
import { SlackController } from './slack/slack.controller';

@Module({
  providers: [GithubService, PrismaService, RealtimeGateway, SlackService],
  controllers: [GithubController, SlackController],
})
export class IntegrationsModule {}
