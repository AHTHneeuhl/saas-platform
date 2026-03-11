'use client';

import { getSocket } from '@/lib/ws-client';
import { useEffect } from 'react';
import { NotificationBell } from '../components/notifications/notification-bell';
import { SearchInput } from '../components/search/search-input';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const socket = getSocket();

    socket.onopen = () => {
      console.log('Realtime connected');
    };
  }, []);
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
