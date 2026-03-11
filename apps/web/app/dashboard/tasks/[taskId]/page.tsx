'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { useOrgStore } from '@/store/org-store';
import { CommentInput } from '@/app/components/tasks/comment-input';

type Task = {
  id: string;
  title: string;
  description?: string;
};

type Comment = {
  id: string;
  text: string;
};

export default function TaskDetailsPage() {
  const [task, setTask] = useState<Task | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const { taskId } = useParams();
  const { token } = useAuthStore();
  const { orgId } = useOrgStore();

  useEffect(() => {
    async function loadTask() {
      const res = await fetch(
        `http://localhost:4000/org/${orgId}/tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();
      setTask(data);
    }
    async function loadComments() {
      const res = await fetch(
        `http://localhost:4000/org/${orgId}/tasks/${taskId}/comments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();
      setComments(data.data);
    }

    loadComments();

    loadTask();
  }, []);

  if (!task) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">{task.title}</h1>
      <p className="text-gray-500 mt-2">{task.description}</p>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>

        <div className="space-y-3">
          {comments.map((c) => (
            <div key={c.id} className="border rounded p-3 text-sm">
              {c.text}
            </div>
          ))}
        </div>

        <CommentInput />
      </div>
    </div>
  );
}
