import { useRouter } from 'next/navigation';

type Props = {
  id: string;
  name: string;
  description?: string;
};

export function ProjectCard({ id, name, description }: Props) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/dashboard/projects/${id}`)}
      className="border rounded-lg p-4 hover:shadow cursor-pointer"
    >
      <h3 className="font-semibold text-lg">{name}</h3>
      {description && (
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      )}
    </div>
  );
}
