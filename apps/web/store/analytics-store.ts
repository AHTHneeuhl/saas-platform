import { create } from 'zustand';
import { AnalyticsMetrics } from '@/types/analytics';

type AnalyticsState = {
  metrics: AnalyticsMetrics | null;
  loading: boolean;
  setMetrics: (m: AnalyticsMetrics) => void;
  setLoading: (v: boolean) => void;
};

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  metrics: null,
  loading: false,
  setMetrics: (m) => set({ metrics: m }),
  setLoading: (v) => set({ loading: v }),
}));
