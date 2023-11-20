import { TChat } from "./Chat";
import { TRoom } from "./Room";

export type TUser = {
  id: string;
  username: string;
  password: string;
  createdAt: Date;
  chats: TChat[];
  room: TRoom;
};

export type AuthUser = {
  username: string;
  password: string;
};
