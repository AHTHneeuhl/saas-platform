'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { OrgItem } from './org-item';

type Org = {
  id: string;
  name: string;
};

export function OrgSwitcher() {
  const { token } = useAuth();
  const [orgs, setOrgs] = useState<Org[]>([]);

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
    <select className="border rounded-md px-3 py-2 w-[200px]">
      <option>Select Workspace</option>

      {orgs
        ? orgs.map((org: Org) => (
            <OrgItem key={org.id} id={org.id} name={org.name} />
          ))
        : null}
    </select>
  );
}
