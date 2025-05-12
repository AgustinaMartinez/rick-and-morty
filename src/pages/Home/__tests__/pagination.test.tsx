import { render, screen, fireEvent } from "@testing-library/react";
import { Characters } from "../models/characters.model";
import { Pagination } from "../components/Pagination/pagination";

describe("Pagination", () => {
  const mockResponse: Characters = {
    info: {
      count: 826,
      pages: 42,
      next: "https://rickandmortyapi.com/api/character/?page=3",
      prev: "https://rickandmortyapi.com/api/character/?page=1",
    },
    results: [],
  };

  it("shows current page and total page", () => {
    render(
      <Pagination
        page={2}
        response={mockResponse}
        onClickPrevPage={() => {}}
        onClickNextPage={() => {}}
      />
    );

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("disables previous button if there's no previous page", () => {
    const responseWithoutPrev = {
      ...mockResponse,
      info: { ...mockResponse.info, prev: null },
    };

    render(
      <Pagination
        page={1}
        response={responseWithoutPrev}
        onClickPrevPage={() => {}}
        onClickNextPage={() => {}}
      />
    );

    const prevButton = screen.getByText("◀");
    expect(prevButton).toBeDisabled();
  });

  it("disables next button if there's no next page", () => {
    const responseWithoutNext = {
      ...mockResponse,
      info: { ...mockResponse.info, next: null },
    };

    render(
      <Pagination
        page={42}
        response={responseWithoutNext}
        onClickPrevPage={() => {}}
        onClickNextPage={() => {}}
      />
    );

    const nextButton = screen.getByText("▶");
    expect(nextButton).toBeDisabled();
  });

  it("calls pagination functions when clicking", () => {
    const handlePrev = jest.fn();
    const handleNext = jest.fn();

    render(
      <Pagination
        page={2}
        response={mockResponse}
        onClickPrevPage={handlePrev}
        onClickNextPage={handleNext}
      />
    );

    fireEvent.click(screen.getByText("◀"));
    fireEvent.click(screen.getByText("▶"));

    expect(handlePrev).toHaveBeenCalledTimes(1);
    expect(handleNext).toHaveBeenCalledTimes(1);
  });
});
