import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SlackService {
  constructor(private prisma: PrismaService) {}

  getSlackOAuthUrl() {
    const clientId = process.env.SLACK_CLIENT_ID;
    const redirectUri = process.env.SLACK_REDIRECT_URI;

    return {
      url: `https://slack.com/oauth/v2/authorize?client_id=${clientId}&scope=chat:write&redirect_uri=${redirectUri}`,
    };
  }

  async saveSlackToken(userId: string, token: string) {
    return this.prisma.integration.create({
      data: {
        provider: 'slack',
        accessToken: token,
        userId,
      },
    });
  }

  async sendTaskNotification(token: string, text: string) {
    await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        channel: '#devflow',
        text,
      }),
    });
  }
}
