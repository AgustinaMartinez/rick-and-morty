import { render, screen, fireEvent } from "@testing-library/react";
import { SearchBar } from "../components/SearchBar/searchBar";

describe("SearchBar", () => {
  it("renders input and select elements", () => {
    render(<SearchBar onSearch={() => {}} onStatusFilter={() => {}} />);

    expect(
      screen.getByPlaceholderText(/search for a character/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("calls onSearch when typing in the input", () => {
    const handleSearch = jest.fn();
    render(<SearchBar onSearch={handleSearch} onStatusFilter={() => {}} />);

    fireEvent.change(screen.getByPlaceholderText(/search for a character/i), {
      target: { value: "Morty" },
    });

    expect(handleSearch).toHaveBeenCalledWith("Morty");
  });

  it("calls onStatusFilter when selecting an option", () => {
    const handleStatus = jest.fn();
    render(<SearchBar onSearch={() => {}} onStatusFilter={handleStatus} />);

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Dead" },
    });

    expect(handleStatus).toHaveBeenCalledWith("Dead");
  });
});
