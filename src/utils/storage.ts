// Utility helpers for working with localStorage (favorites persistence)
// Stored as full Character objects array to allow offline display without refetch.

export const FAVORITES_KEY = "favorites";

export interface StoredCharacter {
  id: number;
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
  image?: string;
  origin?: { name: string; url?: string };
  location?: { name: string; url?: string };
  episode?: string[];
}

export const loadFavorites = (): StoredCharacter[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(FAVORITES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    console.error("Failed to parse favorites from localStorage");
  }
  return [];
};

export const saveFavorites = (favorites: StoredCharacter[]) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch {
    console.log("Failed to save Item to favourites");
  }
};

export const clearFavorites = () => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(FAVORITES_KEY);
  } catch {
    console.error("Failed to clear favorites from localStorage");
  }
};
