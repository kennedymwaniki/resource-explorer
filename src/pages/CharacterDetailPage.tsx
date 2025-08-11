import React from "react";
import { useNavigate } from "@tanstack/react-router";

import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { useCharacterById } from "../hooks/useCharacter";
import { ThemeToggle } from "../components/ui/ThemeToggle";

interface CharacterDetailPageProps {
  characterId: string;
}

export const CharacterDetailPage: React.FC<CharacterDetailPageProps> = ({
  characterId,
}) => {
  const { data: character, isLoading, error } = useCharacterById(characterId);
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "alive":
        return "text-green-600 bg-green-100";
      case "dead":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-theme-primary flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-theme-secondary">Loading character details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-theme-primary flex items-center justify-center">
        <Card className="max-w-md">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-theme-primary mb-2">
              Character not found
            </h2>
            <p className="text-theme-secondary mb-4">
              The character you're looking for doesn't exist or couldn't be
              loaded.
            </p>
            <Button
              variant="primary"
              onClick={() => {
                if (window.history.length > 1) {
                  window.history.back();
                } else {
                  navigate({ to: "/character" });
                }
              }}
            >
              Go Back
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!character) return null;

  return (
    <div className="min-h-screen bg-theme-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="outline"
              onClick={() => {
                if (window.history.length > 1) {
                  window.history.back();
                } else {
                  navigate({ to: "/character" });
                }
              }}
            >
              ← Back
            </Button>
            <ThemeToggle />
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-bold text-theme-primary mb-2">
              {character.name}
            </h1>
            <div className="flex items-center justify-center">
              <span
                className={`
                  inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                  ${getStatusColor(character.status)}
                `}
              >
                {character.status}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card padding={false} className="overflow-hidden">
            <img
              src={character.image}
              alt={character.name}
              className="w-full h-auto"
            />
          </Card>

          <Card>
            <h2 className="text-2xl font-semibold text-theme-primary mb-6">
              Character Details
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-theme-secondary">
                    Species
                  </p>
                  <p className="mt-1 text-sm text-theme-primary">
                    {character.species}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-theme-secondary">
                    Gender
                  </p>
                  <p className="mt-1 text-sm text-theme-primary">
                    {character.gender}
                  </p>
                </div>
              </div>

              {character.type && (
                <div>
                  <p className="text-sm font-medium text-theme-secondary">
                    Type
                  </p>
                  <p className="mt-1 text-sm text-theme-primary">
                    {character.type}
                  </p>
                </div>
              )}

              <div>
                <p className="text-sm font-medium text-theme-secondary">
                  Origin
                </p>
                <p className="mt-1 text-sm text-theme-primary">
                  {character.origin.name}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-theme-secondary">
                  Last known location
                </p>
                <p className="mt-1 text-sm text-theme-primary">
                  {character.location.name}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-theme-secondary">
                  Episodes
                </p>
                <p className="mt-1 text-sm text-theme-primary">
                  Appeared in {character.episode.length} episode
                  {character.episode.length !== 1 ? "s" : ""}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-theme-secondary">
                  Created
                </p>
                <p className="mt-1 text-sm text-theme-primary">
                  {new Date(character.created).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="mt-8">
          <h2 className="text-2xl font-semibold text-theme-primary mb-4">
            Episodes ({character.episode.length})
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {character.episode.map((episodeUrl: string) => {
              const episodeNumber = episodeUrl.split("/").pop();
              return (
                <div
                  key={episodeUrl}
                  className="bg-theme-secondary rounded px-3 py-2 text-center text-sm font-medium text-theme-primary"
                >
                  Episode {episodeNumber}
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};
