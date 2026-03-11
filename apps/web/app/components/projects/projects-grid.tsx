import { ProjectCard } from './project-card';

export function ProjectsGrid() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <ProjectCard name="DevFlow" description="Task management SaaS" />
    </div>
  );
}
