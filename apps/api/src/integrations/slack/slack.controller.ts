import { Body, Controller, Get, Post } from '@nestjs/common';
import { SlackService } from './slack.service';

@Controller('integrations/slack')
export class SlackController {
  constructor(private readonly slackService: SlackService) {}

  @Get('connect')
  connectSlack() {
    return this.slackService.getSlackOAuthUrl();
  }

  @Post('commands')
  handleCommand(@Body() body: Record<string, string>) {
    return this.slackService.handleSlashCommand(body);
  }
}
