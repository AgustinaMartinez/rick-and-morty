import { Episode } from "@/models/episodes.model";

export const fetchEpisodes = async (ids: string[]): Promise<Episode[]> => {
  try {
    const res = await fetch(
      `https://rickandmortyapi.com/api/episode/${ids.join(",")}`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while fetching episodes, try again later 🫠");
  }
}