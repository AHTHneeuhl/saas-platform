'use client';

import { attachmentService } from '@/services/attachment-service';

export function AttachmentUpload({ taskId }: { taskId: string }) {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await attachmentService.upload(file, taskId);
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} />
    </div>
  );
}
