import {
  KeyboardEvent,
  FC,
  FormEvent,
  useRef,
  useState,
  useEffect,
} from "react";
import { BiLogoTelegram } from "react-icons/bi";
import { Socket } from "socket.io-client";
import { TChat } from "../../types/Chat";
import { useChatContext } from "../../context/UseChatContext";
import { TUser } from "../../types/User";
import { scrollToBottom } from "../../utils";

type ChatFormProps = {
  socket: Socket;
  room: string;
  chatBody: HTMLDivElement | null;
};

const ChatForm: FC<ChatFormProps> = ({ socket, room, chatBody }) => {
  const [message, setMessage] = useState("");
  const { currentUser } = useChatContext();
  const messageInputRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const { current } = messageInputRef;
    const handlePasteEvent = (e: ClipboardEvent) => {
      e.preventDefault();
      const text = e.clipboardData?.getData("text/plain");
      text && setMessage(text);
      if (current && text) {
        current.textContent
          ? (current.textContent += text)
          : (current.textContent = text);
      }
    };

    current && document.addEventListener("paste", handlePasteEvent);

    return () => {
      current?.removeEventListener("paste", handlePasteEvent);
    };
  }, []);

  const handleMessageChange = (e: KeyboardEvent<HTMLDivElement>) => {
    const { innerText } = e.target as HTMLDivElement;
    socket.emit("typing", room);
    setMessage(innerText);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    form.classList.add("animate-bounce");

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
    const { current } = messageInputRef;
    if (current) {
      current.textContent = "";
    }
    setTimeout(() => {
      form.classList.remove("animate-bounce");
    }, 50);

    chatBody && scrollToBottom(chatBody);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center -mb-1">
      <div
        ref={messageInputRef}
        contentEditable={true}
        onKeyUp={handleMessageChange}
        placeholder="type some..."
        className={`
        bg-transparent 
        min-h-[40px]
        selection:none
        w-full outline-none  
        rounded-sm text-xl
        resize-none
        px-2 py-1 border-opacity-40
         border-green-800 
         border-[1px]
        `}
      />
      <button className="self-end bg-green-700 px-2 py-[1.8px]">
        <BiLogoTelegram
          className="text-4xl
                     rounded-full
                    cursor-pointer
                     bg-white 
                    hover:animate-pulse 
                    rotate-45 
                  text-green-800"
        />
      </button>
    </form>
  );
};

export default ChatForm;
