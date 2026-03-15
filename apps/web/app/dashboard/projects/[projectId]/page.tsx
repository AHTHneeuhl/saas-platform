'use client';

import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { CreateTaskModal } from '@/app/components/tasks/create-task-modal';
import { getProject } from '@/services/project-service';
import { useAuthStore } from '@/store/auth-store';
import { useOrgStore } from '@/store/org-store';
import { Project } from '@/types/project';

const TasksBoard = dynamic(
  () => import('@/app/components/tasks/tasks-board').then((m) => m.TasksBoard),
  {
    loading: () => <p className="mt-6">Loading board...</p>,
    ssr: false,
  },
);

export default function ProjectDetailsPage() {
  const { projectId } = useParams();
  const { token } = useAuthStore();
  const { orgId } = useOrgStore();

  const [project, setProject] = useState<Project | null>(null);
  const [openTaskModal, setOpenTaskModal] = useState(false);

  useEffect(() => {
    if (!projectId || !orgId || !token) return;

    async function loadProject() {
      const projectData = await getProject(
        orgId as string,
        projectId as string,
        token as string,
      );

      setProject(projectData);
    }

    loadProject();
  }, [projectId, orgId, token]);

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

      <TasksBoard projectId={projectId as string} />

      {openTaskModal && (
        <CreateTaskModal onClose={() => setOpenTaskModal(false)} />
      )}
    </div>
  );
}
