"use client";

import { useState } from "react";
import { Header } from "./components/Header/header";
import { Pagination } from "./components/Pagination/pagination";
import { EpisodesTable } from "./components/EpisodesTable/episodesTable";
import { SelectedCharactersProvider } from "./store/selectedCharacters";
import { CardContainer } from "./components/CardComponent/cardContainer";
import { Characters } from "./models/characters.model";
import { fetchCharacters } from "./services/characters.service";

export const HomePage = ({
  initialCharacters,
}: {
  initialCharacters: Characters;
}) => {
  const [page, setPage] = useState<number>(1);
  const [characters, setCharacters] = useState<Characters>(initialCharacters);
  const [error, setError] = useState<string>("");

  const onClickNextPage = async () => {
    try {
      const data = await fetchCharacters(page + 1);
      setCharacters(data);
      setPage((prev) => prev + 1);
    } catch (error) {
      setError(error as string);
    }
  };

  const onClickPrevPage = async () => {
    try {
      if (page === 1) return;
      const data = await fetchCharacters(page - 1);
      setCharacters(data);
      setPage((prev) => Math.max(prev - 1, 1));
    } catch (error) {
      setError(error as string);
    }
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">{error}</div>
    );
  }
  if (!characters) {
    return (
      <div className="z-20 flex justify-center items-center h-screen">
        No characters found
      </div>
    );
  }

  return (
    <main className="p-10">
      <Header />
      <SelectedCharactersProvider>
        <CardContainer characters={characters} />
        <Pagination
          page={page}
          response={characters}
          onClickPrevPage={onClickPrevPage}
          onClickNextPage={onClickNextPage}
        />
        <EpisodesTable />
      </SelectedCharactersProvider>
    </main>
  );
};
