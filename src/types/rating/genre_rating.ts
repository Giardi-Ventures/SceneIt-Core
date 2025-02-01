export type GenreRating = {
  id?: number;
  unique: string;

  accountId: number;

  genreId: number; // tv_ or mov_ or ppl_
  title: string;

  relativeScore: number;
  displayScore: number;
  comparisons: number;

  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

