export type Media = {
  id: number;
  unique: string;
  type: "person" | "tv" | "movie";
  name: string;
  release: Date;
  overview: string;
  backdrop?: string;
  poster?: string;
  adult: boolean;
  language: string;
  genres: Genre[];
  popularity: number;
};

export type Genre = {
  id: number;
  name: string;
}

