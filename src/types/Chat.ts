import { TRoom } from "./Room";
import { TUser } from "./User";

export type TChat = {
  id: string;
  message: string;
  createdAt: Date;
  user: TUser;
  room: TRoom;
};
