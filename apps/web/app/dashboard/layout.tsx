'use client';

import { getSocket } from '@/lib/ws-client';
import { useCommentStore } from '@/store/comment-store';
import { useNotificationStore } from '@/store/notification-store';
import { useRealtimeStore } from '@/store/realtime-store';
import { useTaskStore } from '@/store/task-store';
import Link from 'next/link';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { NotificationBell } from '../components/notifications/notification-bell';
import { SearchInput } from '../components/search/search-input';
import { ErrorBoundary } from '../components/errors/error-boundary';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const setConnected = useRealtimeStore((s) => s.setConnected);
  const addTask = useTaskStore((s) => s.addTask);
  const updateTask = useTaskStore((s) => s.updateTask);
  const addComment = useCommentStore((s) => s.addComment);
  const deleteComment = useCommentStore((s) => s.deleteComment);
  const addNotification = useNotificationStore((s) => s.addNotification);

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
        deleteComment(data.payload.id);
      }

      if (data.type === 'notification_created') {
        addNotification(data.payload);
        toast(data.payload.title);
      }
    };
  }, [setConnected]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-14 border-b flex items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <h1 className="font-semibold">DevFlow</h1>

          <nav className="flex items-center gap-4 text-sm">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/dashboard/projects">Projects</Link>
            <Link href="/dashboard/analytics">Analytics</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <SearchInput />
          <NotificationBell />
        </div>
      </header>

      <main className="flex-1 p-6">
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>
    </div>
  );
}
