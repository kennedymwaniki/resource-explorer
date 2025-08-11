import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className = "",
}) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={`inline-block ${className}`}>
      <div
        className={`
          ${sizes[size]} animate-spin rounded-full border-2 border-theme-muted 
          border-t-blue-600
        `}
      />
    </div>
  );
};

export const LoadingCard: React.FC = () => {
  return (
    <div className="bg-theme-card rounded-lg shadow-md border border-theme-primary overflow-hidden animate-pulse">
      <div className="h-64 bg-theme-secondary"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-theme-secondary rounded w-3/4"></div>
        <div className="h-3 bg-theme-secondary rounded w-1/2"></div>
        <div className="h-3 bg-theme-secondary rounded w-1/3"></div>
      </div>
    </div>
  );
};
