import { render, screen } from "@testing-library/react";
import { EpisodesTable } from "../components/EpisodesTable/episodesTable";
import * as SelectedCharactersStore from "../store/selectedCharacters";

jest.mock("../store/selectedCharacters");

const mockedContext =
  SelectedCharactersStore.useSelectedCharactersContext as jest.Mock;

describe("EpisodesTable", () => {
  it("renders only one table if there is one selected characted", () => {
    mockedContext.mockReturnValue({
      selected: [{ characterId: 1, column: 1 }],
      episodesByCharacter: {
        1: [
          {
            id: 101,
            name: "Pilot",
            episode: "S01E01",
            air_date: "Dec 2, 2013",
          },
        ],
      },
      sharedEpisodes: [],
    });

    render(<EpisodesTable />);
    expect(screen.getByText(/Only Episodes/i)).toBeInTheDocument();
    expect(screen.getByText(/Character ID 1/i)).toBeInTheDocument();
    expect(screen.getByText(/S01E01/i)).toBeInTheDocument();
  });

  it("renders only episodes for 2 selected characters and their shared episodes", () => {
    mockedContext.mockReturnValue({
      selected: [
        { characterId: 1, column: 1 },
        { characterId: 2, column: 2 },
      ],
      episodesByCharacter: {
        1: [
          {
            id: 201,
            name: "Meeseeks and Destroy",
            episode: "S01E05",
            air_date: "Jan 20, 2014",
          },
        ],
        2: [
          {
            id: 202,
            name: "Rick Potion #9",
            episode: "S01E06",
            air_date: "Jan 27, 2014",
          },
        ],
      },
      sharedEpisodes: [
        {
          id: 301,
          name: "Ricksy Business",
          episode: "S01E11",
          air_date: "Apr 14, 2014",
        },
      ],
    });

    render(<EpisodesTable />);

    expect(screen.getByText(/Shared Episodes/i)).toBeInTheDocument();
    expect(screen.getByText(/Ricksy Business/i)).toBeInTheDocument();
    expect(screen.getByText(/Meeseeks and Destroy/i)).toBeInTheDocument();
    expect(screen.getByText(/Rick Potion/i)).toBeInTheDocument();
  });

  it("doesn't render nothing if there's no selected character", () => {
    mockedContext.mockReturnValue({
      selected: [],
      episodesByCharacter: {},
      sharedEpisodes: [],
    });

    const { container } = render(<EpisodesTable />);
    expect(container).toBeEmptyDOMElement();
  });
});
