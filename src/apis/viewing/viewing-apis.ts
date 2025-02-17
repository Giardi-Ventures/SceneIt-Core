import z, {object} from "zod";
import {apiRequest, listRequest} from "../requests";
import {globalStore, updateGlobalState} from "../../redux";

export type FetchViewingsParamsType = z.infer<typeof FetchViewingsParams>;
export const FetchViewingsParams = object({
  mediaType: z.enum(["movie", "tv", "person"]).optional(),
});

export async function fetchViewings(body?: FetchViewingsParamsType) {
  return listRequest({
    onSuccess: (data) => globalStore.dispatch(updateGlobalState("viewing.data", data)),
    schema: FetchViewingsParams,
    url: "viewings",
    method: "GET",
  });
}

export type ViewMediaParamsType = z.infer<typeof ViewMediaParams>;
export const ViewMediaParams = z.object({
  viewedAt: z.date().optional(),
  mediaUnique: z.string(),
});

export async function viewMedia(body: ViewMediaParamsType) {
  return apiRequest({
    schema: ViewMediaParams,
    url: "viewings",
    method: "POST",
    body,
  });
}

export type UpdateViewingParamsType = z.infer<typeof UpdateViewingParams>;
export const UpdateViewingParams = z.object({
  viewedAt: z.date(),
  viewingId: z.number(),
});

export async function updateViewing(body: UpdateViewingParamsType) {
  return apiRequest({
    schema: UpdateViewingParams,
    url: "viewings/view",
    method: "PATCH",
    body,
  });
}

export type RemoveViewingParamsType = z.infer<typeof RemoveViewingParams>;
export const RemoveViewingParams = z.object({
  viewingId: z.number(),
  mediaUnique: z.string(),
});

export async function removeViewing(body: RemoveViewingParamsType) {
  return apiRequest({
    schema: RemoveViewingParams,
    url: "viewings/view",
    method: "DELETE",
    body,
  });
}
