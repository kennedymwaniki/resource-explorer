import React from "react";
import type { Character } from "../../types/charactertypes";
import { Card } from "./Card";

interface CharacterCardProps {
  character: Character;
  onClick?: (character: Character) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onClick,
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "alive":
        return "bg-green-500";
      case "dead":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick) {
      onClick(character);
    }
  };

  return (
    <Card
      padding={false}
      className={`
    transition-transform duration-200 hover:scale-105 hover:shadow-lg
        ${onClick ? "cursor-pointer" : ""}
      `}
      onClick={handleClick}
    >
      <div className="relative">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-64 object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 flex items-center">
          <span
            className={`
              w-3 h-3 rounded-full mr-2 ${getStatusColor(character.status)}
            `}
          />
          <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
            {getStatusText(character.status)}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-theme-primary mb-2 truncate">
          {character.name}
        </h3>

        <div className="space-y-2 text-sm text-theme-secondary">
          <div className="flex justify-between">
            <span className="font-medium">Species:</span>
            <span className="truncate ml-2">{character.species}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Gender:</span>
            <span className="truncate ml-2">{character.gender}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Origin:</span>
            <span className="truncate ml-2" title={character.origin.name}>
              {character.origin.name}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Location:</span>
            <span className="truncate ml-2" title={character.location.name}>
              {character.location.name}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Episodes:</span>
            <span className="ml-2">{character.episode.length}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
