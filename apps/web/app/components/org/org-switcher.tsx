'use client';

import { useEffect, useState } from 'react';
import { OrgItem } from './org-item';
import { useAuthStore } from '@/store/auth-store';
import { useOrgStore } from '@/store/org-store';

type Org = {
  id: string;
  name: string;
};

export function OrgSwitcher() {
  const { token } = useAuthStore();
  const [orgs, setOrgs] = useState<Org[]>([]);
  const { orgId, setOrgId } = useOrgStore();

  useEffect(() => {
    fetch('http://localhost:4000/org', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setOrgs(data.data));
  }, []);

  return (
    <select
      className="border rounded-md px-3 py-2 w-[200px]"
      value={orgId ?? ''}
      onChange={(e) => setOrgId(e.target.value)}
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
