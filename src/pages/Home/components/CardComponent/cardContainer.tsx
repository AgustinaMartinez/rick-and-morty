import { useState } from "react";
import { Loading } from "@/app/common/components/Loading/loading";
import { SearchBar } from "../SearchBar/searchBar";
import { Card } from "../Card/card";
import { useSelectedCharactersContext } from "../../store/selectedCharacters";
import { Characters } from "../../models/characters.model";

export const CardContainer = ({ characters }: { characters: Characters }) => {
  const { selected, selectCharacter } = useSelectedCharactersContext();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const COLUMNS_IN_DEKSTOP = 2;

  const filteredCharacters = characters?.results.filter((char) => {
    const matchesSearch = char.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      !statusFilter || char.status === statusFilter || statusFilter === "all";
    return matchesSearch && matchesStatus;
  });

  const half = Math.ceil(
    (filteredCharacters?.length || 0) / COLUMNS_IN_DEKSTOP
  );
  const col1 = filteredCharacters?.slice(0, half);
  const col2 = filteredCharacters?.slice(half);
  const columns = [col1, col2];

  if (!characters) return <Loading />;
  return (
    <div className="mt-4 flex flex-col gap-8 max-w-[1400] mx-auto">
      <SearchBar onSearch={setSearchQuery} onStatusFilter={setStatusFilter} />
      {characters && (
        <div className="grid grid-cols-2 gap-4 place-items-center">
          {columns.map((col, index) => (
            <div
              key={`col-${index}`}
              className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4"
            >
              {col!.map((character) => (
                <Card
                  key={character.id}
                  character={character}
                  isSelected={selected.some(
                    (item) => item.characterId === character.id
                  )}
                  onSelect={() => selectCharacter(character.id, index + 1)}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
