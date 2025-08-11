import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";

import { Button } from "../components/ui/Button";
import type { Character, CharacterFilters } from "../types/charactertypes";
import { useCharacters } from "../hooks/useCharacter";
import { LoadingCard, LoadingSpinner } from "../components/ui/LoadingSpinner";
import { SearchBar } from "../components/ui/SearchBar";
import { FilterBar } from "../components/ui/FilterBar";
import { CharacterCard } from "../components/ui/CharacterCard";
import { Pagination } from "../components/ui/Pagination";

export const CharactersPage: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<CharacterFilters>({
    page: 1,
    status: "",
    gender: "",
    name: "",
  });

  const { data, isLoading, error, isFetching } = useCharacters(filters);

  const handleSearch = useCallback((name: string) => {
    setFilters((prev) => ({
      ...prev,
      name,
      page: 1,
    }));
  }, []);

  const handleFiltersChange = useCallback((newFilters: CharacterFilters) => {
    setFilters(newFilters);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({
      page: 1,
      status: "",
      gender: "",
      name: "",
    });
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  }, []);

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
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No characters found
            </h3>
            <p className="text-gray-500 mb-4">
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Something went wrong
          </h3>
          <p className="text-gray-500 mb-4">
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Rick and Morty Characters
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Explore all characters from the Rick and Morty universe
              </p>
            </div>
            {data && (
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  Total characters:{" "}
                  <span className="font-medium">{data.info.count}</span>
                </p>
                <p className="text-sm text-gray-500">
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
            <span className="text-gray-600">Loading characters...</span>
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
