'use client';

import { Notification } from '@/types/notification';

interface Props {
  notification: Notification;
}

export function NotificationItem({ notification }: Props) {
  return (
    <div
      className={`p-3 border-b text-sm hover:bg-gray-50 ${
        !notification.isRead ? 'bg-gray-50' : ''
      }`}
    >
      <p className="font-medium">{notification.title}</p>
      <p className="text-gray-500">{notification.message}</p>
    </div>
  );
}
