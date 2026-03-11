import { create } from 'zustand';

type OrgState = {
  orgId: string | null;
  setOrgId: (id: string) => void;
};

export const useOrgStore = create<OrgState>((set) => ({
  orgId: typeof window !== 'undefined' ? localStorage.getItem('orgId') : null,

  setOrgId: (id) => {
    localStorage.setItem('orgId', id);
    set({ orgId: id });
  },
}));
