import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { socket } from "./Socket";
import { useChatContext } from "../../context/UseChatContext";
import ChatBoard from "./ChatBoard";

const MainChat = () => {
  const { currentUser } = useChatContext();
  const { username } = useParams();
  let roomName: string = "";
  if (currentUser?.username && username) {
    roomName = [currentUser?.username, username].sort().join("-");
  }

  useEffect(() => {
    roomName && socket.emit("init-chat", roomName);
  }, [roomName]);

  return <ChatBoard socket={socket} roomName={roomName} />;
};

export default MainChat;
