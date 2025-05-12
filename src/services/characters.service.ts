import { Character, Characters } from "@/models/characters.model";

export const fetchCharacters = async (page: number): Promise<Characters> => {
  try {
    const res = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while fetching characters, try again later 🫠");
  }
}

export const fetchCharacter = async (id: number): Promise<Character> => {
  try {
    const res = await fetch(
      `https://rickandmortyapi.com/api/character/${id}`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while fetching the character, try again later 🫠");
  }
}