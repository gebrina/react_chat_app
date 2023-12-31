import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../axios";
import { AuthUser, TUser } from "../types/User";
import { TChat } from "../types/Chat";

const errorMsg = "Something went wrong.";

const handleAxiosError = (error: unknown) => {
  if (error instanceof AxiosError) {
    const { response } = error;
    if (response) {
      toast.error(response?.data.reason);
    } else {
      toast.error(errorMsg, { theme: "colored" });
    }
  } else {
    toast.error(errorMsg, { theme: "colored" });
  }
};

export const postUser = async (user: TUser): Promise<TUser[] | null> => {
  try {
    await axiosInstance.post("/users", user);
    toast.success("User saved successfully.");
    return await getUsers();
  } catch (e) {
    handleAxiosError(e);
    return [];
  }
};

export const getUsers = async (): Promise<TUser[] | null> => {
  try {
    const response = await axiosInstance.get("/users");
    return response.data;
  } catch (e) {
    handleAxiosError(e);
    return null;
  }
};

export const deleteUser = async (id: string) => {
  try {
    await axiosInstance.delete(`users/${id}`);
    toast.success("User deleted successfully.");
    return await getUsers();
  } catch (e) {
    handleAxiosError(e);
  }
};

export const loginUser = async (
  authUser: AuthUser
): Promise<{ access_token: "" } | null> => {
  try {
    const response = await axiosInstance.post("/auth/login", authUser);
    return response.data;
  } catch (e) {
    handleAxiosError(e);
    return null;
  }
};

export const getChatsByRoom = async (
  roomName: string
): Promise<TChat[] | null> => {
  try {
    const response = await axiosInstance.get(`/chats/${roomName}`);
    return response.data;
  } catch (e) {
    handleAxiosError(e);
    return null;
  }
};

export const storeToken = (access_token: string) => {
  const jwtInfo = JSON.stringify({ access_token });
  sessionStorage.setItem("token", jwtInfo);
};

export const getToken = () => {
  let token = sessionStorage.getItem("token");

  if (token === null) {
    return null;
  }
  token = JSON.parse(token);
  return token;
};

export const getPlainUserInfo = (): TUser | undefined => {
  const token = getToken();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (token) return (jwtDecode((token as any).access_token) as any).user;
  return undefined;
};

export const userLogout = () => sessionStorage.removeItem("token");
