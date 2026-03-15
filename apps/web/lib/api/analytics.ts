import { apiFetch } from '@/services/api-client';

export function getAnalytics() {
  return apiFetch('/analytics', {
    next: { revalidate: 60 },
  });
}
