/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";

import { Button } from "../components/ui/Button";
import type { Character, CharacterFilters } from "../types/charactertypes";
import { useCharacters } from "../hooks/useCharacter";
import { LoadingCard, LoadingSpinner } from "../components/ui/LoadingSpinner";
import { SearchBar } from "../components/ui/SearchBar";
import { FilterBar } from "../components/ui/FilterBar";
import { CharacterCard } from "../components/ui/CharacterCard";
import { Pagination } from "../components/ui/Pagination";
import { ThemeToggle } from "../components/ui/ThemeToggle";
import MyFavorites from "../components/ui/MyFavorites";
import { CiHeart } from "react-icons/ci";
import { useFavorites } from "../hooks/useFavorites";

export const CharactersPage: React.FC = () => {
  const navigate = useNavigate();

  const searchParams = useSearch({ from: "/character" }) as any;

  const [filters, setFilters] = useState<CharacterFilters>({
    page: parseInt(searchParams?.page || "1", 10),
    status: searchParams?.status || "",
    gender: searchParams?.gender || "",
    name: searchParams?.name || "",
  });

  // Helper to compare filters
  const areFiltersEqual = useCallback(
    (a: CharacterFilters, b: CharacterFilters) =>
      a.page === b.page &&
      a.status === b.status &&
      a.gender === b.gender &&
      a.name === b.name,
    []
  );

  // Derive current URL filters with stable dependencies (avoid using whole object in deps)
  const currentUrlFilters = useMemo<CharacterFilters>(
    () => ({
      page: parseInt(searchParams?.page || "1", 10),
      status: searchParams?.status || "",
      gender: searchParams?.gender || "",
      name: searchParams?.name || "",
    }),
    [
      searchParams?.page,
      searchParams?.status,
      searchParams?.gender,
      searchParams?.name,
    ]
  );

  // sync url with filters only when values actually change
  useEffect(() => {
    setFilters((prev) =>
      areFiltersEqual(prev, currentUrlFilters) ? prev : currentUrlFilters
    );
  }, [currentUrlFilters, areFiltersEqual]);

  const { data, isLoading, error, isFetching } = useCharacters(filters);
  const { favorites } = useFavorites();
  const [showDrawer, setShowDrawer] = useState(false);

  //  update URL with search parameters
  const updateUrlWithFilters = useCallback(
    (newFilters: CharacterFilters) => {
      // skip navigation if URL already reflects these filters
      if (areFiltersEqual(newFilters, currentUrlFilters)) return;

      const searchObj: Record<string, any> = {};
      if (newFilters.page && newFilters.page > 1)
        searchObj.page = newFilters.page;
      if (newFilters.name && newFilters.name.trim())
        searchObj.name = newFilters.name.trim();
      if (newFilters.status) searchObj.status = newFilters.status;
      if (newFilters.gender) searchObj.gender = newFilters.gender;

      navigate({ to: "/character", search: searchObj, replace: false });
    },
    [navigate, areFiltersEqual, currentUrlFilters]
  );

  const handleSearch = useCallback(
    (name: string) => {
      const newFilters = { ...filters, name, page: 1 };
      setFilters((prev) =>
        areFiltersEqual(prev, newFilters) ? prev : newFilters
      );
      updateUrlWithFilters(newFilters);
    },
    [filters, updateUrlWithFilters, areFiltersEqual]
  );

  const handleFiltersChange = useCallback(
    (newFilters: CharacterFilters) => {
      setFilters((prev) =>
        areFiltersEqual(prev, newFilters) ? prev : newFilters
      );
      updateUrlWithFilters(newFilters);
    },
    [updateUrlWithFilters, areFiltersEqual]
  );

  const handleClearFilters = useCallback(() => {
    const clearedFilters: CharacterFilters = {
      page: 1,
      status: "",
      gender: "",
      name: "",
    };
    setFilters(clearedFilters);
    navigate({
      to: "/character",
      search: {},
      replace: false,
    });
  }, [navigate]);

  const handlePageChange = useCallback(
    (page: number) => {
      const newFilters = { ...filters, page };
      setFilters((prev) =>
        areFiltersEqual(prev, newFilters) ? prev : newFilters
      );
      updateUrlWithFilters(newFilters);
    },
    [filters, updateUrlWithFilters, areFiltersEqual]
  );

  const handleCharacterClick = useCallback(
    (character: Character) => {
      navigate({
        to: "/character/$characterId",
        params: { characterId: character.id.toString() },
      });
    },
    [navigate]
  );

  const memoizedCharacters = useMemo(() => {
    return data?.results || [];
  }, [data?.results]);

  const renderLoadingCards = () => {
    return Array.from({ length: 20 }, (_, i) => <LoadingCard key={i} />);
  };

  const renderError = () => {
    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof error.message === "string" &&
      error.message.includes("404")
    ) {
      return (
        <div className="col-span-full text-center py-12">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-medium text-theme-primary mb-2">
              No characters found
            </h3>
            <p className="text-theme-secondary mb-4">
              No characters match your current search criteria. Try adjusting
              your filters or search terms.
            </p>
            <Button onClick={handleClearFilters} variant="primary">
              Clear all filters
            </Button>
          </div>
        </div>
      );
    }

    // no error for aborted state
    if (
      error &&
      typeof error === "object" &&
      "name" in error &&
      error.name === "AbortError"
    ) {
      return null;
    }

    return (
      <div className="col-span-full text-center py-12">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-medium text-theme-primary mb-2">
            Something went wrong
          </h3>
          <p className="text-theme-secondary mb-4">
            Failed to load characters. Please try again.
          </p>
          <Button onClick={() => window.location.reload()} variant="primary">
            Retry
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-theme-primary transition-colors">
      <div className="bg-theme-card shadow-sm border-b border-theme-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-6">
              <div>
                <h1 className="text-3xl font-bold text-theme-primary">
                  Rick and Morty Characters
                </h1>
                <p className="mt-1 text-sm text-theme-secondary">
                  Explore all characters from the Rick and Morty universe
                </p>
              </div>
              <ThemeToggle />
            </div>
            {data && (
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total characters:{" "}
                  <span className="font-medium">{data.info.count}</span>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Page {filters.page || 1} of {data.info.pages}
                </p>
              </div>
            )}
            <div className="ml-4 flex items-center">
              <Button
                variant="primary"
                onClick={() => setShowDrawer(true)}
                className="flex items-center gap-2"
              >
                <CiHeart className={favorites.length ? "text-red-500" : ""} />
                Favorites ({favorites.length})
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6 mb-8">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search characters by name..."
            initialValue={filters.name || ""}
          />

          <FilterBar
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
          />
        </div>

        {isFetching && (
          <div className="flex items-center justify-center py-4">
            <LoadingSpinner size="md" className="mr-2" />
            <span className="text-theme-secondary">Loading characters...</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {isLoading
            ? renderLoadingCards()
            : error
            ? renderError()
            : memoizedCharacters.map((character) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  onClick={handleCharacterClick}
                />
              ))}
        </div>

        {data && !error && (
          <Pagination
            currentPage={filters.page || 1}
            totalPages={data.info.pages}
            hasNextPage={!!data.info.next}
            hasPrevPage={!!data.info.prev}
            onPageChange={handlePageChange}
            isLoading={isFetching}
          />
        )}
      </div>

      {showDrawer && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setShowDrawer(false)}
            aria-label="Close favorites drawer"
          />
          <aside
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] max-w-[90vw] bg-theme-card shadow-xl z-50 flex flex-col border-l border-theme-primary animate-slide-in"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between p-4 border-b border-theme-primary">
              <h2 className="text-xl font-semibold text-theme-primary flex items-center gap-2">
                <CiHeart className="text-red-500" /> Favorites
              </h2>
              <button
                onClick={() => setShowDrawer(false)}
                className="text-theme-secondary hover:text-theme-primary transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1">
              <MyFavorites onSelect={() => setShowDrawer(false)} />
            </div>
          </aside>
        </>
      )}
    </div>
  );
};
