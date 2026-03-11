'use client';

type SearchResult = {
  id: string;
  title?: string;
  name?: string;
};

export function SearchResultsDropdown({
  results,
}: {
  results: SearchResult[];
}) {
  return (
    <div className="absolute mt-2 w-96 bg-white border rounded-lg shadow-lg">
      <div className="max-h-80 overflow-y-auto">
        {results.length === 0 ? (
          <p className="p-3 text-sm text-gray-500">No results</p>
        ) : (
          results.map((item: SearchResult) => (
            <div
              key={item.id}
              className="p-3 border-b hover:bg-gray-50 text-sm cursor-pointer"
            >
              {item.title || item.name}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
