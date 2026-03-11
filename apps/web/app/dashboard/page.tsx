'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';

export default function DashboardPage() {
  const { token } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  if (!token) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg bg-white p-4 shadow">
          <h2 className="text-lg font-medium">Projects</h2>
          <p className="text-gray-500 text-sm">Manage your projects</p>
        </div>

        <div className="rounded-lg bg-white p-4 shadow">
          <h2 className="text-lg font-medium">Tasks</h2>
          <p className="text-gray-500 text-sm">View assigned tasks</p>
        </div>

        <div className="rounded-lg bg-white p-4 shadow">
          <h2 className="text-lg font-medium">Notifications</h2>
          <p className="text-gray-500 text-sm">Recent updates</p>
        </div>
      </div>
    </div>
  );
}
