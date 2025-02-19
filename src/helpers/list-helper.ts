import {addListItem, fetchLists, removeListItem} from "../apis";
import {globalStore, ListState, updateListStore} from "../redux";
import {SimpleError} from "../common";

export async function loadLists() {
  console.log("Dogs");

  const {error, data: lists} = await fetchLists();
  if (error) throw error;

  console.log("Wisps", lists);

  const watch = lists.find((item) => {
    return item.type === "watchlist";
  });

  console.log("Lists", lists, watch);

  globalStore.dispatch(updateListStore({watch}));
}

export async function addToWatchList(unique: string) {
  const {watch}: ListState = globalStore.getState().list;

  if (watch === null) {
    throw SimpleError("list_invalid");
  }

  const {error, data: watchList} = await addListItem({
    mediaUnique: unique,
    listId: watch.id,
  });

  if (error) throw error;

  globalStore.dispatch(updateListStore({watch: watchList}));
}

export async function removeFromWatchList(unique: string) {
  const {watch}: ListState = globalStore.getState().list;

  if (watch === null) {
    throw SimpleError("list_invalid");
  }

  const {error, data: watchList} = await removeListItem({
    mediaUnique: unique,
    listId: watch.id,
  });


  console.log("Data", error, watchList);

  if (error) throw error;

  globalStore.dispatch(updateListStore({watch: watchList}));
}
