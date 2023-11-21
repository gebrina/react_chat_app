import { FC, ReactNode, createContext, useState } from "react";
import { getPlainUserInfo, userLogout } from "../api";
import { TUser } from "../types/User";

type useChatContextProps = {
  isUserLoggedIn: boolean;
  handleLogoutUser: () => void;
  handleLoginUser: () => void;
  currentUser?: TUser;
};

const defaultProps: useChatContextProps = {
  isUserLoggedIn: false,
  handleLoginUser: () => {},
  handleLogoutUser: () => {},
};

export const ChatContext = createContext(defaultProps);

const ChatContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [values, setValues] = useState<useChatContextProps>(defaultProps);

  const handleLoginUser = () => {
    const user = getPlainUserInfo();
    setValues((values) => ({
      ...values,
      currentUser: user,
      isUserLoggedIn: true,
    }));
  };

  const handleLogoutUser = () => {
    userLogout();
    setValues((values) => ({
      ...values,
      isUserLoggedIn: false,
    }));
  };

  return (
    <ChatContext.Provider
      value={{ ...values, handleLoginUser, handleLogoutUser }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
