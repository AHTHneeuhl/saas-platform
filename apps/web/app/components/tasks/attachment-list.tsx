'use client';

import { useEffect } from 'react';
import { attachmentService } from '@/services/attachment-service';
import { useAttachmentStore } from '@/store/attachment-store';

type Props = { taskId: string };

export function AttachmentList({ taskId }: Props) {
  const attachments = useAttachmentStore((s) => s.attachments);
  const setAttachments = useAttachmentStore((s) => s.setAttachments);

  useEffect(() => {
    attachmentService.list(taskId).then(setAttachments);
  }, [taskId, setAttachments]);

  if (attachments.length === 0) {
    return <p className="text-sm text-gray-500">No attachments yet</p>;
  }

  return (
    <div className="space-y-2">
      {attachments.map((a) => (
        <a
          key={a.id}
          href={a.url}
          target="_blank"
          className="block border rounded p-2 text-sm hover:bg-gray-50"
        >
          <div className="flex justify-between">
            <span>{a.filename}</span>
            <span className="text-gray-400 text-xs">
              {(a.size / 1024).toFixed(1)} KB
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
