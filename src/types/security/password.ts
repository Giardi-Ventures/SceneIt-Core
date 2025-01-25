import {Account} from "../account/account";

export type Password = {
  id: number;
  unique: string;

  accountId: number;

  salt: string;
  content: string;

  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;

  account?: Account | null;
}
