import localFont from "next/font/local";
import { useSelectedCharactersContext } from "../../store/selectedCharacters";

const schwifty = localFont({
  src: "../../../../../public/fonts/get_schwifty.ttf",
});

export const EpisodesTable = () => {
  const { selected, episodesByCharacter, sharedEpisodes } =
    useSelectedCharactersContext();

  const SharedEpisodes = () => (
    <>
      {sharedEpisodes.length > 0 && (
        <div className="m-4">
          <h2 className={`${schwifty.className} text-outline-schf text-4xl`}>
            Shared Episodes
          </h2>
          <h2 className="my-4 text-lg font-bold border-y-2 border-[var(--green)]">
            Both Characters - Column #{selected[0].column} and #
            {selected[1].column}
          </h2>
          <ul>
            {sharedEpisodes.map((e) => (
              <li key={e.id} className="mb-2 border-b-1 border-[var(--gray)]">
                <strong>{e.episode}</strong> - {e.name} -{" "}
                <span className="font-semibold text-sm">{e.air_date}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );

  const EpisodesByCharacter = ({ selection }: { selection: number }) => {
    const characterId = selected[selection].characterId;
    const episodes = episodesByCharacter[characterId];
    const column = selected[selection].column;

    return (
      <div className="m-4">
        <h2 className={`${schwifty.className} text-outline-schf text-4xl`}>
          Only Episodes
        </h2>
        <h2 className="my-4 text-lg font-bold border-y-2 border-[var(--green)]">
          Character ID {characterId} - Column #{column}
        </h2>
        <ul>
          {episodes?.map((e) => (
            <li key={e.id} className="mb-2 border-b-1 border-[var(--gray)]">
              <strong>Episode {e.episode}</strong> - {e.name} -{" "}
              <span className="font-semibold text-sm">{e.air_date}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const Episodes = () => {
    const singleTable = selected.length === 1;

    if (singleTable)
      return (
        <div className="m-4 rounded-lg bg-[var(--dark-green)] opacity-80">
          <EpisodesByCharacter selection={0} />
        </div>
      );
    else if (selected.length === 2) {
      return (
        <div className="m-4 rounded-lg flex flex-col md:flex-row lg:flex-row justify-between gap-2 bg-[var(--dark-green)] opacity-80">
          <EpisodesByCharacter selection={0} />
          <SharedEpisodes />
          <EpisodesByCharacter selection={1} />
        </div>
      );
    }
  };

  return selected.length ? (
    <div className="mt-4 flex flex-col gap-8 max-w-[1400] mx-auto">
      <Episodes />
    </div>
  ) : null;
};
