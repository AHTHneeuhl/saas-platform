'use client';

import { useRef } from 'react';
import { attachmentService } from '@/services/attachment-service';
import { useAttachmentStore } from '@/store/attachment-store';

export function AttachmentUpload({ taskId }: { taskId: string }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const setAttachments = useAttachmentStore((s) => s.setAttachments);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (const file of Array.from(files)) {
      try {
        await attachmentService.upload(file, taskId);
      } catch (err) {
        console.error('Upload failed', err);
      }
    }

    const items = await attachmentService.list(taskId);
    setAttachments(items);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div>
      <input ref={inputRef} type="file" multiple onChange={handleUpload} />
    </div>
  );
}
