'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';

import { useAuthStore } from '@/store/auth-store';
import { useOrgStore } from '@/store/org-store';
import { CreateTaskModal } from '@/app/components/tasks/create-task-modal';
import { API_BASE_URL } from '@/services/api-client';

const TasksBoard = dynamic(
  () => import('@/app/components/tasks/tasks-board').then((m) => m.TasksBoard),
  {
    loading: () => <p className="mt-6">Loading board...</p>,
    ssr: false,
  },
);

type Project = {
  id: string;
  name: string;
  description?: string;
};

type Task = {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'done';
};

export default function ProjectDetailsPage() {
  const { projectId } = useParams();
  const { token } = useAuthStore();
  const { orgId } = useOrgStore();

  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!projectId || !orgId || !token) return;

    async function loadProject() {
      const res = await fetch(
        `${API_BASE_URL}/org/${orgId}/projects/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();
      setProject(data);
    }

    async function loadTasks() {
      const res = await fetch(
        `${API_BASE_URL}/org/${orgId}/projects/${projectId}/tasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();
      setTasks(data.data);
    }

    loadProject();
    loadTasks();
  }, [projectId, orgId, token, refreshKey]);

  if (!project) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">{project.name}</h1>
      <p className="text-gray-500 mt-2">{project.description}</p>

      <div className="flex items-center justify-between mt-8 mb-4">
        <h2 className="text-xl font-semibold">Tasks</h2>

        <button
          onClick={() => setOpenTaskModal(true)}
          className="px-3 py-2 bg-blue-600 text-white rounded"
        >
          Add Task
        </button>
      </div>

      <TasksBoard key={refreshKey} tasks={tasks} />

      {openTaskModal && (
        <CreateTaskModal
          onClose={() => setOpenTaskModal(false)}
          onCreated={() => {
            setOpenTaskModal(false);
            setRefreshKey((k) => k + 1);
          }}
        />
      )}
    </div>
  );
}
