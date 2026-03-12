import { Process, Processor } from '@nestjs/bull';
import type { Job } from 'bull';

@Processor('notifications')
export class NotificationsProcessor {
  @Process()
  async handle(job: Job) {
    console.log('notification job', job.data);
  }
}
