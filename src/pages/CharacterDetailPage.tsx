import React from "react";
import { Link } from "@tanstack/react-router";

import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { useCharacterById } from "../hooks/useCharacter";

interface CharacterDetailPageProps {
  characterId: string;
}

export const CharacterDetailPage: React.FC<CharacterDetailPageProps> = ({
  characterId,
}) => {
  const { data: character, isLoading, error } = useCharacterById(characterId);

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-gray-600">Loading character details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Character not found
            </h2>
            <p className="text-gray-600 mb-4">
              The character you're looking for doesn't exist or couldn't be
              loaded.
            </p>
            <Link to="/">
              <Button variant="primary">Go Back</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  if (!character) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline" className="mb-4">
              ← Back to Characters
            </Button>
          </Link>

          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
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

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Character Image */}
          <Card padding={false} className="overflow-hidden">
            <img
              src={character.image}
              alt={character.name}
              className="w-full h-auto"
            />
          </Card>

          {/* Character Details */}
          <Card>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Character Details
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Species</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {character.species}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Gender</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {character.gender}
                  </dd>
                </div>
              </div>

              {character.type && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Type</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {character.type}
                  </dd>
                </div>
              )}

              <div>
                <dt className="text-sm font-medium text-gray-500">Origin</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {character.origin.name}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Last known location
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {character.location.name}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Episodes</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  Appeared in {character.episode.length} episode
                  {character.episode.length !== 1 ? "s" : ""}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Created</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(character.created).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </dd>
              </div>
            </div>
          </Card>
        </div>

        {/* Episodes Section */}
        <Card className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Episodes ({character.episode.length})
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {character.episode.map((episodeUrl: string) => {
              const episodeNumber = episodeUrl.split("/").pop();
              return (
                <div
                  key={episodeUrl}
                  className="bg-gray-100 rounded px-3 py-2 text-center text-sm font-medium text-gray-700"
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
