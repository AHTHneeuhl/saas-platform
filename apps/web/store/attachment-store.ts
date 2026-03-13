import { create } from 'zustand';
import { Attachment } from '@/types/attachment';

type AttachmentState = {
  attachments: Attachment[];
  loading: boolean;
  setAttachments: (items: Attachment[]) => void;
  setLoading: (loading: boolean) => void;
};

export const useAttachmentStore = create<AttachmentState>((set) => ({
  attachments: [],
  loading: false,
  setAttachments: (items) => set({ attachments: items }),
  setLoading: (loading) => set({ loading }),
}));
