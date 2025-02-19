import z, {object, array, number, string} from "zod";
import {apiRequest, listRequest} from "../requests";
import {globalStore, updateGlobalState, upsertGlobalStateArray} from "../../redux";

export type RatingParamsType = z.infer<typeof RatingParams>;
export const RatingParams = object({
  rating: z.enum(["liked", "disliked", "loved"]),
  mediaType: z.enum(["movie", "tv", "person"]),
  mediaId: number(),

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
    body,
    method: "POST",
    url: "ratings/rate",
    schema: RatingParams,
    onSuccess: (data) => {
      globalStore.dispatch(
        upsertGlobalStateArray({
          id: data.id,
          path: "rating.data",
          newValue: data,
        }),
      );
    },
  });
}

export type ComparisonParamsType = z.infer<typeof ComparisonParams>;
export const ComparisonParams = object({
  rating: z.enum(["liked", "disliked", "loved"]),
  mediaType: z.enum(["movie", "tv", "person"]),
  mediaId: number(),
});

export async function fetchComparisons(body: ComparisonParamsType) {
  return listRequest({
    schema: ComparisonParams,
    url: "ratings/comparisons",
    method: "POST",
    body,
  });
}

export type FetchRatingsParamsType = z.infer<typeof FetchRatingsParams>;
export const FetchRatingsParams = object({
  mediaType: z.enum(["movie", "tv", "person"]).optional(),
});

export async function fetchRatings(body?: FetchRatingsParamsType) {
  return listRequest({
    onSuccess: (data) => globalStore.dispatch(updateGlobalState("rating.data", data)),
    schema: FetchRatingsParams,
    url: "ratings",
    method: "GET",
  });
}
