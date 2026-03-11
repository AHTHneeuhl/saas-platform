import { create } from 'zustand';

interface RealtimeState {
  connected: boolean;
  setConnected: (status: boolean) => void;
}

export const useRealtimeStore = create<RealtimeState>((set) => ({
  connected: false,
  setConnected: (status) => set({ connected: status }),
}));
