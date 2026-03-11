type Props = {
  title: string;
};

export function TaskCard({ title }: Props) {
  return (
    <div className="border rounded p-3 bg-white shadow-sm">
      <p className="text-sm font-medium">{title}</p>
    </div>
  );
}
