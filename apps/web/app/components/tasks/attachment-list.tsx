import { Attachment } from '@/types/attachment';

type Props = {
  attachments: Attachment[];
};

export function AttachmentList({ attachments }: Props) {
  return (
    <div className="space-y-2">
      {attachments.map((a) => (
        <a
          key={a.id}
          href={a.url}
          target="_blank"
          className="block border rounded p-2 text-sm hover:bg-gray-50"
        >
          {a.filename}
        </a>
      ))}
    </div>
  );
}
