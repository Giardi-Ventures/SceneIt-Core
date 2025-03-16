import {Media} from "./media";

export type Movie = Media & {
  budget: number;
  crew: CrewMember[];
  cast: CastMember[];
  providers: {
    link: string;
    rent: WatchProvider[];
    stream: WatchProvider[];
    buy: WatchProvider[];
  };
  media: {
    images: {
      backdrops: Image[];
      logos: Image[];
      posters: Image[];
    };
    videos: {
      trailers: Video[];
      other: Video[];
    };
  };
};

export type Image = {
  aspect_ratio: number;
  file_path: string
  height: number;
  iso_639_1: string;
  vote_average: number;
  vote_count: number;
  width: number;
};

export type WatchProvider = {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
};

type CrewMember = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
};

type CastMember = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

type Video = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: "Featurette" | "Trailer" | "Behind the Scenes" | "Clip";
  official: boolean;
  published_at: string;
  id: string;
};
