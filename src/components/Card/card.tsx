import Image from "next/image";
import React from "react";
import { Character, Statuses } from "../../models/characters.model";

interface CardProps {
  character: Character;
  isSelected: boolean;
  onSelect: () => void;
}

export const Card = ({ character, isSelected, onSelect }: CardProps) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case Statuses.ALIVE:
        return {
          text: "text-[var(--green)]",
          border: "border-[var(--green)]",
          dot: "bg-[var(--green)] mr-1 animate-pulse",
        };
      case Statuses.DEAD:
        return {
          text: "text-[var(--red)]",
          border: "border-[var(--red)]",
          dot: "bg-[var(--red)] mr-1",
        };
      case Statuses.UNKNOWN:
        return {
          text: "text-[var(--gray)]",
          border: "border-[var(--gray)]",
        };
      default:
        return {
          text: "text-[var(--gray)]",
          border: "border-[var(--gray)]",
        };
    }
  };

  const statusTextStyle = getStatusStyles(character.status);

  return (
    <div
      key={character.id}
      onClick={onSelect}
      className={`flex flex-col w-fit h-full rounded bg-[var(--black)] cursor-pointer hover:scale-105 hover:opacity-100 transition-transform duration-600 ${
        isSelected
          ? "scale-105 border-2 border-transparent ring-2 ring-[var(--green)] animate-glow"
          : "hover:scale-105"
      }
        bg-[var(--black)]`}
      data-testid="card"
    >
      <div className="relative">
        <Image
          src={character.image}
          alt={character.name}
          width={300}
          height={300}
          className="rounded-t-sm"
        />
        <div className="absolute top-0 left-0 w-full h-22 bg-gradient-to-b from-black/85 via-black/60 to-transparent rounded-t-sm z-10" />
        <p
          className={`absolute top-2 right-2 z-20 border-2 rounded-2xl px-2 py-0.5 text-sm font-semibold flex items-center
            ${statusTextStyle.text} ${statusTextStyle.border}`}
        >
          {character.status !== Statuses.UNKNOWN && (
            <span
              className={`w-2 h-2 rounded-full mr-1 ${statusTextStyle.dot}`}
            />
          )}
          {character.status.toUpperCase()}
        </p>
      </div>
      <div className="flex flex-col justify-between p-2 max-w-[260px]">
        <div className="flex justify-between">
          <h3 className="font-semibold text-md lg:text-lg text-[var(--light-gray)] h-[48px] leading-snug break-words">
            {character.name}
          </h3>
        </div>
        <p className="text-sm font-light">{character.species}</p>
      </div>
    </div>
  );
};
