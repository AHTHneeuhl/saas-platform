'use client';

import { formatDistanceToNow } from 'date-fns';
import { Notification } from '@/types/notification';
import { useNotificationStore } from '@/store/notification-store';
import { markNotificationRead } from '@/services/notification-service';

interface Props {
  notification: Notification;
}

export function NotificationItem({ notification }: Props) {
  const markAsRead = useNotificationStore((s) => s.markAsRead);

  async function handleClick() {
    if (!notification.isRead) {
      markAsRead(notification.id);
      await markNotificationRead(notification.id);
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`p-3 border-b text-sm hover:bg-gray-50 cursor-pointer flex gap-2 ${
        !notification.isRead ? 'bg-gray-50' : ''
      }`}
    >
      {!notification.isRead && (
        <span className="mt-1 h-2 w-2 rounded-full bg-blue-500"></span>
      )}
      <div className="flex-1">
        <p className="font-medium">{notification.title}</p>
        <p className="text-xs text-gray-400 mt-1">
          {formatDistanceToNow(new Date(notification.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
    </div>
  );
}
