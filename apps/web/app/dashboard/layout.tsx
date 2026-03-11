'use client';

import { getSocket } from '@/lib/ws-client';
import { useRealtimeStore } from '@/store/realtime-store';
import { useEffect } from 'react';
import { NotificationBell } from '../components/notifications/notification-bell';
import { SearchInput } from '../components/search/search-input';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const setConnected = useRealtimeStore((s) => s.setConnected);

  useEffect(() => {
    const socket = getSocket();

    socket.onopen = () => {
      setConnected(true);
    };

    socket.onclose = () => {
      setConnected(false);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'task_created') {
        console.log('Task created:', data.payload);
      }

      if (data.type === 'task_updated') {
        console.log('Task updated:', data.payload);
      }
    };
  }, [setConnected]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-14 border-b flex items-center justify-between px-6">
        <h1 className="font-semibold">DevFlow</h1>

        <div className="flex items-center gap-4">
          <SearchInput />
          <NotificationBell />
        </div>
      </header>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
