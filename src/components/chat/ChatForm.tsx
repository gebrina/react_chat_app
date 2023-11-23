import { FC, FormEvent } from "react";
import { BiLogoTelegram } from "react-icons/bi";
import { Socket } from "socket.io-client";

type ChatFormProps = {
  socket: Socket;
};

const ChatForm: FC<ChatFormProps> = ({ socket }) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    form.classList.add("animate-bounce");
    setTimeout(() => {
      form.classList.remove("animate-bounce");
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        placeholder="say some.."
        className="bg-transparent w-full outline-none  rounded-sm text-xl px-2 border-opacity-40 border-green-800 border-[1px]"
      />
      <BiLogoTelegram className="text-4xl cursor-pointer hover:animate-pulse rotate-45 hover:bg-transparent text-green-600" />
    </form>
  );
};

export default ChatForm;
