import { createCheckoutSession, createBillingPortal } from '@/lib/api/billing';

export const billingService = {
  checkout: () => createCheckoutSession(),
  portal: () => createBillingPortal(),
};
