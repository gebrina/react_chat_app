import { FC, useEffect, useRef } from "react";
import { formatDistanceToNow } from "date-fns";
import { TChat } from "../../types/Chat";
import { useChatContext } from "../../context/UseChatContext";

type ChatBodyProps = {
  chat: TChat;
};

const ChatBody: FC<ChatBodyProps> = ({ chat }) => {
  const { currentUser } = useChatContext();

  const {
    message,
    user: { username },
    createdAt,
  } = chat;

  const timeRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const updatetimer = setInterval(() => {
      const { current } = timeRef;
      if (current)
        current.textContent = formatDistanceToNow(new Date(createdAt)) + " ago";
    }, 1000);

    return () => clearInterval(updatetimer);
  }, [createdAt]);

  return (
    <p
      className={`${
        username === currentUser?.username
          ? "bg-slate-300  translate-x-[95%]"
          : "bg-blue-300"
      } w-1/2 mx-2 p-2 my-1 text-xl rounded-lg`}
    >
      {message}
      <span
        ref={timeRef}
        className="text-sm block mt-2 text-slate-800 text-opacity-50"
      >
        {formatDistanceToNow(new Date(createdAt))} ago
      </span>
    </p>
  );
};

export default ChatBody;
