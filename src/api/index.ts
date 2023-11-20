import { toast } from "react-toastify";
import axiosInstance from "../axios";
import { AuthUser, TUser } from "../types/User";
import { AxiosError } from "axios";

const errorMsg = "Something went wrong.";

const handleAxiosError = (error: unknown) => {
  if (error instanceof AxiosError) {
    const { response } = error;

    toast.error((response as any).data.reason);
  } else {
    toast.error(errorMsg);
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

export const loginUser = async (authUser: AuthUser): Promise<string | null> => {
  try {
    const response = await axiosInstance.post("/auth/login", authUser);
    return response.data;
  } catch (e) {
    handleAxiosError(e);
    return null;
  }
};
