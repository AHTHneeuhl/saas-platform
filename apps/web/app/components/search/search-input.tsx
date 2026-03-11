'use client';

import { useState } from 'react';
import { SearchResultsDropdown } from './search-results-dropdown';
import { search } from '@/services/search-service';

export function SearchInput() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState([]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={async (e) => {
          const value = e.target.value;
          setQuery(value);

          if (value.length === 0) {
            setOpen(false);
            return;
          }

          setOpen(true);

          const data = await search(value);
          setResults(data);
        }}
        className="w-64 border rounded px-3 py-1.5 text-sm"
      />
      {open && <SearchResultsDropdown results={results} />}
    </div>
  );
}
