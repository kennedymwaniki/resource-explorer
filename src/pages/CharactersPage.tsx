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

export const CharactersPage: React.FC = () => {
  const navigate = useNavigate();

  const searchParams = useSearch({ from: "/character" }) as any;

  const [filters, setFilters] = useState<CharacterFilters>({
    page: parseInt(searchParams?.page || "1", 10),
    status: searchParams?.status || "",
    gender: searchParams?.gender || "",
    name: searchParams?.name || "",
  });

  // sync filters with URL search parameters
  useEffect(() => {
    setFilters({
      page: parseInt(searchParams?.page || "1", 10),
      status: searchParams?.status || "",
      gender: searchParams?.gender || "",
      name: searchParams?.name || "",
    });
  }, [searchParams]);

  const { data, isLoading, error, isFetching } = useCharacters(filters);

  //  update URL with search parameters
  const updateUrlWithFilters = useCallback(
    (newFilters: CharacterFilters) => {
      const searchObj: Record<string, any> = {};
      if (newFilters.page && newFilters.page > 1) {
        searchObj.page = newFilters.page;
      }
      if (newFilters.name && newFilters.name.trim()) {
        searchObj.name = newFilters.name.trim();
      }
      if (newFilters.status) {
        searchObj.status = newFilters.status;
      }
      if (newFilters.gender) {
        searchObj.gender = newFilters.gender;
      }

      navigate({
        to: "/character",
        search: searchObj,
        replace: false,
      });
    },
    [navigate]
  );

  const handleSearch = useCallback(
    (name: string) => {
      const newFilters = {
        ...filters,
        name,
        page: 1,
      };
      setFilters(newFilters);
      updateUrlWithFilters(newFilters);
    },
    [filters, updateUrlWithFilters]
  );

  const handleFiltersChange = useCallback(
    (newFilters: CharacterFilters) => {
      setFilters(newFilters);
      updateUrlWithFilters(newFilters);
    },
    [updateUrlWithFilters]
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
      const newFilters = {
        ...filters,
        page,
      };
      setFilters(newFilters);
      updateUrlWithFilters(newFilters);
    },
    [filters, updateUrlWithFilters]
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
      {/* Header */}
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

        {/* Pagination */}
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
    </div>
  );
};
