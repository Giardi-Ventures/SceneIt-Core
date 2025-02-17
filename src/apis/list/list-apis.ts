import z, {number, object} from "zod";
import {apiRequest, listRequest} from "../requests";
import {ViewMediaParams} from "../viewing/viewing-apis";

export type FetchListsParamsType = z.infer<typeof FetchListsParams>;
export const FetchListsParams = object({
  mediaType: z.enum(["movie", "tv", "person"]).optional(),
});

export async function fetchLists(body?: FetchListsParamsType) {
  return listRequest({
    schema: FetchListsParams,
    url: "lists",
    method: "GET",
  });
}

export type CreateListParamsType = z.infer<typeof CreateListParams>;
export const CreateListParams = z.object({
  name: z.date(),
  type: z.enum(["watchlist", "recommend", "other"]),
});

export async function createList(body: CreateListParamsType) {
  return apiRequest({
    schema: CreateListParams,
    url: "lists",
    method: "POST",
    body,
  });
}

export type AddListItemParamsType = z.infer<typeof AddListItemParams>;
export const AddListItemParams = z.object({
  mediaUnique: z.string(),
  listId: z.number(),
});

export async function addListItem(body: AddListItemParamsType) {
  return apiRequest({
    schema: AddListItemParams,
    url: "lists/items",
    method: "POST",
    body,
  });
}

export type RemoveListItemParamsType = z.infer<typeof RemoveListItemParams>;
export const RemoveListItemParams = z.object({
  itemId: z.number(),
  listId: z.number(),
});

export async function removeListItem(body: RemoveListItemParamsType) {
  return apiRequest({
    schema: RemoveListItemParams,
    url: "lists/items",
    method: "DELETE",
    body,
  });
}

export type UpdateListSeqParamsType = z.infer<typeof UpdateListSeqParams>;
export const UpdateListSeqParams = z.object({
  listId: z.number(),
  itemIds: z.array(z.number()),
});

export async function updateListSeq(body: UpdateListSeqParamsType) {
  return apiRequest({
    schema: UpdateListSeqParams,
    url: "lists/seq",
    method: "PATCH",
    body,
  });
}
