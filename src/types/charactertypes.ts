export interface Character {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export interface CharacterFilters {
  status?: "alive" | "dead" | "unknown" | "";
  gender?: "female" | "male" | "genderless" | "unknown" | "";
  name?: string;
  page?: number;
}

export type SortOption = "name" | "status" | "species" | "gender";
export type SortOrder = "asc" | "desc";
