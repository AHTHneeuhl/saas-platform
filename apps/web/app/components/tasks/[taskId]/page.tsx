import { AttachmentUpload } from '@/app/components/tasks/attachment-upload';
import { AttachmentList } from '@/app/components/tasks/attachment-list';

type Props = {
  params: { taskId: string };
};

export default function TaskPage({ params }: Props) {
  const taskId = params.taskId;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Task</h1>

      <div className="mt-6 space-y-3">
        <h3 className="text-lg font-semibold">Attachments</h3>

        <AttachmentUpload taskId={taskId} />
        <AttachmentList taskId={taskId} />
      </div>
    </div>
  );
}
