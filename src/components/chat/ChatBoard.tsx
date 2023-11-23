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
  const [socketId, setSocketId] = useState("");

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
      h-[80%]
      border-2 relative
      rounded-2xl
      pt-3
      flex flex-col
      border-opacity-50
      gap-2
     border-green-500
     overflow-hidden
     "
    >
      <div className="flex px-3 py-1 justify-between  border-b-green-300 border-b-2">
        <div className="flex text-xl text-green-600 gap-2 items-center">
          <FaUser /> {username}
        </div>
        <BiLogOutCircle className="text-2xl special-icon" />
      </div>
      <div className="flex-1">
        {chats.map((chat, index) => (
          <ChatBody
            key={index + "" + Math.random()}
            id={socketId}
            chat={chat}
          />
        ))}
      </div>
      <ChatForm room={roomName} socket={socket} />
    </section>
  );
};

export default ChatBoard;
