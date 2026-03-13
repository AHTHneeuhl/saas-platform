'use client';

import { SubscriptionStatus } from '@/app/components/billing/subscription-status';
import { UsageLimits } from '@/app/components/billing/usage-limits';
import { billingService } from '@/services/billing-service';
import { useBillingStore } from '@/store/billing-store';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function BillingPage() {
  const plan = useBillingStore((s) => s.plan);
  const setPlan = useBillingStore((s) => s.setPlan);
  const loading = useBillingStore((s) => s.loading);
  const setLoading = useBillingStore((s) => s.setLoading);

  const handleCheckout = async () => {
    const { url } = await billingService.checkout();
    window.location.href = url;
  };

  const handlePortal = async () => {
    const { url } = await billingService.portal();
    window.location.href = url;
  };

  useEffect(() => {
    setLoading(true);

    billingService
      .subscription()
      .then((data) => {
        setPlan(data.plan);
      })
      .catch(() => {
        toast.error('Failed to load subscription');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setPlan, setLoading]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Billing</h1>

      {loading && <p className="text-sm text-gray-500">Loading billing...</p>}

      <div className="mt-6 space-y-4">
        <SubscriptionStatus plan={plan} />
        <UsageLimits
          projects={2}
          projectLimit={5}
          members={3}
          memberLimit={10}
        />

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
        >
          Upgrade Plan
        </button>

        <button
          onClick={handlePortal}
          disabled={loading}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Open Billing Portal
        </button>
      </div>
    </div>
  );
}
