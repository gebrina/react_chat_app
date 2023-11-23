import { FC } from "react";
import { TChat } from "../../types/Chat";

type ChatBodyProps = {
  id: string;
  chat: TChat;
};

const ChatBody: FC<ChatBodyProps> = ({ chat, id }) => {
  const { message } = chat;
  return <div className="bg-slate-600 rounded-lg ">{message}</div>;
};

export default ChatBody;
