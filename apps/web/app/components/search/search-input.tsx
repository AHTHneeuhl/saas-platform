'use client';

import { useState } from 'react';
import { SearchResultsDropdown } from './search-results-dropdown';

export function SearchInput() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(e.target.value.length > 0);
        }}
        className="w-64 border rounded px-3 py-1.5 text-sm"
      />
      {open && <SearchResultsDropdown />}
    </div>
  );
}
