'use client';

import { useEffect, useState } from 'react';
import { ProjectCard } from './project-card';
import { useAuth } from '@/context/auth-context';

type Project = {
  id: string;
  name: string;
  description?: string;
};

export function ProjectsGrid() {
  const { token } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/org/1/projects', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setProjects(data.data));
  }, []);

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
