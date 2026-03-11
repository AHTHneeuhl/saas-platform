type Props = {
  name: string;
  description?: string;
};

export function ProjectCard({ name, description }: Props) {
  return (
    <div className="border rounded-lg p-4 hover:shadow">
      <h3 className="font-semibold text-lg">{name}</h3>
      {description && (
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      )}
    </div>
  );
}
