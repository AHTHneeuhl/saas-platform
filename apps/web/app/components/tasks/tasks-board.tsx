import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { TaskColumn } from './task-column';

type Task = {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'done';
};

export function TasksBoard({ tasks }: { tasks: Task[] }) {
  const todo = tasks.filter((t) => t.status === 'todo');
  const inProgress = tasks.filter((t) => t.status === 'in_progress');
  const done = tasks.filter((t) => t.status === 'done');

  function onDragEnd(result: DropResult) {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) return;

    console.log('Move task', {
      taskId: result.draggableId,
      from: source.droppableId,
      to: destination.droppableId,
    });
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 gap-4">
        <TaskColumn title="Todo" tasks={todo} droppableId="todo" />
        <TaskColumn
          title="In Progress"
          tasks={inProgress}
          droppableId="in_progress"
        />
        <TaskColumn title="Done" tasks={done} droppableId="done" />
      </div>
    </DragDropContext>
  );
}
