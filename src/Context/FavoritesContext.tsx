/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Character } from "../types/charactertypes";
import {
  loadFavorites,
  saveFavorites,
  type StoredCharacter,
} from "../utils/storage";

export interface FavoritesContextValue {
  favorites: StoredCharacter[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (character: Character) => void;
  removeFavorite: (id: number) => void;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<StoredCharacter[]>(() =>
    loadFavorites()
  );

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === "favorites") {
        setFavorites(loadFavorites());
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const isFavorite = useCallback(
    (id: number) => favorites.some((f) => f.id === id),
    [favorites]
  );

  const toggleFavorite = useCallback((character: Character) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.id === character.id)) {
        return prev.filter((f) => f.id !== character.id);
      }
      const minimal: StoredCharacter = {
        id: character.id,
        name: character.name,
        status: character.status,
        species: character.species,
        gender: character.gender,
        image: character.image,
        origin: character.origin,
        location: character.location,
        episode: character.episode,
      };
      return [...prev, minimal];
    });
  }, []);

  const removeFavorite = useCallback((id: number) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  const value: FavoritesContextValue = useMemo(
    () => ({
      favorites,
      isFavorite,
      toggleFavorite,
      removeFavorite,
      clearFavorites,
    }),
    [favorites, isFavorite, toggleFavorite, removeFavorite, clearFavorites]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = (): FavoritesContextValue => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error(
      "useFavoritesContext must be used within a FavoritesProvider"
    );
  }
  return ctx;
};
