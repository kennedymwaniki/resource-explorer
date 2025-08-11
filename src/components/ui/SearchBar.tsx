import React, { useState, useCallback, useRef, useEffect, memo } from "react";
import { Input } from "./Input";
import { Button } from "./Button";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
}

const SearchBarComponent: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search characters...",
  initialValue = "",
}) => {
  const [query, setQuery] = useState(initialValue);
  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInitialMount = useRef(true);
  // Keep a stable reference to the latest onSearch to avoid effect re-runs causing unintended searches
  const onSearchRef = useRef(onSearch);

  // Update the ref whenever onSearch changes without triggering a search
  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  // trigger search after user stops typing
  useEffect(() => {
    // skip the initial mount to prevent unnecessary API calls
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // clear previous timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Set new timeout for debounced search
    debounceTimeoutRef.current = setTimeout(() => {
      onSearchRef.current(query.trim());
    }, 500);

    // cleanup timeout on component unmount or dependency change
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [query]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      // clear debounce timeout since we're submitting immediately
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      onSearchRef.current(query.trim());
    },
    [query]
  );

  const handleClear = useCallback(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    setQuery("");
    onSearchRef.current("");
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    []
  );

  // update local state when initialValue changes (e.g., from URL params)
  useEffect(() => {
    // only sync when initialValue changes from parent (e.g., URL params)
    setQuery(initialValue);
  }, [initialValue]);

  // cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="w-full"
          />
        </div>
        <Button type="submit" variant="primary">
          Search
        </Button>
        {query && (
          <Button type="button" variant="outline" onClick={handleClear}>
            Clear
          </Button>
        )}
      </div>
    </form>
  );
};

export const SearchBar = memo(SearchBarComponent);
