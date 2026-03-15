export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Analytics</h1>

      <div className="grid grid-cols-4 gap-4">
        <div className="border rounded p-4">
          <p className="text-sm text-gray-500">Total Projects</p>
          <p className="text-xl font-semibold">0</p>
        </div>

        <div className="border rounded p-4">
          <p className="text-sm text-gray-500">Total Tasks</p>
          <p className="text-xl font-semibold">0</p>
        </div>

        <div className="border rounded p-4">
          <p className="text-sm text-gray-500">Completed Tasks</p>
          <p className="text-xl font-semibold">0</p>
        </div>

        <div className="border rounded p-4">
          <p className="text-sm text-gray-500">Active Members</p>
          <p className="text-xl font-semibold">0</p>
        </div>
      </div>
    </div>
  );
}
