'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { useOrgStore } from '@/store/org-store';

export function CommentInput() {
  const [text, setText] = useState('');
  const { taskId } = useParams();
  const { token } = useAuthStore();
  const { orgId } = useOrgStore();

  async function sendComment() {
    await fetch(`http://localhost:4000/org/${orgId}/tasks/${taskId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text }),
    });

    setText('');
  }

  return (
    <div className="mt-4 flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
        className="flex-1 border rounded px-3 py-2"
      />

      <button
        onClick={sendComment}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Send
      </button>
    </div>
  );
}
