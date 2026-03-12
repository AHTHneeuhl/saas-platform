import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RealtimeGateway } from 'src/realtime/realtime.gateway';
import { GithubWebhookPayload } from './github.types';

@Injectable()
export class GithubService {
  constructor(
    private prisma: PrismaService,
    private realtimeGateway: RealtimeGateway,
  ) {}

  getGithubOAuthUrl() {
    const clientId = process.env.GITHUB_CLIENT_ID;
    const redirectUri = process.env.GITHUB_REDIRECT_URI;

    return {
      url: `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo`,
    };
  }

  async saveGithubToken(userId: string, token: string) {
    return this.prisma.integration.create({
      data: {
        provider: 'github',
        accessToken: token,
        userId,
      },
    });
  }

  async handleWebhook(payload: GithubWebhookPayload) {
    if (payload.action === 'opened' && payload.issue) {
      const issue = payload.issue as { title: string; html_url: string };

      const projectId = 'PROJECT_ID';

      await this.prisma.task.create({
        data: {
          title: issue.title,
          description: issue.html_url,
          status: 'TODO',
          projectId,
        },
      });

      this.realtimeGateway.server.emit('github.task.created', {
        title: issue.title,
        source: 'github',
      });
    }

    return { received: true };
  }
}
