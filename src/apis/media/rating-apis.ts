import z, {object, array, number, string} from "zod";
import {apiRequest, listRequest} from "../requests";

export type RatingParamsType = z.infer<typeof RatingParams>;
export const RatingParams = object({
  rating: z.enum(["liked", "disliked", "loved"]),
  mediaId: number(),
  // Should fetch title and genres
  title: string(),
  logo: string(),
  genres: array(number()),

  comparisons: array(
    object({
      rating: z.enum(["better", "worse", "same"]),
      ratingId: number(),
      mediaId: number(),
    }),
  ),
});

export async function rateMedia(body: RatingParamsType) {
  return apiRequest({
    url: "ratings/rate",
    method: "POST",
    schema: RatingParams,
    body,
  });
}

export type ComparisonParamsType = z.infer<typeof ComparisonParams>;
export const ComparisonParams = object({
  rating: z.enum(["liked", "disliked", "loved"]),
  genres: array(number()),
  mediaId: string(),
});

export async function fetchComparisons(body: ComparisonParamsType) {
  return listRequest({
    url: "ratings/comparisons",
    method: "POST",
    schema: ComparisonParams,
    body,
  });
}
