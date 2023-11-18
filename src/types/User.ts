import { TChat } from "./Chat";
import { TRoom } from "./Room";

export type TUser = {
  id: string;
  username: string;
  createdAt: Date;
  chats: TChat[];
  room: TRoom;
};
