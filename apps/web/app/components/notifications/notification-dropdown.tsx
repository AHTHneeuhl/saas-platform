'use client';

import { useEffect } from 'react';
import { useNotificationStore } from '@/store/notification-store';
import { NotificationItem } from './notification-item';
import { fetchNotifications } from '@/services/notification-service';

export function NotificationDropdown() {
  const notifications = useNotificationStore((s) => s.notifications);
  const setNotifications = useNotificationStore((s) => s.setNotifications);
  const markAllAsRead = useNotificationStore((s) => s.markAllAsRead);

  useEffect(() => {
    async function load() {
      const data = await fetchNotifications();
      setNotifications(data);
    }

    load();
  }, [setNotifications]);

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg">
      <div className="p-3 border-b flex items-center justify-between">
        <span className="font-medium">Notifications</span>

        <button
          onClick={markAllAsRead}
          className="text-xs text-blue-600 hover:underline"
        >
          Mark all as read
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="p-4 text-sm text-gray-500">No notifications</p>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))
        )}
      </div>
    </div>
  );
}
