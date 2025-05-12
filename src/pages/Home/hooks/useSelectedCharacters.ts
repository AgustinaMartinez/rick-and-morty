import { useEffect, useState } from "react";
import { Episode } from "../models/episodes.model";
import { fetchCharacter } from "../services/characters.service";
import { fetchEpisodes } from "../services/episodes.service";

const STORAGE_KEY = "selectedCharacters";

export function useSelectedCharacters() {
  const [selected, setSelected] = useState<{ characterId: number; column: number }[]>([]);
  const [episodesByCharacter, setEpisodesByCharacter] = useState<Record<number, Episode[]>>({});
  const [sharedEpisodes, setSharedEpisodes] = useState<Episode[]>([]);
  const [hasLoadedFromStorage, setHasLoadedFromStorage] = useState<boolean>(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsedData = JSON.parse(stored);
      setSelected(parsedData);
      setHasLoadedFromStorage(true);
      if (parsedData.length > 0) getEpisodes(parsedData);
    } else {
      setHasLoadedFromStorage(true);
    }
  }, []);
  

  useEffect(() => {
    if (!hasLoadedFromStorage) return;
  
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selected));
    if (selected.length > 0) getEpisodes();
  }, [selected, hasLoadedFromStorage]);
  

  const selectCharacter = (id: number, column: number) => {
    if (selected.some((item) => item.characterId === id)) {
      setSelected((prev) => prev.filter((item) => item.characterId !== id));
    } else if (selected.length < 2) {
      setSelected((prev) => [...prev, { characterId: id, column }]);
    } else {
      setSelected(([, second]) => [second, { characterId: id, column }]);
    }
  };

  const getEpisodes = async (selection = selected) => {
    const episodeData: Record<number, Episode[]> = {};

    for (const each of selection) {
      const { characterId } = each;
      const character = await fetchCharacter(characterId);
      const episodeUrls = character.episode;
      const episodeIds = episodeUrls.map((url) => url.split("/").pop()).filter(Boolean) as string[];
      const episodes = await fetchEpisodes(episodeIds);      
      episodeData[characterId] = Array.isArray(episodes) ? episodes : [episodes];
    }
    
    setEpisodesByCharacter(episodeData);

    if (selected.length === 2) {
      const [id1, id2] = selected;
      const eps1 = episodeData[id1.characterId].map((ep) => ep.id);
      const eps2 = episodeData[id2.characterId].map((ep) => ep.id);
      const sharedIds = eps1.filter((id) => eps2.includes(id));
      const shared = episodeData[id1.characterId].filter((ep) => sharedIds.includes(ep.id));
      setSharedEpisodes(shared);
    } else {
      setSharedEpisodes([]);
    }
  };

  return {
    selected,
    selectCharacter,
    episodesByCharacter,
    sharedEpisodes,
  };
}
