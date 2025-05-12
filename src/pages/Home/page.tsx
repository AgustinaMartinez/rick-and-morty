"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header/header";
import { Pagination } from "@/components/Pagination/pagination";
import { EpisodesTable } from "@/components/EpisodesTable/episodesTable";
import { SelectedCharactersProvider } from "@/store/selectedCharacters";
import { CardContainer } from "@/components/CardComponent/cardContainer";
import { Characters } from "@/models/characters.model";
import { fetchCharacters } from "@/services/characters.service";
import { useSelectedCharacters } from "@/hooks/useSelectedCharacters";

function HomePage({ initialCharacters }: { initialCharacters: Characters }) {
  const [characters, setCharacters] = useState<Characters>(initialCharacters);
  const [error, setError] = useState<string>("");
  const { page, setPage } = useSelectedCharacters();

  useEffect(() => {
    if (page !== 1) {
      fetchCharacters(page)
        .then(setCharacters)
        .catch((err) => setError(err.message));
    }
  }, [page]);

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
}

export default HomePage;
