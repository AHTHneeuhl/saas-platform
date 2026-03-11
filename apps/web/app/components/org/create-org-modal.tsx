'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/auth-store';

export function CreateOrgModal({ onClose }: { onClose: () => void }) {
  const { token } = useAuthStore();
  const [name, setName] = useState('');

  async function createOrg() {
    await fetch('http://localhost:4000/org', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="relative bg-white p-6 rounded-lg w-[400px]">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-4">Create Workspace</h2>

        <input
          placeholder="Workspace name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <button
          onClick={createOrg}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Create
        </button>
      </div>
    </div>
  );
}
