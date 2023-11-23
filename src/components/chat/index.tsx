import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { useChatContext } from "../../context/UseChatContext";
import ChatBoard from "./ChatBoard";

const socket: Socket = io("http://localhost:3000");

const MainChat = () => {
  const { currentUser } = useChatContext();
  const { username } = useParams();
  let roomName: string = "";
  if (currentUser?.username && username) {
    roomName = [currentUser?.username, username].sort().join("-");
  }

  useEffect(() => {
    roomName && socket.emit("init-chat", { room: roomName });
  }, [roomName]);

  return <ChatBoard socket={socket} roomName={roomName} />;
};

export default MainChat;
