'use client';

import { useState } from 'react';

export function SearchInput() {
  const [query, setQuery] = useState('');

  return (
    <input
      type="text"
      placeholder="Search..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="w-64 border rounded px-3 py-1.5 text-sm"
    />
  );
}
