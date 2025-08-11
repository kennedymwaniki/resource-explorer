import { useQuery } from "@tanstack/react-query";
import type { CharacterFilters } from "../types/charactertypes";
import { fetchCharacterById, fetchCharacters } from "../utils/api";

export const useCharacters = (filters: CharacterFilters) => {
  return useQuery({
    queryKey: ["characters", filters],
    queryFn: () => fetchCharacters(filters),

    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: (failureCount, error: unknown) => {
      if (error instanceof Error && error.message.includes("404")) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

export const useCharacterById = (id: string) => {
  return useQuery({
    queryKey: ["character", id],
    queryFn: () => fetchCharacterById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
