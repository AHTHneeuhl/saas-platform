'use client';

import { useState } from 'react';
import { NewProjectButton } from '@/app/components/projects/new-project-button';
import { ProjectsGrid } from '@/app/components/projects/projects-grid';
import { CreateProjectModal } from '@/app/components/projects/create-project-modal';

export default function ProjectsPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Projects</h1>

        <NewProjectButton onClick={() => setOpen(true)} />
      </div>
      <ProjectsGrid />
      {open && <CreateProjectModal onClose={() => setOpen(false)} />}
    </div>
  );
}
