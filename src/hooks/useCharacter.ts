import { useQuery } from "@tanstack/react-query";
import type { CharacterFilters } from "../types/charactertypes";
import { fetchCharacterById, fetchCharacters } from "../utils/api";

export const useCharacters = (filters: CharacterFilters) => {
  return useQuery({
    queryKey: ["characters", filters],
    queryFn: ({ signal }) => fetchCharacters(filters, signal),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    refetchOnReconnect: true,
    retry: (failureCount, error: unknown) => {
      if (error instanceof Error && error.message.includes("404")) {
        return false;
      }
      // don't retry if request was aborted
      if (error instanceof Error && error.name === "AbortError") {
        return false;
      }
      return failureCount < 3;
    },
  });
};

export const useCharacterById = (id: string) => {
  return useQuery({
    queryKey: ["character", id],
    queryFn: ({ signal }) => fetchCharacterById(id, signal),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchInterval: 5 * 60 * 1000,
    refetchOnReconnect: true,
    retry: (failureCount, error: unknown) => {
      // don't retry if request was aborted
      if (error instanceof Error && error.name === "AbortError") {
        return false;
      }
      return failureCount < 3;
    },
  });
};

// ! Before debouncing

// import { useQuery } from "@tanstack/react-query";
// import type { CharacterFilters } from "../types/charactertypes";
// import { fetchCharacterById, fetchCharacters } from "../utils/api";

// export const useCharacters = (filters: CharacterFilters) => {
//   return useQuery({
//     queryKey: ["characters", filters],
//     queryFn: () => fetchCharacters(filters),

//     staleTime: 5 * 60 * 1000,
//     gcTime: 10 * 60 * 1000,
//     retry: (failureCount, error: unknown) => {
//       if (error instanceof Error && error.message.includes("404")) {
//         return false;
//       }
//       return failureCount < 3;
//     },
//   });
// };

// export const useCharacterById = (id: string) => {
//   return useQuery({
//     queryKey: ["character", id],
//     queryFn: () => fetchCharacterById(id),
//     enabled: !!id,
//     staleTime: 10 * 60 * 1000, // 10 minutes
//   });
// };
