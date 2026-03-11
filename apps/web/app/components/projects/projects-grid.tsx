'use client';

import { useEffect, useState } from 'react';
import { ProjectCard } from './project-card';
import { useAuthStore } from '@/store/auth-store';

type Project = {
  id: string;
  name: string;
  description?: string;
};

export function ProjectsGrid({ reloadKey }: { reloadKey: boolean }) {
  const { token } = useAuthStore();
  const [projects, setProjects] = useState<Project[]>([]);
  const orgId = localStorage.getItem('orgId');

  async function loadProjects() {
    const res = await fetch(`http://localhost:4000/org/${orgId}/projects`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setProjects(data.data);
  }

  useEffect(() => {
    loadProjects();
  }, [reloadKey]);

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {projects
        ? projects.map((p: Project) => (
            <ProjectCard key={p.id} name={p.name} description={p.description} />
          ))
        : null}
    </div>
  );
}
