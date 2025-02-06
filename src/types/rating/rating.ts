import {GenreRating} from "./genre_rating";

export type Rating = {
  id?: number;
  unique: string;

  accountId: number;
  mediaUnique: string, // mov_10000

  genreRatings: GenreRating[];

  relativeScore: number;
  displayScore: number;
  comparisons: number;

  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export type GenreScore = {
  relativeScore: number,
  displayScore: number,
  comparisons: number,
};
