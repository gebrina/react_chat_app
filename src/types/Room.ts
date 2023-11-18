import { TUser } from "./User";
import { TChat } from "./Chat";

export type TRoom = {
  id: string;
  name: string;
  users: TUser[];
  chat: TChat[];
};
