'use client';

import { SubscriptionStatus } from '@/app/components/billing/subscription-status';
import { UsageLimits } from '@/app/components/billing/usage-limits';
import { billingService } from '@/services/billing-service';

export default function BillingPage() {
  const handleCheckout = async () => {
    const { url } = await billingService.checkout();
    window.location.href = url;
  };

  const handlePortal = async () => {
    const { url } = await billingService.portal();
    window.location.href = url;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Billing</h1>

      <div className="mt-6 space-y-4">
        <SubscriptionStatus plan="Free" />
        <UsageLimits
          projects={2}
          projectLimit={5}
          members={3}
          memberLimit={10}
        />

        <button
          onClick={handleCheckout}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Upgrade Plan
        </button>

        <button onClick={handlePortal} className="px-4 py-2 border rounded">
          Open Billing Portal
        </button>
      </div>
    </div>
  );
}
