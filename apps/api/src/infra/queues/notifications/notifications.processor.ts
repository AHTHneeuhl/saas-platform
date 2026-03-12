import { Process, Processor } from '@nestjs/bull';
import type { Job } from 'bull';

@Processor('notifications')
export class NotificationsProcessor {
  @Process('send-notification')
  async handle(job: Job) {
    try {
      const { notificationId, userId, title, message } = job.data as {
        notificationId: string;
        userId: string;
        title: string;
        message: string;
      };

      console.log('Processing notification', {
        notificationId,
        userId,
        title,
        message,
      });

      // here later:
      // send email
      // push notification
      // slack message
    } catch (error) {
      console.error('Notification job failed', error);
      throw error; // allows Bull to retry
    }
  }
}
