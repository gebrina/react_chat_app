import { FC } from "react";
import { TChat } from "../../types/Chat";
import { useChatContext } from "../../context/UseChatContext";

type ChatBodyProps = {
  id: string;
  chat: TChat;
};

const ChatBody: FC<ChatBodyProps> = ({ chat }) => {
  const { currentUser } = useChatContext();

  const {
    message,
    user: { username },
  } = chat;
  return (
    <p
      className={`${
        username === currentUser?.username
          ? "bg-slate-300  translate-x-[95%]"
          : "bg-blue-300"
      } w-1/2 mx-2 p-2 my-1 text-xl rounded-lg`}
    >
      {message}
    </p>
  );
};

export default ChatBody;
