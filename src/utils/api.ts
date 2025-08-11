import type { ApiResponse, CharacterFilters } from "../types/charactertypes";

const BASE_URL = "https://rickandmortyapi.com/api";

export const buildCharacterUrl = (filters: CharacterFilters): string => {
  const params = new URLSearchParams();

  if (filters.name && filters.name.trim()) {
    params.append("name", filters.name.trim());
  }

  if (filters.status) {
    params.append("status", filters.status);
  }

  if (filters.gender) {
    params.append("gender", filters.gender);
  }

  if (filters.page && filters.page > 1) {
    params.append("page", filters.page.toString());
  }

  const queryString = params.toString();
  return `${BASE_URL}/character${queryString ? `?${queryString}` : ""}`;
};

export const fetchCharacters = async (
  filters: CharacterFilters,
  signal?: AbortSignal
): Promise<ApiResponse> => {
  const url = buildCharacterUrl(filters);

  try {
    const response = await fetch(url, {
      signal, // Pass signal to fetch
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // handle abort errors gracefully
    if (error instanceof Error && error.name === "AbortError") {
      console.log("Request was cancelled");
      throw error;
    }

    console.error("Error fetching characters:", error);
    throw error;
  }
};

export const fetchCharacterById = async (id: string, signal?: AbortSignal) => {
  const response = await fetch(`${BASE_URL}/character/${id}`, {
    signal,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// ! Before debouncing

// import type { ApiResponse, CharacterFilters } from "../types/charactertypes";

// const BASE_URL = "https://rickandmortyapi.com/api";

// export const buildCharacterUrl = (filters: CharacterFilters): string => {
//   const params = new URLSearchParams();

//   if (filters.name && filters.name.trim()) {
//     params.append("name", filters.name.trim());
//   }

//   if (filters.status) {
//     params.append("status", filters.status);
//   }

//   if (filters.gender) {
//     params.append("gender", filters.gender);
//   }

//   if (filters.page && filters.page > 1) {
//     params.append("page", filters.page.toString());
//   }

//   const queryString = params.toString();
//   return `${BASE_URL}/character${queryString ? `?${queryString}` : ""}`;
// };

// export const fetchCharacters = async (
//   filters: CharacterFilters
// ): Promise<ApiResponse> => {
//   const url = buildCharacterUrl(filters);

//   try {
//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching characters:", error);
//     throw error;
//   }
// };

// export const fetchCharacterById = async (id: string) => {
//   const response = await fetch(`${BASE_URL}/character/${id}`);

//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }

//   return response.json();
// };
