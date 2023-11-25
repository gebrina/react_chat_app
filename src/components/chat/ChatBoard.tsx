import { FC, useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { TChat } from "../../types/Chat";
import ChatForm from "./ChatForm";
import ChatBody from "./ChatBody";
import { useParams } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { getChatsByRoom } from "../../api";
import { scrollToBottom } from "../../utils";

type ChatBoardProps = {
  socket: Socket;
  roomName: string;
};

const ChatBoard: FC<ChatBoardProps> = ({ socket, roomName }) => {
  const [chats, setChats] = useState<TChat[]>([]);

  const { username } = useParams();

  const chatBodyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleChat = (chat: TChat) => {
      setChats((chats) => [...chats, chat]);
      handleScrollToBtm();
    };

    socket.on(roomName, handleChat);

    return () => {
      socket.off(roomName, handleChat);
    };
  }, [socket, roomName]);

  useEffect(() => {
    if (roomName) {
      const getChats = async () => {
        const chats = await getChatsByRoom(roomName);
        chats && setChats(chats);
        handleScrollToBtm();
      };
      getChats();
    }
  }, [roomName]);

  const handleScrollToBtm = () => {
    const { current } = chatBodyRef;
    current && scrollToBottom(current);
  };

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
      <div
        ref={chatBodyRef}
        className="flex-1 chat-body overflow-x-hidden overflow-y-scroll"
      >
        {chats.map((chat, index) => (
          <ChatBody key={index + "" + Math.random()} chat={chat} />
        ))}
      </div>
      <ChatForm
        chatBody={chatBodyRef.current}
        room={roomName}
        socket={socket}
      />
    </section>
  );
};

export default ChatBoard;
