export interface Character {
  id: number;
  name: string;
  status: Status;
  species: string;
  type: string;
  gender: Gender;
  origin: string;
  location: string;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Characters {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export type Status = "Alive" | "Dead" | "unknown";
type Gender = "Female" | "Male" | "Genderless" | "unknown";

export enum Statuses {
  ALIVE = "Alive",
  DEAD = "Dead",
  UNKNOWN = "unknown",
}

