import {Account} from "../account/account";
import {Media} from "../media/media";

export type Viewing = {
  id?: number;
  unique: string;
  accountId: number;
  account?: Account;
  mediaUnique: string;
  media?: Media[];
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
};
