import {Account} from "../account/account";
import {ListItem} from "./list-item";

export type List = {
  id?: number;
  unique: string;
  accountId: number;
  account?: Account;
  name: string;
  type: "watchlist" | "recommend" | "other";
  items?: ListItem[];
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
};
