import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GithubWebhookPayload } from './github.types';

@Injectable()
export class GithubService {
  constructor(private readonly prisma: PrismaService) {}

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
    const event = payload.action;

    if (event === 'opened' && payload.pull_request) {
      // PR opened
    }

    if (event === 'opened' && payload.issue) {
      // Issue opened
    }

    return { received: true };
  }
}
