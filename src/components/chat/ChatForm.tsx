import { ChangeEvent, FC, FormEvent, useState } from "react";
import { BiLogoTelegram } from "react-icons/bi";
import { Socket } from "socket.io-client";
import { TChat } from "../../types/Chat";
import { useChatContext } from "../../context/UseChatContext";
import { TUser } from "../../types/User";

type ChatFormProps = {
  socket: Socket;
  room: string;
};

const ChatForm: FC<ChatFormProps> = ({ socket, room }) => {
  const [message, setMessage] = useState("");
  const { currentUser } = useChatContext();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    form.classList.add("animate-bounce");
    setTimeout(() => {
      form.classList.remove("animate-bounce");
    }, 500);
    const chat: TChat = {
      message,
      createdAt: new Date(),
      id: "",
      user: currentUser as TUser,
      room: {
        name: room,
        id: "",
        users: [],
        chat: [],
      },
    };
    socket.emit("message", chat);
    setMessage("");
  };

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const messageInputElement = e.target;
    messageInputElement.style.height = `${messageInputElement.scrollHeight}px`;

    const { value } = e.target;
    setMessage(value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center -mb-1">
      <textarea
        value={message}
        onChange={handleMessageChange}
        placeholder="type some..."
        className="
        h-10
        bg-transparent 
        w-full outline-none  
        rounded-sm text-xl
        resize-none
        px-2 py-1 border-opacity-40
         border-green-800 
         border-[1px]
         overflow-hidden
         "
      />
      <button className="self-end mb-2">
        <BiLogoTelegram
          className="text-4xl
       cursor-pointer 
       hover:animate-pulse 
       rotate-45 

       hover:bg-transparent
        text-green-600"
        />
      </button>
    </form>
  );
};

export default ChatForm;
