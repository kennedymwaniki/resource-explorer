import React from "react";
import { useFavorites } from "../../hooks/useFavorites";
import { CharacterCard } from "./CharacterCard";
import { useNavigate } from "@tanstack/react-router";
import type { Character } from "../../types/charactertypes";

interface MyFavoritesProps {
  onSelect?: () => void; // callback after selecting a favorite (to close drawer)
}

const MyFavorites: React.FC<MyFavoritesProps> = ({ onSelect }) => {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate({
      to: "/character/$characterId",
      params: { characterId: id.toString() },
    });
    if (onSelect) onSelect();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-theme-primary">My Favorites</h2>
        <p className="text-sm text-theme-secondary">
          {favorites.length === 0
            ? "You haven't added any favorites yet."
            : `You have ${favorites.length} favorite$${
                favorites.length > 1 ? "s" : ""
              }.`}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto pr-2">
        {favorites.map((fav) => {
          const characterLike: Character = {
            id: fav.id,
            name: fav.name || "Unknown",
            status: (fav.status as "unknown" | "Alive" | "Dead") || "unknown",
            species: fav.species || "Unknown",
            type: "",
            gender:
              (fav.gender as "unknown" | "Female" | "Male" | "Genderless") ||
              "unknown",
            origin: fav.origin
              ? { name: fav.origin.name, url: fav.origin.url || "" }
              : { name: "Unknown", url: "" },
            location: {
              name: fav.location?.name || "Unknown",
              url: fav.location?.url || "",
            },
            image: fav.image || "",
            episode: fav.episode || [],
            url: "",
            created: "",
          };
          return (
            <CharacterCard
              key={fav.id}
              character={characterLike}
              onClick={() => handleClick(fav.id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MyFavorites;
