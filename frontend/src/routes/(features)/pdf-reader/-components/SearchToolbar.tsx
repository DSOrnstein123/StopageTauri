import { useState } from "react";
import { useSearch } from "@embedpdf/plugin-search/react";

const SearchToolbar = ({ documentId }: { documentId: string }) => {
  const { state: results, provides: searchApi } = useSearch(documentId);
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!searchApi || !query) return;
    searchApi.searchAllPages(query);
  };

  const handleNext = () => searchApi?.nextResult();
  const handlePrev = () => searchApi?.previousResult();

  return (
    <div className="flex items-center gap-2 p-2">
      <div className="flex items-center rounded-md border border-gray-300 bg-white px-2 shadow-sm dark:border-gray-600 dark:bg-gray-900">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Tìm kiếm..."
          className="w-48 bg-transparent py-1 text-sm outline-none dark:text-white"
        />
      </div>

      <button
        onClick={handleSearch}
        className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
      >
        Tìm
      </button>

      {results.total > 0 && (
        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <span className="mx-2 font-medium">
            {results.activeResultIndex} / {results.total}
          </span>
          <button
            onClick={handlePrev}
            className="rounded border border-gray-300 bg-white px-2 py-0.5 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            className="rounded border border-gray-300 bg-white px-2 py-0.5 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchToolbar;
