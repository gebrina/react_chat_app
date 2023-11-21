import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { getPlainUserInfo, getToken, storeToken, userLogout } from "../api";
import { TUser } from "../types/User";

type useChatContextProps = {
  isUserLoggedIn: boolean;
  handleLogoutUser: () => void;
  handleLoginUser: (access_token: string) => void;
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

  const handleLoginUser = (access_token: string) => {
    storeToken(access_token);
    setValues((values) => ({
      ...values,
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

  useEffect(() => {
    const currentUser = getPlainUserInfo();
    const token = getToken();
    setValues((values) => ({
      ...values,
      isUserLoggedIn: !!token,
      currentUser,
    }));
  }, []);
  return (
    <ChatContext.Provider
      value={{ ...values, handleLoginUser, handleLogoutUser }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
