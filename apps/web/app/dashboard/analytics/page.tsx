'use client';

import { useEffect } from 'react';
import { analyticsService } from '@/services/analytics-service';
import { useAnalyticsStore } from '@/store/analytics-store';

export default function AnalyticsPage() {
  const { metrics, setMetrics, loading, setLoading } = useAnalyticsStore();

  useEffect(() => {
    setLoading(true);

    analyticsService
      .metrics()
      .then(setMetrics)
      .finally(() => setLoading(false));
  }, [setMetrics, setLoading]);

  if (loading) {
    return <p className="text-sm text-gray-500">Loading analytics...</p>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Analytics</h1>

      <div className="grid grid-cols-4 gap-4">
        <div className="border rounded p-4">
          <p className="text-sm text-gray-500">Total Projects</p>
          <p className="text-xl font-semibold">{metrics?.totalProjects ?? 0}</p>
        </div>

        <div className="border rounded p-4">
          <p className="text-sm text-gray-500">Total Tasks</p>
          <p className="text-xl font-semibold">{metrics?.totalTasks ?? 0}</p>
        </div>

        <div className="border rounded p-4">
          <p className="text-sm text-gray-500">Completed Tasks</p>
          <p className="text-xl font-semibold">
            {metrics?.completedTasks ?? 0}
          </p>
        </div>

        <div className="border rounded p-4">
          <p className="text-sm text-gray-500">Active Members</p>
          <p className="text-xl font-semibold">{metrics?.activeMembers ?? 0}</p>
        </div>
      </div>
    </div>
  );
}
