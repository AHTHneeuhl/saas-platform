import { create } from 'zustand';
import { Comment } from '@/types/comment';

interface CommentState {
  comments: Comment[];
  addComment: (comment: Comment) => void;
  deleteComment: (id: string) => void;
}

export const useCommentStore = create<CommentState>((set) => ({
  comments: [],

  addComment: (comment) =>
    set((state) => ({
      comments: [...state.comments, comment],
    })),
  deleteComment: (id) =>
    set((state) => ({
      comments: state.comments.filter((c) => c.id !== id),
    })),
}));
