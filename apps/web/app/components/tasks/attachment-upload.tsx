'use client';

import { useRef, useState } from 'react';
import { attachmentService } from '@/services/attachment-service';
import { useAttachmentStore } from '@/store/attachment-store';

export function AttachmentUpload({ taskId }: { taskId: string }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const setAttachments = useAttachmentStore((s) => s.setAttachments);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);

    try {
      const allowed = [
        'image/png',
        'image/jpeg',
        'image/webp',
        'application/pdf',
        'text/plain',
      ];

      for (const file of Array.from(files)) {
        if (!allowed.includes(file.type)) {
          console.error('Invalid file type:', file.type);
          continue;
        }

        await attachmentService.upload(file, taskId);
      }

      const items = await attachmentService.list(taskId);
      setAttachments(items);
    } catch (err) {
      console.error('Upload failed', err);
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  return (
    <div>
      {uploading && <p className="text-sm text-gray-500">Uploading...</p>}

      <input
        ref={inputRef}
        type="file"
        multiple
        disabled={uploading}
        onChange={handleUpload}
      />
    </div>
  );
}
