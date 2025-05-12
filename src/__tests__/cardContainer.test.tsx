import { render, screen, fireEvent } from "@testing-library/react";
import { Character } from "@/pages/Home/models/characters.model";
import { useSelectedCharactersContext } from "@/pages/Home/store/selectedCharacters";
import { CardContainer } from "@/pages/Home/components/CardComponent/cardContainer";

jest.mock("../pages/Home/store/selectedCharacters");

const mockCharacter: Character = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  type: "",
  gender: "Male",
  origin: "",
  location: "",
  episode: ["https://rickandmortyapi.com/api/episode/1"],
  url: "https://rickandmortyapi.com/api/character/1",
  created: "2017-11-04T18:48:46.250Z",
};

const mockCharacters = {
  info: {
    count: 1,
    pages: 1,
    next: null,
    prev: null,
  },
  results: [mockCharacter],
};

describe("CardContainer", () => {
  beforeEach(() => {
    (useSelectedCharactersContext as jest.Mock).mockReturnValue({
      selected: [],
      selectCharacter: jest.fn(),
    });
  });

  it("renders character card", () => {
    render(<CardContainer characters={mockCharacters} />);
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Human")).toBeInTheDocument();
    expect(screen.getByText("Alive")).toBeInTheDocument();
  });

  it("calls selectCharacter when card is clicked", () => {
    const selectCharacterMock = jest.fn();

    (useSelectedCharactersContext as jest.Mock).mockReturnValue({
      selected: [],
      selectCharacter: selectCharacterMock,
    });

    render(<CardContainer characters={mockCharacters} />);
    fireEvent.click(screen.getByText("Rick Sanchez"));
    expect(selectCharacterMock).toHaveBeenCalledTimes(1);
    expect(selectCharacterMock).toHaveBeenCalledWith(1, 1);
  });
});
