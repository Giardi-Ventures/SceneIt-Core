import z, {number, object} from "zod";
import {apiRequest, listRequest} from "../requests";
import {ViewMediaParams} from "../viewing/viewing-apis";
import {
  globalStore,
  updateGlobalState,
  updateObjectInArray,
  upsertGlobalStateArray,
} from "../../redux";
import {List} from "../../types/lists/list";

export type FetchListsParamsType = z.infer<typeof FetchListsParams>;
export const FetchListsParams = object({
  mediaType: z.enum(["movie", "tv", "person"]).optional(),
});

export async function fetchLists(body?: FetchListsParamsType) {
  return listRequest<List[]>({
    onSuccess: (data) => globalStore.dispatch(updateGlobalState("list.data", data)),
    schema: FetchListsParams,
    url: "lists",
    method: "GET",
    body,
  });
}

export type FetchListParamsType = z.infer<typeof FetchListParams>;
export const FetchListParams = object({
  id: z.number(),
});

export async function fetchList(body?: FetchListParamsType) {
  return listRequest<List>({
    schema: FetchListParams,
    url: "lists/one",
    method: "GET",
    body,
  });
}

export type CreateListParamsType = z.infer<typeof CreateListParams>;
export const CreateListParams = z.object({
  name: z.string(),
  type: z.enum(["watchlist", "recommend", "other"]),
});

export async function createList(body: CreateListParamsType) {
  return apiRequest<List>({
    schema: CreateListParams,
    url: "lists/one",
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
  return apiRequest<List>({
    body,
    method: "POST",
    url: "lists/items",
    schema: AddListItemParams,
    onSuccess: (data) => {
      globalStore.dispatch(
        upsertGlobalStateArray({
          id: body.listId,
          path: "list.data",
          newValue: data,
        }),
      );
    },
  });
}

export type RemoveListItemParamsType = z.infer<typeof RemoveListItemParams>;
export const RemoveListItemParams = z.object({
  mediaUnique: z.string(),
  listId: z.number(),
});

export async function removeListItem(body: RemoveListItemParamsType) {
  return apiRequest<List>({
    body,
    method: "DELETE",
    url: "lists/items",
    schema: RemoveListItemParams,
    onSuccess: (data) => {
      globalStore.dispatch(
        upsertGlobalStateArray({
          id: body.listId,
          path: "list.data",
          newValue: data,
        }),
      );
    },
  });
}

export type UpdateListSeqParamsType = z.infer<typeof UpdateListSeqParams>;
export const UpdateListSeqParams = z.object({
  listId: z.number(),
  itemIds: z.array(z.number()),
});

export async function updateListSeq(body: UpdateListSeqParamsType) {
  return apiRequest<List>({
    schema: UpdateListSeqParams,
    url: "lists/seq",
    method: "PATCH",
    body,
  });
}
