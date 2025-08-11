import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  padding = true,
  onClick,
}) => {
  return (
    <div
      className={`
        bg-theme-card rounded-lg shadow-md border border-theme-primary overflow-hidden
        transition-colors duration-200
        ${padding ? "p-6" : ""}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
