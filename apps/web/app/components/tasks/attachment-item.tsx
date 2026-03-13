import { Attachment } from '@/types/attachment';

export function AttachmentItem({
  attachment,
  onDelete,
}: {
  attachment: Attachment;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="flex justify-between items-center border rounded p-2">
      <a
        href={attachment.url}
        target="_blank"
        download
        className="text-sm hover:underline"
      >
        {attachment.filename}
      </a>

      <button
        onClick={() => onDelete(attachment.id)}
        className="text-xs text-red-500"
      >
        Delete
      </button>
    </div>
  );
}
