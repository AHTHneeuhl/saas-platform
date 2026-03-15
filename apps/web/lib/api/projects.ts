import { apiFetch } from '@/services/api-client';
import { Project } from '@/types/project';
import { Task } from '@/types/task';

type TasksResponse = {
  data: Task[];
};

export async function fetchProject(
  orgId: string,
  projectId: string,
  token: string,
) {
  return apiFetch<Project>(`/org/${orgId}/projects/${projectId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function fetchProjectTasks(
  orgId: string,
  projectId: string,
  token: string,
) {
  return apiFetch<TasksResponse>(`/org/${orgId}/projects/${projectId}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
