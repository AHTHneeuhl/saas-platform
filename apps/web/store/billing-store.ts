import { create } from 'zustand';

type BillingState = {
  plan: string;
  loading: boolean;
  setPlan: (plan: string) => void;
  setLoading: (loading: boolean) => void;
};

export const useBillingStore = create<BillingState>((set) => ({
  plan: 'Free',
  loading: false,
  setPlan: (plan) => set({ plan }),
  setLoading: (loading) => set({ loading }),
}));
