import z, {number, object} from "zod";
import {listRequest} from "../requests";

export type MovieMediaParamsType = z.infer<typeof MovieMediaParams>;
export const MovieMediaParams = object({
  id: number(),
});

export function fetchMovieMedia(body: MovieMediaParamsType) {
  return listRequest({
    schema: MovieMediaParams,
    url: "media/movie/:id",
    method: "GET",
    body,
  });
}
