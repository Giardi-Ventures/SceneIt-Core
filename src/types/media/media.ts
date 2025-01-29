export type Media = {
  id: number;
  type: "person" | "tv" | "movie";
  name: string;
  release: Date;
  overview: string;
  backdrop?: string;
  poster?: string;
  adult: boolean;
  language: string;
  genres: number[];
  popularity: number;
};
