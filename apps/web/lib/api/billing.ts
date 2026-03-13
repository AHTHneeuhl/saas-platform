import {
  CheckoutSessionResponse,
  BillingPortalResponse,
} from '@/types/billing';

export async function createCheckoutSession(): Promise<CheckoutSessionResponse> {
  const res = await fetch('/api/billing/checkout', {
    method: 'POST',
    credentials: 'include',
  });

  return res.json();
}

export async function createBillingPortal(): Promise<BillingPortalResponse> {
  const res = await fetch('/api/billing/portal', {
    method: 'POST',
    credentials: 'include',
  });

  return res.json();
}
