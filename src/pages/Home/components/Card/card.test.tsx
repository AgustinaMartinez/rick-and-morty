import { render, screen, fireEvent } from "@testing-library/react";
import { Card } from "./card";
import { Character } from "../../models/characters.model";

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

describe("Card", () => {
  it("renders character info correctly", () => {
    render(
      <Card character={mockCharacter} isSelected={false} onSelect={() => {}} />
    );

    expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
    expect(screen.getByText(/Alive/i)).toBeInTheDocument();
    expect(screen.getByText(/Human/i)).toBeInTheDocument();

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute(
      "src",
      expect.stringContaining("avatar/1.jpeg")
    );
  });

  it("calls onSelect when clicked", () => {
    const handleSelect = jest.fn();
    render(
      <Card
        character={mockCharacter}
        isSelected={false}
        onSelect={handleSelect}
      />
    );

    fireEvent.click(screen.getByText(/Rick Sanchez/i));
    expect(handleSelect).toHaveBeenCalledTimes(1);
  });

  it("applies selected styles when isSelected is true", () => {
    render(
      <Card character={mockCharacter} isSelected={true} onSelect={() => {}} />
    );
    const container = screen.getByTestId("card");
    expect(container.className).toContain("ring-[var(--green)]");
  });
});
