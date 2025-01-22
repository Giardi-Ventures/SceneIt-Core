import {Account} from "../account";

export type Password = {
  id: number;
  unique: string;

  accountId: number;

  salt: string;
  content: string;

  dateArchived: Date;


  account?: Account | null;
}
