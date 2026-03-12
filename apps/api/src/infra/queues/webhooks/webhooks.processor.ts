import { Process, Processor } from '@nestjs/bull';
import type { Job } from 'bull';

@Processor('webhooks')
export class WebhooksProcessor {
  @Process()
  async handle(job: Job) {
    console.log('webhook job', job.data);
  }
}
