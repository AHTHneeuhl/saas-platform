'use client';

import { attachmentService } from '@/services/attachment-service';
import { useAttachmentStore } from '@/store/attachment-store';

export function AttachmentUpload({ taskId }: { taskId: string }) {
  const setAttachments = useAttachmentStore((s) => s.setAttachments);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (const file of Array.from(files)) {
      await attachmentService.upload(file, taskId);
    }

    const items = await attachmentService.list(taskId);
    setAttachments(items);
  };

  return (
    <div>
      <input type="file" multiple onChange={handleUpload} />
    </div>
  );
}
