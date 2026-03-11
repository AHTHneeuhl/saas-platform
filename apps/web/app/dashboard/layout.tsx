'use client';

import { getSocket } from '@/lib/ws-client';
import { useCommentStore } from '@/store/comment-store';
import { useRealtimeStore } from '@/store/realtime-store';
import { useTaskStore } from '@/store/task-store';
import { useEffect } from 'react';
import { NotificationBell } from '../components/notifications/notification-bell';
import { SearchInput } from '../components/search/search-input';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const setConnected = useRealtimeStore((s) => s.setConnected);
  const addTask = useTaskStore((s) => s.addTask);
  const updateTask = useTaskStore((s) => s.updateTask);
  const addComment = useCommentStore((s) => s.addComment);

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
        addTask(data.payload);
      }

      if (data.type === 'task_updated') {
        updateTask(data.payload);
      }

      if (data.type === 'comment_created') {
        addComment(data.payload);
      }

      if (data.type === 'comment_deleted') {
        console.log('Comment deleted:', data.payload);
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
