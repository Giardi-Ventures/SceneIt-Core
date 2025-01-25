export type Account = {
  id: string;
  unique: string;

  username: string;
  firstName: string;
  lastName: string;
  email: string;

  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
}
