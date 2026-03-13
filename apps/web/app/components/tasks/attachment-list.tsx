'use client';

import { attachmentService } from '@/services/attachment-service';
import { useAttachmentStore } from '@/store/attachment-store';
import { useEffect } from 'react';
import { AttachmentItem } from './attachment-item';

type Props = { taskId: string };

export function AttachmentList({ taskId }: Props) {
  const attachments = useAttachmentStore((s) => s.attachments);
  const setAttachments = useAttachmentStore((s) => s.setAttachments);
  const loading = useAttachmentStore((s) => s.loading);
  const setLoading = useAttachmentStore((s) => s.setLoading);

  const handleDelete = async (id: string) => {
    const ok = confirm('Delete this attachment?');
    if (!ok) return;

    await attachmentService.remove(id);

    const items = await attachmentService.list(taskId);
    setAttachments(items);
  };

  useEffect(() => {
    setLoading(true);

    attachmentService
      .list(taskId)
      .then(setAttachments)
      .finally(() => setLoading(false));
  }, [taskId, setAttachments, setLoading]);

  if (loading) {
    return <p className="text-sm text-gray-500">Loading attachments...</p>;
  }

  if (attachments.length === 0) {
    return <p className="text-sm text-gray-500">No attachments yet</p>;
  }

  return (
    <div className="space-y-2">
      {attachments
        .slice()
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .map((a) => (
          <AttachmentItem key={a.id} attachment={a} onDelete={handleDelete} />
        ))}
    </div>
  );
}
