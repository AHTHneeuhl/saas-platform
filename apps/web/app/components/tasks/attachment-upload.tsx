'use client';

import { attachmentService } from '@/services/attachment-service';
import { useAttachmentStore } from '@/store/attachment-store';

export function AttachmentUpload({ taskId }: { taskId: string }) {
  const setAttachments = useAttachmentStore((s) => s.setAttachments);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await attachmentService.upload(file, taskId);

    const items = await attachmentService.list(taskId);
    setAttachments(items);
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} />
    </div>
  );
}
