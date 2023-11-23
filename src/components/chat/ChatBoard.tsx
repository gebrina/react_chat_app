import { FC, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { TChat } from "../../types/Chat";
import ChatForm from "./ChatForm";
import ChatBody from "./ChatBody";
import { useParams } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";

type ChatBoardProps = {
  socket: Socket;
  roomName: string;
};

const ChatBoard: FC<ChatBoardProps> = ({ socket, roomName }) => {
  const [chats, setChats] = useState<TChat[]>([]);
  const { username } = useParams();

  useEffect(() => {
    const handleChat = (chat: TChat) => {
      setChats((chats) => [...chats, chat]);
    };

    socket.on(roomName, handleChat);

    return () => {
      socket.off(roomName, handleChat);
    };
  }, [socket, roomName]);

  return (
    <section
      className="w-full 
      md:w-1/2 mx-auto 
      h-full md:h-[80%] 
      border-2 relative
      p-3 rounded-2xl
    flex flex-col
    border-opacity-50
    gap-2
     border-green-500
     "
    >
      <div className="flex justify-between">
        <div className="flex text-xl text-green-600 gap-2 items-center">
          <FaUser /> {username}
        </div>
        <BiLogOutCircle className="text-2xl special-icon" />
      </div>
      <ChatBody />
      <ChatForm socket={socket} />
    </section>
  );
};

export default ChatBoard;
