'use client';

import { useEffect, useRef, useState } from 'react';
import { Bell } from 'lucide-react';
import { useNotificationStore } from '@/store/notification-store';
import { NotificationDropdown } from './notification-dropdown';

export function NotificationBell() {
  const unreadCount = useNotificationStore((s) => s.unreadCount);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg hover:bg-gray-100"
      >
        <Bell className="w-5 h-5" />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full px-1.5 py-0.5">
            {unreadCount}
          </span>
        )}
      </button>

      {open && <NotificationDropdown />}
    </div>
  );
}
