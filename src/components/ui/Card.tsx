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
        bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden
        ${padding ? "p-6" : ""}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
