export interface Notification {
  id: string;
  type: 'task_assigned' | 'task_commented' | 'task_updated';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;

  projectId?: string;
  taskId?: string;
  actorId?: string;
}

export type NotificationType =
  | 'task_assigned'
  | 'task_commented'
  | 'task_updated';
