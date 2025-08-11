import React from "react";
import { Select } from "./Select";
import { Button } from "./Button";
import type { CharacterFilters } from "../../types/charactertypes";
import { GENDER_OPTIONS, STATUS_OPTIONS } from "../../utils/constants";

interface FilterBarProps {
  filters: CharacterFilters;
  onFiltersChange: (filters: CharacterFilters) => void;
  onClearFilters: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
}) => {
  console.log("FilterBar received filters:", filters);
  const handleStatusChange = (status: string) => {
    onFiltersChange({
      ...filters,
      status: status as CharacterFilters["status"],
      page: 1, 
    });
  };

  const handleGenderChange = (gender: string) => {
    onFiltersChange({
      ...filters,
      gender: gender as CharacterFilters["gender"],
      page: 1, 
    });
  };

  const hasActiveFilters = Boolean(filters.status) || Boolean(filters.gender);

  return (
    <div className="bg-theme-card p-4 rounded-lg shadow-md border border-theme-primary">
      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Status"
            options={STATUS_OPTIONS}
            value={filters.status || ""}
            onChange={(e) => handleStatusChange(e.target.value)}
          />

          <Select
            label="Gender"
            options={GENDER_OPTIONS}
            value={filters.gender || ""}
            onChange={(e) => handleGenderChange(e.target.value)}
          />
        </div>

        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="whitespace-nowrap"
          >
            Clear Filters
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-sm text-theme-secondary">Active filters:</span>
          {filters.status && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Status:{" "}
              {
                STATUS_OPTIONS.find((opt) => opt.value === filters.status)
                  ?.label
              }
            </span>
          )}
          {filters.gender && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Gender:{" "}
              {
                GENDER_OPTIONS.find((opt) => opt.value === filters.gender)
                  ?.label
              }
            </span>
          )}
          {filters.name && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              Name: "{filters.name}"
            </span>
          )}
        </div>
      )}
    </div>
  );
};
