import { Module } from '@nestjs/common';
import { GithubService } from './github/github.service';
import { GithubController } from './github/github.controller';

@Module({
  providers: [GithubService],
  controllers: [GithubController],
})
export class IntegrationsModule {}
