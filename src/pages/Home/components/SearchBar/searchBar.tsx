import { Statuses } from "../../models/characters.model";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onStatusFilter: (status: string) => void;
}

export const SearchBar = ({ onSearch, onStatusFilter }: SearchBarProps) => {
  const statusOptions = [
    Statuses.ALIVE,
    Statuses.DEAD,
    Statuses.UNKNOWN,
    "all",
  ];

  return (
    <div className="flex gap-4">
      <input
        type="text"
        placeholder="Search for a character..."
        className="w-full p-2 opacity-70 rounded bg-[var(--green)] shadow-[0_0_20px_var(--green)] outline-none text-[var(--dark-blue)] font-extrabold hover:shadow-[0_0_30px_var(--green)]"
        onChange={(e) => onSearch(e.target.value)}
      />
      <select
        className="p-2 opacity-70 rounded bg-[var(--light-blue)] shadow-[0_0_20px_var(--blue)] hover:shadow-[0_0_30px_var(--blue)] outline-none text-[var(--dark-blue)] font-extrabold"
        onChange={(e) => onStatusFilter(e.target.value)}
      >
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};
