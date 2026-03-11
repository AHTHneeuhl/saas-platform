'use client';

import { useEffect, useState } from 'react';
import { OrgItem } from './org-item';
import { useAuthStore } from '@/store/auth-store';

type Org = {
  id: string;
  name: string;
};

export function OrgSwitcher() {
  const { token } = useAuthStore();
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:4000/org', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setOrgs(data.data));
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('orgId');
    if (stored) setSelectedOrg(stored);
  }, []);

  return (
    <select
      className="border rounded-md px-3 py-2 w-[200px]"
      value={selectedOrg}
      onChange={(e) => {
        const id = e.target.value;
        setSelectedOrg(id);
        localStorage.setItem('orgId', id);
      }}
    >
      <option>Select Workspace</option>

      {orgs
        ? orgs.map((org: Org) => (
            <OrgItem key={org.id} id={org.id} name={org.name} />
          ))
        : null}
    </select>
  );
}
