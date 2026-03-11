'use client';

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
      className={`p-3 border-b text-sm hover:bg-gray-50 cursor-pointer ${
        !notification.isRead ? 'bg-gray-50' : ''
      }`}
    >
      <p className="font-medium">{notification.title}</p>
      <p className="text-gray-500">{notification.message}</p>
    </div>
  );
}
