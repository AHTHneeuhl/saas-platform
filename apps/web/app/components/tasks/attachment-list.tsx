'use client';

import { useEffect } from 'react';
import { attachmentService } from '@/services/attachment-service';
import { useAttachmentStore } from '@/store/attachment-store';

type Props = { taskId: string };

export function AttachmentList({ taskId }: Props) {
  const attachments = useAttachmentStore((s) => s.attachments);
  const setAttachments = useAttachmentStore((s) => s.setAttachments);

  const handleDelete = async (id: string) => {
    const ok = confirm('Delete this attachment?');
    if (!ok) return;

    await attachmentService.remove(id);

    const items = await attachmentService.list(taskId);
    setAttachments(items);
  };

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
          <div className="flex justify-between items-center">
            <a
              href={a.url}
              target="_blank"
              download
              className="text-sm hover:underline"
            >
              {a.filename}
            </a>

            <button
              onClick={() => handleDelete(a.id)}
              className="text-xs text-red-500"
            >
              Delete
            </button>
          </div>
        </a>
      ))}
    </div>
  );
}
