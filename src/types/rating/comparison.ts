export type Comparison = {
  id: number;
  unique: string;

  mediaId: number;
  rating: "better" | "worse" | "same";
}
