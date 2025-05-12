import { createContext, useContext, ReactNode } from "react";
import { useSelectedCharacters } from "../hooks/useSelectedCharacters";

const SelectedCharactersContext = createContext<ReturnType<
  typeof useSelectedCharacters
> | null>(null);

export const SelectedCharactersProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const value = useSelectedCharacters();
  return (
    <SelectedCharactersContext.Provider value={value}>
      {children}
    </SelectedCharactersContext.Provider>
  );
};

export const useSelectedCharactersContext = () => {
  const context = useContext(SelectedCharactersContext);
  if (!context)
    throw new Error(
      "useSelectedCharactersContext must be used within SelectedCharactersProvider"
    );
  return context;
};
