'use client';

import { Bell } from 'lucide-react';
import { useNotificationStore } from '@/store/notification-store';

export function NotificationBell() {
  const unreadCount = useNotificationStore((s) => s.unreadCount);

  return (
    <button className="relative p-2 rounded-lg hover:bg-gray-100">
      <Bell className="w-5 h-5" />

      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full px-1.5 py-0.5">
          {unreadCount}
        </span>
      )}
    </button>
  );
}
