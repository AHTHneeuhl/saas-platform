import { create } from 'zustand';
import { Attachment } from '@/types/attachment';

type AttachmentState = {
  attachments: Attachment[];
  setAttachments: (items: Attachment[]) => void;
};

export const useAttachmentStore = create<AttachmentState>((set) => ({
  attachments: [],
  setAttachments: (items) => set({ attachments: items }),
}));
