import {Media} from "../media/media";
import {List} from "./list";

export type ListItem = {
  id?: number;
  unique: string;
  listId: number;
  list?: List;
  mediaUnique: string;
  media?: Media;
  seq?: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
};
