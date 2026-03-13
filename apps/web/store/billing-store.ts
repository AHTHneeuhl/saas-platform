import { create } from 'zustand';

type BillingState = {
  plan: string;
  setPlan: (plan: string) => void;
};

export const useBillingStore = create<BillingState>((set) => ({
  plan: 'Free',
  setPlan: (plan) => set({ plan }),
}));
