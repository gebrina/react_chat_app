import { FC, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { TChat } from "../../types/Chat";

type ChatBoardProps = {
  socket: Socket;
  roomName: string;
};

const ChatBoard: FC<ChatBoardProps> = ({ socket, roomName }) => {
  const [chats, setChats] = useState<TChat[]>([]);

  useEffect(() => {
    const handleChat = (chat: TChat) => {
      setChats((chats) => [...chats, chat]);
    };

    socket.on(roomName, handleChat);

    return () => {
      socket.off(roomName, handleChat);
    };
  }, [socket, roomName]);

  return <div>ChatBoard</div>;
};

export default ChatBoard;
