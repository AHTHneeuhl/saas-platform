import {
  createCheckoutSession,
  createBillingPortal,
  getSubscription,
} from '@/lib/api/billing';

export const billingService = {
  checkout: () => createCheckoutSession(),
  portal: () => createBillingPortal(),
  subscription: () => getSubscription(),
};
