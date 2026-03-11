import { Draggable } from '@hello-pangea/dnd';
import { useRouter } from 'next/navigation';

type Props = {
  id: string;
  title: string;
  index: number;
};

export function TaskCard({ id, title, index }: Props) {
  const router = useRouter();

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => router.push(`/dashboard/tasks/${id}`)}
          className="border rounded p-3 bg-white shadow-sm cursor-pointer"
        >
          <p className="text-sm font-medium">{title}</p>
        </div>
      )}
    </Draggable>
  );
}
