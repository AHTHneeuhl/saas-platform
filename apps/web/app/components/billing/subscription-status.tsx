export function SubscriptionStatus({ plan }: { plan: string }) {
  return (
    <div className="border rounded p-4">
      <p className="text-sm text-gray-500">Current Plan</p>
      <p className="text-lg font-semibold">{plan}</p>
    </div>
  );
}
