type Props = {
  title: string;
  value: number;
};

export function MetricCard({ title, value }: Props) {
  return (
    <div className="border rounded p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}
