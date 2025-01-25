import {Account} from "../account/account";

export type Session = {
  id: number;
  unique: string;

  accountId: number;

  createdAt: Date;
  deletedAt: Date;

  account?: Account | null;
}
