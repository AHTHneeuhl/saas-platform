import { Injectable } from '@nestjs/common';

@Injectable()
export class SlackService {
  getSlackOAuthUrl() {
    const clientId = process.env.SLACK_CLIENT_ID;
    const redirectUri = process.env.SLACK_REDIRECT_URI;

    return {
      url: `https://slack.com/oauth/v2/authorize?client_id=${clientId}&scope=chat:write&redirect_uri=${redirectUri}`,
    };
  }
}
