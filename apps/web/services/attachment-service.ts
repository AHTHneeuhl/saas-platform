import { uploadAttachment, getAttachments } from '@/lib/api/attachments';

export const attachmentService = {
  upload: (file: File, taskId: string) => uploadAttachment(file, taskId),

  list: (taskId: string) => getAttachments(taskId),
};
