import { Characters } from "../../models/characters.model";

interface PaginationProps {
  page: number;
  response: Characters | undefined;
  onClickPrevPage: () => void;
  onClickNextPage: () => void;
}

export const Pagination = ({
  page,
  response,
  onClickPrevPage,
  onClickNextPage,
}: PaginationProps) => {
  return (
    <div className="flex items-center justify-center gap-6 mt-10">
      <button
        onClick={onClickPrevPage}
        disabled={!response?.info?.prev}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-[var(--dark-blue)] text-xl transition-all duration-300
        ${
          response?.info?.prev
            ? "bg-[var(--light-blue)] shadow-[0_0_20px_var(--blue)] hover:shadow-[0_0_30px_var(--blue)] cursor-pointer"
            : "bg-[var(--light-blue)] opacity-30 cursor-not-allowed"
        }`}
      >
        ◀
      </button>

      <span className="text-2xl font-bold text-[var(--green)] drop-shadow-[0_0_6px_var(--green)]">
        <span className="text-[var(--green)]">{page}</span>
        <span className="mx-1 text-[var(--light-blue)]">/</span>
        <span className="text-[var(--green)]">{response?.info?.pages}</span>
      </span>

      <button
        onClick={onClickNextPage}
        disabled={!response?.info?.next}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-[var(--dark-blue)] text-xl transition-all duration-300
        ${
          response?.info?.next
            ? "bg-[var(--green)] shadow-[0_0_20px_var(--green)] hover:shadow-[0_0_30px_var(--green)] cursor-pointer"
            : "bg-[var(--light-green)] opacity-30 cursor-not-allowed"
        }`}
      >
        ▶
      </button>
    </div>
  );
};
